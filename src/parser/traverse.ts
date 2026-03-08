import type { Node } from 'jsonc-parser';
import type { ParseResult } from './types';
import { addEdgeToGraph } from './addEdgeToGraph';
import { addNodeToGraph } from './addNodeToGraph';
import { calculateNodeSize } from './calculateNodeSize';

export interface ParserStates {
  parentName: string;
  bracketOpen: { id: string; type: string }[];
  objectsFromArray: number[];
  objectsFromArrayId: number;
  notHaveParent: string[];
  brothersNode: [string, string][];
  brothersParentId: string | undefined;
  brotherKey: string;
  brothersNodeProps: {
    id: string;
    parentId: string | undefined;
    objectsFromArrayId: number | undefined;
  }[];
  graph: ParseResult;
}

type PrimitiveOrNullType = 'boolean' | 'string' | 'number' | 'null';

function isPrimitiveOrNullType(type: unknown): type is PrimitiveOrNullType {
  return ['boolean', 'string', 'number', 'null'].includes(type as string);
}

function alignChildren(nodeA: Node, nodeB: Node): number {
  const aChildType = nodeA?.children?.[1]?.type;
  const bChildType = nodeB?.children?.[1]?.type;
  if (!isPrimitiveOrNullType(aChildType) && isPrimitiveOrNullType(bChildType)) return 1;
  if (isPrimitiveOrNullType(aChildType) && !isPrimitiveOrNullType(bChildType)) return -1;
  return 0;
}

function handleNoChildren(
  value: string | undefined,
  states: ParserStates,
  graph: ParseResult,
  myParentId?: string,
  parentType?: string,
  nextType?: string
): void {
  if (value === undefined) return;
  if (
    parentType === 'property' &&
    nextType !== 'object' &&
    nextType !== 'array'
  ) {
    states.brothersParentId = myParentId;
    // Match jsontree: only push at value node (nextType === undefined). At key node nextType is value type.
    if (nextType === undefined) {
      states.brothersNode.push([states.brotherKey, value]);
    } else {
      states.brotherKey = value;
    }
  } else if (parentType === 'array') {
    const nodeFromArrayId = addNodeToGraph({ graph, text: String(value) });
    if (myParentId) addEdgeToGraph(graph, myParentId, nodeFromArrayId);
  }
  if (
    nextType &&
    parentType !== 'array' &&
    (nextType === 'object' || nextType === 'array')
  ) {
    states.parentName = value;
  }
}

function handleHasChildren(
  type: string,
  states: ParserStates,
  graph: ParseResult,
  children: Node[],
  myParentId?: string,
  parentType?: string
): void {
  let parentId: string | undefined;
  let savedParentKey: { name: string; type: string } | null = null;

  if (type !== 'property' && states.parentName !== '') {
    if (states.brothersNode.length > 0) {
      const findBrothersNode = states.brothersNodeProps.find(
        (e) =>
          e.parentId === states.brothersParentId &&
          e.objectsFromArrayId ===
            states.objectsFromArray[states.objectsFromArray.length - 1]
      );
      if (findBrothersNode) {
        const findNodeIndex = graph.nodes.findIndex((e) => e.id === findBrothersNode?.id);
        if (findNodeIndex !== -1) {
          const modifyNodes = [...graph.nodes];
          const foundNode = modifyNodes[findNodeIndex];
          if (foundNode) {
            foundNode.text = Array.isArray(foundNode.text)
              ? foundNode.text.concat(states.brothersNode)
              : states.brothersNode;
            const { width, height } = calculateNodeSize(foundNode.text, false);
            foundNode.width = width;
            foundNode.height = height;
            graph.nodes = modifyNodes;
            states.brothersNode = [];
          }
        }
      } else {
        const brothersNodeId = addNodeToGraph({ graph, text: states.brothersNode });
        states.brothersNode = [];
        if (states.brothersParentId) {
          addEdgeToGraph(graph, states.brothersParentId, brothersNodeId);
        } else {
          states.notHaveParent.push(brothersNodeId);
        }
        states.brothersNodeProps.push({
          id: brothersNodeId,
          parentId: states.brothersParentId,
          objectsFromArrayId: states.objectsFromArray[states.objectsFromArray.length - 1],
        });
      }
    }

    savedParentKey = { name: states.parentName, type };
    parentId = addNodeToGraph({ graph, type: type as 'object' | 'array', text: states.parentName });
    states.bracketOpen.push({ id: parentId, type });
    states.parentName = '';

    const brothersProps = states.brothersNodeProps.filter(
      (e) =>
        e.parentId === myParentId &&
        e.objectsFromArrayId === states.objectsFromArray[states.objectsFromArray.length - 1]
    );
    if (
      (brothersProps.length > 0 &&
        states.bracketOpen[states.bracketOpen.length - 2]?.type !== 'object') ||
      (brothersProps.length > 0 && states.bracketOpen.length === 1)
    ) {
      addEdgeToGraph(graph, brothersProps[brothersProps.length - 1]!.id, parentId);
    } else if (myParentId) {
      addEdgeToGraph(graph, myParentId, parentId);
    } else {
      states.notHaveParent.push(parentId);
    }
  } else if (parentType === 'array') {
    states.objectsFromArray = [...states.objectsFromArray, states.objectsFromArrayId++];
  }

  const traverseObject = (objectToTraverse: Node, nextType: string | undefined) => {
    traverse({
      states,
      objectToTraverse,
      parentType: type,
      myParentId: states.bracketOpen[states.bracketOpen.length - 1]?.id,
      nextType,
    });
  };
  const traverseArray = () => {
    children.forEach((objectToTraverse, index, array) => {
      const nextType = array[index + 1]?.type;
      traverseObject(objectToTraverse, nextType);
    });
  };

  if (type === 'object') {
    children.sort(alignChildren);
    traverseArray();
  } else {
    traverseArray();
  }

  if (type !== 'property') {
    if (states.brothersNode.length > 0) {
      const findBrothersNode = states.brothersNodeProps.find(
        (e) =>
          e.parentId === states.brothersParentId &&
          e.objectsFromArrayId === states.objectsFromArray[states.objectsFromArray.length - 1]
      );
      if (findBrothersNode) {
        const modifyNodes = [...graph.nodes];
        const findNodeIndex = modifyNodes.findIndex((e) => e.id === findBrothersNode?.id);
        if (findNodeIndex !== -1 && modifyNodes[findNodeIndex]) {
          const n = modifyNodes[findNodeIndex]!;
          n.text = Array.isArray(n.text) ? n.text.concat(states.brothersNode) : states.brothersNode;
          const { width, height } = calculateNodeSize(n.text, false);
          n.width = width;
          n.height = height;
          graph.nodes = modifyNodes;
          states.brothersNode = [];
        }
      } else {
        const brothersNodeId = addNodeToGraph({ graph, text: states.brothersNode });
        states.brothersNode = [];
        if (states.brothersParentId) {
          addEdgeToGraph(graph, states.brothersParentId, brothersNodeId);
        } else {
          states.notHaveParent = [...states.notHaveParent, brothersNodeId];
        }
        states.brothersNodeProps.push({
          id: brothersNodeId,
          parentId: states.brothersParentId,
          objectsFromArrayId: states.objectsFromArray[states.objectsFromArray.length - 1],
        });
      }
    }

    if (parentType === 'array') {
      if (states.objectsFromArray.length > 0) states.objectsFromArray.pop();
    } else {
      if (states.bracketOpen.length > 0) states.bracketOpen.pop();
    }

    if (parentId) {
      const myChildren = graph.edges.filter((e) => e.source === parentId);
      const childrenCount = myChildren.length;
      const parentIndex = graph.nodes.findIndex((node) => node.id === parentId);
      graph.nodes = graph.nodes.map((node, index) => {
        if (index === parentIndex) {
          return { ...node, data: { ...node.data, childrenCount } };
        }
        return node;
      });

      if (savedParentKey) {
        const edgeToParent = graph.edges.find((e) => e.target === parentId);
        const broIndex =
          edgeToParent?.source != null
            ? graph.nodes.findIndex((n) => n.id === edgeToParent.source)
            : -1;
        if (broIndex !== -1) {
          const suffix = savedParentKey.type === 'object' ? `{${childrenCount}}` : `[${childrenCount}]`;
          const bro = graph.nodes[broIndex]!;
          const existing = bro.text;
          const asArray = Array.isArray(existing) ? existing : [];
          bro.text = [...asArray, [savedParentKey.name, suffix]];
          const { width, height } = calculateNodeSize(bro.text, false);
          bro.width = width;
          bro.height = height;
          savedParentKey = null;
        }
      }
    }
  }
}

export interface TraverseParams {
  states: ParserStates;
  objectToTraverse: Node;
  parentType?: string;
  myParentId?: string;
  nextType?: string;
}

export function traverse({
  objectToTraverse,
  states,
  myParentId,
  nextType,
  parentType,
}: TraverseParams): void {
  const graph = states.graph;
  const { type, children, value } = objectToTraverse;
  if (!children) {
    handleNoChildren(value as string | undefined, states, graph, myParentId, parentType, nextType);
  } else {
    handleHasChildren(type, states, graph, children, myParentId, parentType);
  }
}
