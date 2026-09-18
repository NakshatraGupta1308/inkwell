import { useEffect, useState } from "react";
import { readDir } from "@tauri-apps/plugin-fs";
import { join } from "@tauri-apps/api/path";

interface TreeEntry {
  name: string;
  path: string;
  isDirectory: boolean;
}

async function listDir(path: string): Promise<TreeEntry[]> {
  const entries = await readDir(path);
  const withPaths = await Promise.all(
    entries
      .filter((entry) => !entry.name.startsWith("."))
      .map(async (entry) => ({
        name: entry.name,
        isDirectory: entry.isDirectory ?? false,
        path: await join(path, entry.name),
      })),
  );

  withPaths.sort((a, b) => {
    if (a.isDirectory !== b.isDirectory) return a.isDirectory ? -1 : 1;
    return a.name.localeCompare(b.name);
  });

  return withPaths;
}

interface TreeNodeProps {
  entry: TreeEntry;
  activePath: string | null;
  onOpenFile: (path: string) => void;
}

function TreeNode({ entry, activePath, onOpenFile }: TreeNodeProps) {
  const [expanded, setExpanded] = useState(false);
  const [children, setChildren] = useState<TreeEntry[] | null>(null);

  async function handleClick() {
    if (!entry.isDirectory) {
      onOpenFile(entry.path);
      return;
    }
    if (!expanded) {
      setChildren(await listDir(entry.path));
    }
    setExpanded((prev) => !prev);
  }

  return (
    <li>
      <button
        type="button"
        className={`tree-row${entry.path === activePath ? " active" : ""}`}
        onClick={handleClick}
      >
        <span className="tree-icon">{entry.isDirectory ? (expanded ? "▾" : "▸") : "·"}</span>
        {entry.name}
      </button>
      {entry.isDirectory && expanded && children && (
        <ul className="tree-children">
          {children.map((child) => (
            <TreeNode key={child.path} entry={child} activePath={activePath} onOpenFile={onOpenFile} />
          ))}
        </ul>
      )}
    </li>
  );
}

interface SidebarProps {
  root: string | null;
  activePath: string | null;
  onOpenFile: (path: string) => void;
}

function Sidebar({ root, activePath, onOpenFile }: SidebarProps) {
  const [entries, setEntries] = useState<TreeEntry[]>([]);

  useEffect(() => {
    if (!root) {
      setEntries([]);
      return;
    }
    listDir(root).then(setEntries);
  }, [root]);

  if (!root) {
    return <aside className="sidebar sidebar-empty">No folder open</aside>;
  }

  return (
    <aside className="sidebar">
      <ul className="tree-root">
        {entries.map((entry) => (
          <TreeNode key={entry.path} entry={entry} activePath={activePath} onOpenFile={onOpenFile} />
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
