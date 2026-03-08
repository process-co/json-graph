import { ReactElement } from 'react';

interface JsonGraphProps {
    json: string | object;
    className?: string;
}
declare function JsonGraph(props: JsonGraphProps): ReactElement;

/**
 * Internal node shape produced by the parser (has width/height for layout).
 * Mapped to xyflow nodes after layout.
 */
interface GraphNode {
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
interface GraphEdge {
    id: string;
    source: string;
    target: string;
}
interface ParseResult {
    nodes: GraphNode[];
    edges: GraphEdge[];
}

/**
 * Parse a JSON string (or stringify an object) into internal graph nodes and edges
 * with width/height for layout. Use getLayoutedElements to add positions for React Flow.
 */
declare function parseJsonToGraph(json: string | object): ParseResult;

export { type GraphEdge, type GraphNode, JsonGraph, type ParseResult, parseJsonToGraph };
