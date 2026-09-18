import { EditorView } from "@codemirror/view";
import { HighlightStyle } from "@codemirror/language";
import { tags as t } from "@lezer/highlight";

export interface ThemeTokens {
  name: string;
  colors: {
    background: string;
    foreground: string;
    accent: string;
    border: string;
    mutedForeground: string;
    gutterBackground: string;
    gutterForeground: string;
    selection: string;
    activeLine: string;
  };
  fonts: {
    ui: string;
    editor: string;
  };
  syntax: {
    comment: string;
    keyword: string;
    string: string;
    number: string;
    function: string;
    variable: string;
    type: string;
    operator: string;
    tag: string;
    property: string;
    heading: string;
  };
}

export const paperTheme: ThemeTokens = {
  name: "Paper",
  colors: {
    background: "#faf6ee",
    foreground: "#1f2933",
    accent: "#1e3a5f",
    border: "#ddd4c0",
    mutedForeground: "#5b6472",
    gutterBackground: "#faf6ee",
    gutterForeground: "#5b6472",
    selection: "#dce7f2",
    activeLine: "#eee6d3",
  },
  fonts: {
    ui: '"Iowan Old Style", "Palatino Linotype", Georgia, serif',
    editor: '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace',
  },
  syntax: {
    comment: "#8a8272",
    keyword: "#8a3b3b",
    string: "#3c6e47",
    number: "#a4632b",
    function: "#1e3a5f",
    variable: "#1f2933",
    type: "#5b3f8a",
    operator: "#5b6472",
    tag: "#1e3a5f",
    property: "#8a3b3b",
    heading: "#1e3a5f",
  },
};

export const inkTheme: ThemeTokens = {
  name: "Ink",
  colors: {
    background: "#1b1d23",
    foreground: "#e7e2d6",
    accent: "#e0b872",
    border: "#33363f",
    mutedForeground: "#8a8f9c",
    gutterBackground: "#1b1d23",
    gutterForeground: "#5c616e",
    selection: "#33475f",
    activeLine: "#24262e",
  },
  fonts: {
    ui: '"Iowan Old Style", "Palatino Linotype", Georgia, serif',
    editor: '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace',
  },
  syntax: {
    comment: "#6b7180",
    keyword: "#e0876b",
    string: "#8fbf7f",
    number: "#e0b872",
    function: "#7fb5e0",
    variable: "#e7e2d6",
    type: "#c194e0",
    operator: "#8a8f9c",
    tag: "#7fb5e0",
    property: "#e0876b",
    heading: "#e0b872",
  },
};

export const builtinThemes: ThemeTokens[] = [paperTheme, inkTheme];

export function applyThemeVariables(theme: ThemeTokens) {
  const root = document.documentElement.style;
  root.setProperty("--paper", theme.colors.background);
  root.setProperty("--ink", theme.colors.foreground);
  root.setProperty("--ink-soft", theme.colors.mutedForeground);
  root.setProperty("--accent", theme.colors.accent);
  root.setProperty("--border", theme.colors.border);
  root.setProperty("--ui-font", theme.fonts.ui);
  root.setProperty("--editor-font", theme.fonts.editor);
}

export function buildEditorTheme(theme: ThemeTokens) {
  return EditorView.theme({
    "&": {
      height: "100%",
      backgroundColor: theme.colors.background,
      color: theme.colors.foreground,
    },
    ".cm-content": {
      fontFamily: theme.fonts.editor,
      fontSize: "1rem",
      padding: "2rem clamp(1.25rem, 8vw, 12rem)",
    },
    ".cm-gutters": {
      backgroundColor: theme.colors.gutterBackground,
      color: theme.colors.gutterForeground,
      border: "none",
    },
    ".cm-activeLine": {
      backgroundColor: theme.colors.activeLine,
    },
    ".cm-activeLineGutter": {
      backgroundColor: theme.colors.activeLine,
    },
    ".cm-selectionBackground, &.cm-focused .cm-selectionBackground": {
      backgroundColor: `${theme.colors.selection} !important`,
    },
    "&.cm-focused": {
      outline: "none",
    },
  });
}

export function buildHighlightStyle(theme: ThemeTokens) {
  return HighlightStyle.define([
    { tag: t.comment, color: theme.syntax.comment, fontStyle: "italic" },
    { tag: [t.keyword, t.controlKeyword, t.moduleKeyword], color: theme.syntax.keyword },
    { tag: [t.string, t.special(t.string)], color: theme.syntax.string },
    { tag: t.number, color: theme.syntax.number },
    { tag: [t.function(t.variableName), t.function(t.propertyName)], color: theme.syntax.function },
    { tag: t.variableName, color: theme.syntax.variable },
    { tag: [t.typeName, t.className], color: theme.syntax.type },
    { tag: t.operator, color: theme.syntax.operator },
    { tag: t.tagName, color: theme.syntax.tag },
    { tag: t.propertyName, color: theme.syntax.property },
    { tag: [t.heading, t.strong], color: theme.syntax.heading, fontWeight: "bold" },
  ]);
}

const REQUIRED_COLOR_KEYS: (keyof ThemeTokens["colors"])[] = [
  "background",
  "foreground",
  "accent",
  "border",
  "mutedForeground",
  "gutterBackground",
  "gutterForeground",
  "selection",
  "activeLine",
];
const REQUIRED_FONT_KEYS: (keyof ThemeTokens["fonts"])[] = ["ui", "editor"];
const REQUIRED_SYNTAX_KEYS: (keyof ThemeTokens["syntax"])[] = [
  "comment",
  "keyword",
  "string",
  "number",
  "function",
  "variable",
  "type",
  "operator",
  "tag",
  "property",
  "heading",
];

export function isThemeTokens(value: unknown): value is ThemeTokens {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Record<string, unknown>;
  if (typeof candidate.name !== "string") return false;

  const colors = candidate.colors as Record<string, unknown> | undefined;
  const fonts = candidate.fonts as Record<string, unknown> | undefined;
  const syntax = candidate.syntax as Record<string, unknown> | undefined;
  if (!colors || !fonts || !syntax) return false;

  return (
    REQUIRED_COLOR_KEYS.every((key) => typeof colors[key] === "string") &&
    REQUIRED_FONT_KEYS.every((key) => typeof fonts[key] === "string") &&
    REQUIRED_SYNTAX_KEYS.every((key) => typeof syntax[key] === "string")
  );
}
