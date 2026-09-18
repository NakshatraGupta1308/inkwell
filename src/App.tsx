import { useRef, useState } from "react";
import { open, save } from "@tauri-apps/plugin-dialog";
import { readTextFile, writeTextFile } from "@tauri-apps/plugin-fs";
import CodeEditor, { type CodeEditorHandle } from "./CodeEditor";
import { languageLabel } from "./languages";
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
  const editorRef = useRef<CodeEditorHandle>(null);
  const [filePath, setFilePath] = useState<string | null>(null);
  const [isDirty, setIsDirty] = useState(false);

  function handleNew() {
    editorRef.current?.setValue("", null);
    setFilePath(null);
    setIsDirty(false);
  }

  async function handleOpen() {
    const selected = await open({
      multiple: false,
      filters: FILE_FILTERS,
    });
    if (!selected || Array.isArray(selected)) return;

    const text = await readTextFile(selected);
    editorRef.current?.setValue(text, selected);
    setFilePath(selected);
    setIsDirty(false);
  }

  async function handleSave() {
    if (filePath) {
      await writeTextFile(filePath, editorRef.current?.getValue() ?? "");
      setIsDirty(false);
      return;
    }
    await handleSaveAs();
  }

  async function handleSaveAs() {
    const target = await save({
      filters: FILE_FILTERS,
      defaultPath: filePath ?? "untitled.ink",
    });
    if (!target) return;

    await writeTextFile(target, editorRef.current?.getValue() ?? "");
    setFilePath(target);
    setIsDirty(false);
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

      <CodeEditor ref={editorRef} onDirty={() => setIsDirty(true)} />

      <footer className="statusbar">
        <span>{filePath ? fileNameFromPath(filePath) : "New note"}</span>
        <span>{languageLabel(filePath)}</span>
        {isDirty && <span className="dirty">unsaved changes</span>}
      </footer>
    </main>
  );
}

export default App;
