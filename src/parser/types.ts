/**
 * Internal node shape produced by the parser (has width/height for layout).
 * Mapped to xyflow nodes after layout.
 */
export interface GraphNode {
  id: string;
  width: number;
  height: number;
  text: string | [string, string][];
  data: {
    type: string;
    isParent: boolean;
    isEmpty: boolean;
    childrenCount: number;
    isRoot?: boolean;
    path?: string;
    [key: string]: unknown;
  };
}

/**
 * Edge shape: source/target for xyflow compatibility.
 */
export interface GraphEdge {
  id: string;
  source: string;
  target: string;
}

export interface ParseResult {
  nodes: GraphNode[];
  edges: GraphEdge[];
}
