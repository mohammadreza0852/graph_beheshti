import {Injectable} from '@angular/core';
import {G6ConfigService} from './g6-config.service';
import G6, {Graph} from '@antv/g6';
import {G6UtilitiesService} from './g6-utilities.service';
import {VisualizerService} from './visualizer.service';
import {ImagesRepositoryService} from './images-repository.service';

@Injectable()
export class G6BaseService extends G6ConfigService {
    public constructor(
        private g6UtilitiesService: G6UtilitiesService,
        private visualizerService: VisualizerService,
        private imageRepositoryService: ImagesRepositoryService
    ) {
        super();
    }

    public init(container: HTMLElement): void {
        this.initGraphContainer(container);
        this.initG6Graph();
    }

    public initGraphContainer(container: HTMLElement): void {
        this.graphContainer = container;
    }

    public async initG6Graph(): Promise<void> {
        const graph = new G6.Graph(this.g6GraphConfig);

        this.handleMouseStateChangeOnGraph(graph);

        this.initGraphSize(graph);
        const serverGraphData = await this.visualizerService.getGraph();
        const data = {} as any;
        data.nodes = [];
        data.edges = [];
        for (const node of serverGraphData.nodes) {
            const imageUrl = await this.imageRepositoryService.getImage(node.type);

            data.nodes.push({
                id: node.graphId,
                size: 30,
                img: imageUrl,
                type: 'donut',
                icon: {
                    show: true,
                    img: imageUrl,
                },
            });
        }

        for (const edge of serverGraphData.edges) {
            data.edges.push({
                source: edge.source,
                target: edge.target,
                size: 5,
                style: {
                    endArrow: {
                        path: G6.Arrow.triangle(10, 10, 5),
                        d: 5,
                    },
                },
            });
        }

        graph.data(data);
        graph.render();
    }

    public initGraphSize(graph: Graph): void {
        graph.changeSize(this.graphContainer.offsetWidth, this.graphContainer.offsetHeight);
    }

    public handleMouseStateChangeOnGraph(graph: Graph): void {
        this.g6UtilitiesService.handleNodeMouseEnter(graph);
        this.g6UtilitiesService.handleNodeMouseLeave(graph);
        this.g6UtilitiesService.handleEdgeMouseEnter(graph);
        this.g6UtilitiesService.handleEdgeMouseLeave(graph);
        this.g6UtilitiesService.handleNodeMouseDoubleClick(graph);
    }
}
