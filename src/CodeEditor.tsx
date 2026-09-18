import { useEffect, useRef } from "react";
import type { EditorState } from "@codemirror/state";
import { EditorView } from "@codemirror/view";

interface CodeEditorProps {
  activeId: string;
  store: React.RefObject<Map<string, EditorState>>;
}

function CodeEditor({ activeId, store }: CodeEditorProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const viewRef = useRef<EditorView | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const initial = store.current.get(activeId);
    if (!initial) return;

    const view = new EditorView({ state: initial, parent: containerRef.current });
    viewRef.current = view;
    return () => {
      view.destroy();
      viewRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const view = viewRef.current;
    const state = store.current.get(activeId);
    if (view && state && view.state !== state) {
      view.setState(state);
    }
  }, [activeId, store]);

  return <div className="code-editor" ref={containerRef} />;
}

export default CodeEditor;
