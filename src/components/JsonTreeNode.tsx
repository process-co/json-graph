import { useState } from "react";
import "./JsonTreeNode.css";

type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

interface JsonTreeNodeProps {
  label?: string;
  value: JsonValue;
  depth?: number;
  defaultExpanded?: boolean;
}

function getType(value: JsonValue): string {
  if (value === null) return "null";
  if (Array.isArray(value)) return "array";
  return typeof value;
}

function getPreview(value: JsonValue): string {
  if (value === null) return "null";
  if (Array.isArray(value)) return `Array(${value.length})`;
  if (typeof value === "object") return `{${Object.keys(value).length} keys}`;
  if (typeof value === "string") return `"${value}"`;
  return String(value);
}

export default function JsonTreeNode({
  label,
  value,
  depth = 0,
  defaultExpanded = true,
}: JsonTreeNodeProps) {
  const [expanded, setExpanded] = useState(defaultExpanded && depth < 2);
  const type = getType(value);
  const isExpandable = type === "object" || type === "array";

  if (!isExpandable) {
    return (
      <div className="tree-node leaf" style={{ paddingLeft: depth * 20 }}>
        {label !== undefined && <span className="tree-key">{label}: </span>}
        <span className={`tree-value type-${type}`}>{getPreview(value)}</span>
      </div>
    );
  }

  const entries =
    type === "array"
      ? (value as JsonValue[]).map((v, i) => [String(i), v] as const)
      : Object.entries(value as Record<string, JsonValue>);

  return (
    <div className="tree-node" data-testid={`tree-node-${label ?? "root"}`}>
      <div
        className="tree-toggle"
        style={{ paddingLeft: depth * 20 }}
        onClick={() => setExpanded(!expanded)}
        role="button"
        aria-expanded={expanded}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") setExpanded(!expanded);
        }}
      >
        <span className="tree-arrow">{expanded ? "▼" : "▶"}</span>
        {label !== undefined && <span className="tree-key">{label}: </span>}
        <span className="tree-preview">
          {type === "array" ? `[${entries.length}]` : `{${entries.length}}`}
        </span>
      </div>
      {expanded && (
        <div className="tree-children">
          {entries.map(([key, val]) => (
            <JsonTreeNode
              key={key}
              label={key}
              value={val}
              depth={depth + 1}
              defaultExpanded={defaultExpanded}
            />
          ))}
        </div>
      )}
    </div>
  );
}
