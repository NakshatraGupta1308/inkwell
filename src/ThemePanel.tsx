import type { ThemeTokens } from "./theme";

interface ThemePanelProps {
  theme: ThemeTokens;
  builtins: ThemeTokens[];
  error: string | null;
  onChange: (theme: ThemeTokens) => void;
  onImport: () => void;
  onExport: () => void;
  onClose: () => void;
}

function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="theme-field">
      <span className="theme-swatch" style={{ backgroundColor: value }} />
      <span className="theme-field-label">{label}</span>
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}

function ThemePanel({ theme, builtins, error, onChange, onImport, onExport, onClose }: ThemePanelProps) {
  function setColor(key: keyof ThemeTokens["colors"], value: string) {
    onChange({ ...theme, colors: { ...theme.colors, [key]: value } });
  }

  function setSyntax(key: keyof ThemeTokens["syntax"], value: string) {
    onChange({ ...theme, syntax: { ...theme.syntax, [key]: value } });
  }

  function setFont(key: keyof ThemeTokens["fonts"], value: string) {
    onChange({ ...theme, fonts: { ...theme.fonts, [key]: value } });
  }

  return (
    <aside className="theme-panel">
      <div className="theme-panel-header">
        <span>Theme</span>
        <button type="button" onClick={onClose} aria-label="Close theme panel">
          x
        </button>
      </div>

      <div className="theme-section">
        <div className="theme-section-title">Presets</div>
        <div className="theme-presets">
          {builtins.map((preset) => (
            <button
              key={preset.name}
              type="button"
              className={`theme-preset${preset.name === theme.name ? " active" : ""}`}
              onClick={() => onChange(preset)}
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      <div className="theme-section">
        <div className="theme-section-title">Colors</div>
        <ColorField label="Background" value={theme.colors.background} onChange={(v) => setColor("background", v)} />
        <ColorField label="Text" value={theme.colors.foreground} onChange={(v) => setColor("foreground", v)} />
        <ColorField label="Accent" value={theme.colors.accent} onChange={(v) => setColor("accent", v)} />
        <ColorField label="Border" value={theme.colors.border} onChange={(v) => setColor("border", v)} />
        <ColorField label="Muted text" value={theme.colors.mutedForeground} onChange={(v) => setColor("mutedForeground", v)} />
        <ColorField label="Gutter background" value={theme.colors.gutterBackground} onChange={(v) => setColor("gutterBackground", v)} />
        <ColorField label="Gutter text" value={theme.colors.gutterForeground} onChange={(v) => setColor("gutterForeground", v)} />
        <ColorField label="Selection" value={theme.colors.selection} onChange={(v) => setColor("selection", v)} />
        <ColorField label="Active line" value={theme.colors.activeLine} onChange={(v) => setColor("activeLine", v)} />
      </div>

      <div className="theme-section">
        <div className="theme-section-title">Syntax</div>
        <ColorField label="Comment" value={theme.syntax.comment} onChange={(v) => setSyntax("comment", v)} />
        <ColorField label="Keyword" value={theme.syntax.keyword} onChange={(v) => setSyntax("keyword", v)} />
        <ColorField label="String" value={theme.syntax.string} onChange={(v) => setSyntax("string", v)} />
        <ColorField label="Number" value={theme.syntax.number} onChange={(v) => setSyntax("number", v)} />
        <ColorField label="Function" value={theme.syntax.function} onChange={(v) => setSyntax("function", v)} />
        <ColorField label="Variable" value={theme.syntax.variable} onChange={(v) => setSyntax("variable", v)} />
        <ColorField label="Type" value={theme.syntax.type} onChange={(v) => setSyntax("type", v)} />
        <ColorField label="Operator" value={theme.syntax.operator} onChange={(v) => setSyntax("operator", v)} />
        <ColorField label="Tag" value={theme.syntax.tag} onChange={(v) => setSyntax("tag", v)} />
        <ColorField label="Property" value={theme.syntax.property} onChange={(v) => setSyntax("property", v)} />
        <ColorField label="Heading" value={theme.syntax.heading} onChange={(v) => setSyntax("heading", v)} />
      </div>

      <div className="theme-section">
        <div className="theme-section-title">Fonts</div>
        <label className="theme-field theme-field-text">
          <span className="theme-field-label">UI font</span>
          <input type="text" value={theme.fonts.ui} onChange={(e) => setFont("ui", e.target.value)} />
        </label>
        <label className="theme-field theme-field-text">
          <span className="theme-field-label">Editor font</span>
          <input type="text" value={theme.fonts.editor} onChange={(e) => setFont("editor", e.target.value)} />
        </label>
      </div>

      <div className="theme-section theme-actions">
        <button type="button" onClick={onImport}>
          Import Theme
        </button>
        <button type="button" onClick={onExport}>
          Export Theme
        </button>
      </div>

      {error && <div className="theme-error">{error}</div>}
    </aside>
  );
}

export default ThemePanel;
