import { useRef, useState } from "react";
import { open, save } from "@tauri-apps/plugin-dialog";
import { readTextFile, writeTextFile } from "@tauri-apps/plugin-fs";
import type { EditorState } from "@codemirror/state";
import CodeEditor from "./CodeEditor";
import TabBar from "./TabBar";
import Sidebar from "./Sidebar";
import { createDocState } from "./document";
import { languageLabel } from "./languages";
import type { PaneId, Tab } from "./types";
import "./App.css";

const FILE_FILTERS = [
  { name: "Inkwell note", extensions: ["ink", "md"] },
  { name: "Code", extensions: ["js", "jsx", "ts", "tsx", "py", "rs", "html", "htm", "css"] },
  { name: "All files", extensions: ["*"] },
];

function fileNameFromPath(path: string): string {
  return path.split(/[\\/]/).pop() ?? path;
}

function App() {
  const docStore = useRef(new Map<string, EditorState>());
  const [workspaceRoot, setWorkspaceRoot] = useState<string | null>(null);
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [dirty, setDirty] = useState<Record<string, boolean>>({});
  const [leftActive, setLeftActive] = useState<string | null>(null);
  const [rightActive, setRightActive] = useState<string | null>(null);
  const [splitOpen, setSplitOpen] = useState(false);
  const [focusedPane, setFocusedPane] = useState<PaneId>("left");

  function markDirty(id: string) {
    setDirty((prev) => (prev[id] ? prev : { ...prev, [id]: true }));
  }

  function activeIdFor(pane: PaneId): string | null {
    return pane === "left" ? leftActive : rightActive;
  }

  function setActiveFor(pane: PaneId, id: string | null) {
    if (pane === "left") setLeftActive(id);
    else setRightActive(id);
  }

  function otherPane(pane: PaneId): PaneId {
    return pane === "left" ? "right" : "left";
  }

  function focusTab(pane: PaneId, id: string) {
    if (splitOpen && activeIdFor(otherPane(pane)) === id) {
      setFocusedPane(otherPane(pane));
      return;
    }
    setActiveFor(pane, id);
    setFocusedPane(pane);
  }

  function addTab(tab: Tab, text: string) {
    docStore.current.set(tab.id, createDocState(text, tab.path, () => markDirty(tab.id)));
    setTabs((prev) => [...prev, tab]);
    focusTab(focusedPane, tab.id);
  }

  function activeTab(): Tab | undefined {
    return tabs.find((t) => t.id === activeIdFor(focusedPane));
  }

  function handleNew() {
    addTab({ id: crypto.randomUUID(), path: null, title: "Untitled" }, "");
  }

  async function openPath(path: string) {
    const existing = tabs.find((t) => t.path === path);
    if (existing) {
      focusTab(focusedPane, existing.id);
      return;
    }
    const text = await readTextFile(path);
    addTab({ id: crypto.randomUUID(), path, title: fileNameFromPath(path) }, text);
  }

  async function handleOpen() {
    const selected = await open({ multiple: false, filters: FILE_FILTERS });
    if (!selected || Array.isArray(selected)) return;
    await openPath(selected);
  }

  async function handleOpenFolder() {
    const selected = await open({ directory: true });
    if (!selected || Array.isArray(selected)) return;
    setWorkspaceRoot(selected);
  }

  function docText(id: string): string {
    return docStore.current.get(id)?.doc.toString() ?? "";
  }

  async function handleSave() {
    const tab = activeTab();
    if (!tab) return;
    if (!tab.path) {
      await handleSaveAs();
      return;
    }
    await writeTextFile(tab.path, docText(tab.id));
    setDirty((prev) => ({ ...prev, [tab.id]: false }));
  }

  async function handleSaveAs() {
    const tab = activeTab();
    if (!tab) return;
    const target = await save({ filters: FILE_FILTERS, defaultPath: tab.path ?? "untitled.ink" });
    if (!target) return;
    await writeTextFile(target, docText(tab.id));
    setTabs((prev) =>
      prev.map((t) => (t.id === tab.id ? { ...t, path: target, title: fileNameFromPath(target) } : t)),
    );
    setDirty((prev) => ({ ...prev, [tab.id]: false }));
  }

  function closeTab(id: string) {
    setTabs((prev) => {
      const index = prev.findIndex((t) => t.id === id);
      const next = prev.filter((t) => t.id !== id);
      const fallback = next[index - 1]?.id ?? next[0]?.id ?? null;
      if (leftActive === id) setLeftActive(fallback);
      if (rightActive === id) setRightActive(fallback);
      return next;
    });
    docStore.current.delete(id);
    setDirty((prev) => {
      const rest = { ...prev };
      delete rest[id];
      return rest;
    });
  }

  function toggleSplit() {
    if (splitOpen) {
      setSplitOpen(false);
      setRightActive(null);
      if (focusedPane === "right") setFocusedPane("left");
    } else {
      setSplitOpen(true);
    }
  }

  const currentTab = activeTab();

  return (
    <main className="app">
      <header className="toolbar">
        <span className="brand">Inkwell</span>
        <div className="actions">
          <button onClick={handleNew}>New</button>
          <button onClick={handleOpen}>Open</button>
          <button onClick={handleOpenFolder}>Open Folder</button>
          <button onClick={handleSave}>Save</button>
          <button onClick={handleSaveAs}>Save As</button>
          <button onClick={toggleSplit}>{splitOpen ? "Close Split" : "Split"}</button>
        </div>
      </header>

      <div className="body">
        <Sidebar root={workspaceRoot} activePath={currentTab?.path ?? null} onOpenFile={openPath} />

        <div className="panes">
          <div className="pane" onFocus={() => setFocusedPane("left")}>
            <TabBar
              tabs={tabs}
              activeId={leftActive}
              otherPaneActiveId={splitOpen ? rightActive : null}
              dirty={dirty}
              onSelect={(id) => focusTab("left", id)}
              onClose={closeTab}
            />
            {leftActive ? (
              <CodeEditor activeId={leftActive} store={docStore} />
            ) : (
              <div className="pane-empty">No file open</div>
            )}
          </div>

          {splitOpen && (
            <div className="pane" onFocus={() => setFocusedPane("right")}>
              <TabBar
                tabs={tabs}
                activeId={rightActive}
                otherPaneActiveId={leftActive}
                dirty={dirty}
                onSelect={(id) => focusTab("right", id)}
                onClose={closeTab}
              />
              {rightActive ? (
                <CodeEditor activeId={rightActive} store={docStore} />
              ) : (
                <div className="pane-empty">No file open</div>
              )}
            </div>
          )}
        </div>
      </div>

      <footer className="statusbar">
        <span>{currentTab ? currentTab.title : "No file open"}</span>
        <span>{languageLabel(currentTab?.path ?? null)}</span>
        {currentTab && dirty[currentTab.id] && <span className="dirty">unsaved changes</span>}
      </footer>
    </main>
  );
}

export default App;
