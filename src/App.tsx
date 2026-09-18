import { useState } from "react";
import { open, save } from "@tauri-apps/plugin-dialog";
import { readTextFile, writeTextFile } from "@tauri-apps/plugin-fs";
import "./App.css";

const NOTE_FILTERS = [{ name: "Inkwell note", extensions: ["ink", "md"] }];

function fileNameFromPath(path: string): string {
  return path.split(/[\\/]/).pop() ?? path;
}

function App() {
  const [content, setContent] = useState("");
  const [filePath, setFilePath] = useState<string | null>(null);
  const [isDirty, setIsDirty] = useState(false);
  const [status, setStatus] = useState("New note");

  function handleChange(value: string) {
    setContent(value);
    setIsDirty(true);
  }

  function handleNew() {
    setContent("");
    setFilePath(null);
    setIsDirty(false);
    setStatus("New note");
  }

  async function handleOpen() {
    const selected = await open({
      multiple: false,
      filters: NOTE_FILTERS,
    });
    if (!selected || Array.isArray(selected)) return;

    const text = await readTextFile(selected);
    setContent(text);
    setFilePath(selected);
    setIsDirty(false);
    setStatus(fileNameFromPath(selected));
  }

  async function handleSave() {
    if (filePath) {
      await writeTextFile(filePath, content);
      setIsDirty(false);
      setStatus(fileNameFromPath(filePath));
      return;
    }
    await handleSaveAs();
  }

  async function handleSaveAs() {
    const target = await save({
      filters: NOTE_FILTERS,
      defaultPath: "untitled.ink",
    });
    if (!target) return;

    await writeTextFile(target, content);
    setFilePath(target);
    setIsDirty(false);
    setStatus(fileNameFromPath(target));
  }

  return (
    <main className="app">
      <header className="toolbar">
        <span className="brand">Inkwell</span>
        <div className="actions">
          <button onClick={handleNew}>New</button>
          <button onClick={handleOpen}>Open</button>
          <button onClick={handleSave}>Save</button>
          <button onClick={handleSaveAs}>Save As</button>
        </div>
      </header>

      <textarea
        className="editor"
        value={content}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Start writing..."
        spellCheck={false}
      />

      <footer className="statusbar">
        <span>{status}</span>
        {isDirty && <span className="dirty">unsaved changes</span>}
      </footer>
    </main>
  );
}

export default App;
