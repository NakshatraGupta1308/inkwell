import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { Compartment, EditorState } from "@codemirror/state";
import {
  EditorView,
  keymap,
  lineNumbers,
  highlightActiveLine,
  highlightActiveLineGutter,
  drawSelection,
} from "@codemirror/view";
import { defaultKeymap, history, historyKeymap, indentWithTab } from "@codemirror/commands";
import { bracketMatching, defaultHighlightStyle, indentOnInput, syntaxHighlighting } from "@codemirror/language";
import { languageForPath } from "./languages";

const editorTheme = EditorView.theme({
  "&": {
    height: "100%",
    backgroundColor: "var(--paper)",
    color: "var(--ink)",
  },
  ".cm-content": {
    fontFamily: "inherit",
    fontSize: "1rem",
    padding: "2rem clamp(1.25rem, 8vw, 12rem)",
  },
  ".cm-gutters": {
    backgroundColor: "var(--paper)",
    color: "var(--ink-soft)",
    border: "none",
  },
  "&.cm-focused": {
    outline: "none",
  },
});

export interface CodeEditorHandle {
  getValue: () => string;
  setValue: (text: string, filePath: string | null) => void;
}

interface CodeEditorProps {
  onDirty: () => void;
}

const CodeEditor = forwardRef<CodeEditorHandle, CodeEditorProps>(({ onDirty }, ref) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const viewRef = useRef<EditorView | null>(null);
  const languageCompartment = useRef(new Compartment());

  useEffect(() => {
    if (!containerRef.current) return;

    const view = new EditorView({
      state: EditorState.create({
        doc: "",
        extensions: [
          lineNumbers(),
          highlightActiveLineGutter(),
          highlightActiveLine(),
          drawSelection(),
          history(),
          indentOnInput(),
          bracketMatching(),
          syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
          keymap.of([...defaultKeymap, ...historyKeymap, indentWithTab]),
          languageCompartment.current.of(languageForPath(null)),
          editorTheme,
          EditorView.updateListener.of((update) => {
            if (update.docChanged) onDirty();
          }),
        ],
      }),
      parent: containerRef.current,
    });

    viewRef.current = view;
    return () => {
      view.destroy();
      viewRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useImperativeHandle(ref, () => ({
    getValue: () => viewRef.current?.state.doc.toString() ?? "",
    setValue: (text, filePath) => {
      const view = viewRef.current;
      if (!view) return;
      view.dispatch({
        changes: { from: 0, to: view.state.doc.length, insert: text },
        effects: languageCompartment.current.reconfigure(languageForPath(filePath)),
      });
    },
  }));

  return <div className="code-editor" ref={containerRef} />;
});

CodeEditor.displayName = "CodeEditor";

export default CodeEditor;
