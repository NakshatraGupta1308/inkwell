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
import { bracketMatching, indentOnInput, syntaxHighlighting } from "@codemirror/language";
import type { RefObject } from "react";
import { languageForPath } from "./languages";
import { buildEditorTheme, buildHighlightStyle } from "./theme";
import type { ThemeTokens } from "./theme";

const themeCompartment = new Compartment();

function themeExtension(theme: ThemeTokens) {
  return [buildEditorTheme(theme), syntaxHighlighting(buildHighlightStyle(theme), { fallback: true })];
}

export function createDocState(
  text: string,
  path: string | null,
  id: string,
  store: RefObject<Map<string, EditorState>>,
  theme: ThemeTokens,
  onDirty: () => void,
): EditorState {
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
      keymap.of([...defaultKeymap, ...historyKeymap, indentWithTab]),
      languageForPath(path),
      themeCompartment.of(themeExtension(theme)),
      EditorView.updateListener.of((update) => {
        if (update.docChanged) {
          store.current.set(id, update.state);
          onDirty();
        }
      }),
    ],
  });
}

export function applyThemeToStore(store: RefObject<Map<string, EditorState>>, theme: ThemeTokens) {
  const extension = themeExtension(theme);
  store.current.forEach((state, id) => {
    const nextState = state.update({ effects: themeCompartment.reconfigure(extension) }).state;
    store.current.set(id, nextState);
  });
}
