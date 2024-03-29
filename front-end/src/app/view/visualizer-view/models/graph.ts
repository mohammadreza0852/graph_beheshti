import {GraphEdge} from './graph-edge';
import {GraphNode} from './graph-node';
import {GraphDto} from '../../../api/models/graph-dto';

export class Graph {
    public nodes: GraphNode[] = [];
    public edges: GraphEdge[] = [];

    public constructor(graphDto: GraphDto[]) {
        const nodeMap = new Map<string, GraphNode>();

        for (const edge of graphDto) {
            const firstNodeId = `${edge.firstNodeId}${edge.firstNodeType}`;
            const secondNodeId = `${edge.secondNodeId}${edge.secondNodeType}`;

            const firstNode = new GraphNode(edge.firstNodeId, edge.firstNodeType);
            if (!nodeMap.has(firstNodeId)) {
                this.nodes.push(firstNode);
                nodeMap.set(`${edge.firstNodeId}${edge.firstNodeType}`, firstNode);
            }

            const secondNode = new GraphNode(edge.secondNodeId, edge.secondNodeType);
            if (!nodeMap.has(secondNodeId)) {
                this.nodes.push(secondNode);
                nodeMap.set(`${edge.secondNodeId}${edge.secondNodeType}`, secondNode);
            }

            const newEdge = new GraphEdge(firstNode.graphId, secondNode.graphId);
            this.edges.push(newEdge);
        }
    }

    public getNode(id: string): GraphNode | null {
        for (const node of this.nodes) {
            if (node.graphId === id) {
                return node;
            }
        }

        return null;
    }

    public isNodeExist(nodeId: string): boolean {
        for (const node of this.nodes) {
            if (node.graphId === nodeId) {
                return true;
            }
        }

        return false;
    }

    isEdgeExist(edgeId: string) {
        for (const edge of this.edges) {
            if (edge.graphId === edgeId) {
                return true;
            }
        }

        return false;
    }
}
