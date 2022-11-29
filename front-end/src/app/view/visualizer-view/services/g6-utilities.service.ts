import {Injectable} from '@angular/core';
import {Graph, IEdge, IG6GraphEvent, IItemBase, INode, Item} from '@antv/g6';
import {Subject} from 'rxjs';

@Injectable()
export class G6UtilitiesService {
    public nodeDoubleClick = new Subject<Item>();

    public handleNodeMouseEnter(graph: Graph): void {
        graph.on('node:mouseenter', (e: IG6GraphEvent) => {
            const nodeItem = e.item as Item;
            graph.setItemState(nodeItem, 'hover', true);

            this.setOtherItems(graph, nodeItem as INode);
        });
    }

    private setOtherItems(graph:Graph, nodeItem: INode): void {
        const nodeNeighbors = graph.getNeighbors(nodeItem);
        const nodeNeighborIds = this.getIds(nodeNeighbors as any);
        const edgeNeighborIds = this.getIds(nodeItem.getEdges());

        const allNodes = graph.getNodes();
        const allEdges = graph.getEdges();

        const otherNodes: INode[] = [];
        const otherEdges: IEdge[] = [];

        for (const node of allNodes) {
            const nodeId = node.getID()

            if (!nodeNeighborIds.has(nodeId) && nodeId !== nodeItem.getID()) {
                otherNodes.push(node);
            }
        }

        for (const edge of allEdges) {
            const edgeId = edge.getID()

            if (!edgeNeighborIds.has(edgeId)) {
                otherEdges.push(edge);
            }
        }

        for (const node of otherNodes) {
            graph.setItemState(node, 'hoverOther', true);
        }

        for (const edge of otherEdges) {
            graph.setItemState(edge, 'hoverOther', true);
        }
    }

    private getIds(baseItems: IItemBase[]): Map<string, string> {
        const result = new Map<string, string>();
        for (const baseItem of baseItems) {
            const id = baseItem.getID();
            result.set(id, id);
        }
        return result;
    }

    public handleNodeMouseLeave(graph: Graph): void {
        graph.on('node:mouseleave', (e: IG6GraphEvent) => {
            const nodeItem = e.item as Item;
            graph.setItemState(nodeItem, 'hover', false);

            const edges = graph.getEdges();
            const nodes = graph.getNodes();
            for (const node of nodes) {
                graph.setItemState(node, 'hoverOther', false);
            }

            for (const edge of edges) {
                graph.setItemState(edge, 'hoverOther', false);
            }
        });
    }

    public handleNodeMouseDoubleClick(graph: Graph): void {
        graph.on('node:dblclick', (e: IG6GraphEvent) => {
            const nodeItem = e.item as Item;

            this.nodeDoubleClick.next(nodeItem);
        });
    }

    public handleEdgeMouseEnter(graph: Graph): void {
        graph.on('edge:mouseenter', (e: IG6GraphEvent) => {
            const nodeItem = e.item as Item;
            graph.setItemState(nodeItem, 'hover', true);
        });
    }

    public handleEdgeMouseLeave(graph: Graph): void {
        graph.on('edge:mouseleave', (e: IG6GraphEvent) => {
            const nodeItem = e.item as Item;
            graph.setItemState(nodeItem, 'hover', false);
        });
    }
}
