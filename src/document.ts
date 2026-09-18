import { EditorState } from "@codemirror/state";
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

export const editorTheme = EditorView.theme({
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

export function createDocState(text: string, path: string | null, onDocChanged: () => void): EditorState {
  return EditorState.create({
    doc: text,
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
      languageForPath(path),
      editorTheme,
      EditorView.updateListener.of((update) => {
        if (update.docChanged) onDocChanged();
      }),
    ],
  });
}
