import { parseTree } from 'jsonc-parser';
import type { ParseResult } from './types';
import { addEdgeToGraph } from './addEdgeToGraph';
import { addNodeToGraph } from './addNodeToGraph';
import { traverse, type ParserStates } from './traverse';

function initializeStates(): ParserStates {
  return {
    parentName: '',
    bracketOpen: [],
    objectsFromArray: [],
    objectsFromArrayId: 0,
    notHaveParent: [],
    brothersNode: [],
    brothersParentId: undefined,
    brotherKey: '',
    brothersNodeProps: [],
    graph: { nodes: [], edges: [] },
  };
}

/**
 * Parse a JSON string (or stringify an object) into internal graph nodes and edges
 * with width/height for layout. Use getLayoutedElements to add positions for React Flow.
 */
export function parseJsonToGraph(json: string | object): ParseResult {
  try {
    const jsonStr = typeof json === 'string' ? json : JSON.stringify(json);
    const states = initializeStates();
    const parsedJsonTree = parseTree(jsonStr);
    if (!parsedJsonTree) {
      throw new Error('Invalid document');
    }

    traverse({ states, objectToTraverse: parsedJsonTree });

    const { notHaveParent, graph } = states;
    if (notHaveParent.length > 1 && parsedJsonTree.type !== 'array') {
      const emptyId = addNodeToGraph({ graph, text: '', isEmpty: true });
      for (const childId of notHaveParent) {
        addEdgeToGraph(graph, emptyId, childId);
      }
    }

    if (states.graph.nodes.length === 0) {
      if (parsedJsonTree.type === 'array') {
        addNodeToGraph({ graph: states.graph, text: '[]' });
      } else {
        addNodeToGraph({ graph: states.graph, text: '{}' });
      }
    }

    return states.graph;
  } catch {
    return { nodes: [], edges: [] };
  }
}
