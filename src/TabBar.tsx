import type { Tab } from "./types";

interface TabBarProps {
  tabs: Tab[];
  activeId: string | null;
  otherPaneActiveId: string | null;
  dirty: Record<string, boolean>;
  onSelect: (id: string) => void;
  onClose: (id: string) => void;
}

function TabBar({ tabs, activeId, otherPaneActiveId, dirty, onSelect, onClose }: TabBarProps) {
  if (tabs.length === 0) {
    return <div className="tabbar tabbar-empty" />;
  }

  return (
    <div className="tabbar">
      {tabs.map((tab) => {
        const disabled = tab.id === otherPaneActiveId;
        return (
          <div
            key={tab.id}
            className={`tab${tab.id === activeId ? " active" : ""}${disabled ? " disabled" : ""}`}
            title={disabled ? "Already open in the other pane" : (tab.path ?? "Unsaved note")}
            onClick={() => !disabled && onSelect(tab.id)}
          >
            {dirty[tab.id] && <span className="tab-dot" />}
            <span className="tab-title">{tab.title}</span>
            <button
              type="button"
              className="tab-close"
              onClick={(e) => {
                e.stopPropagation();
                onClose(tab.id);
              }}
              aria-label={`Close ${tab.title}`}
            >
              x
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default TabBar;
