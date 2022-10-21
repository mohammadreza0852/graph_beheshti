import {Injectable} from '@angular/core';
import {Graph, IG6GraphEvent, Item} from '@antv/g6';
import {Subject} from 'rxjs';

@Injectable()
export class G6UtilitiesService {
    public nodeDoubleClick = new Subject<Item>();

    public handleNodeMouseEnter(graph: Graph): void {
        graph.on('node:mouseenter', (e: IG6GraphEvent) => {
            const nodeItem = e.item as Item;
            graph.setItemState(nodeItem, 'hover', true);
        });
    }

    public handleNodeMouseLeave(graph: Graph): void {
        graph.on('node:mouseleave', (e: IG6GraphEvent) => {
            const nodeItem = e.item as Item;
            graph.setItemState(nodeItem, 'hover', false);
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
