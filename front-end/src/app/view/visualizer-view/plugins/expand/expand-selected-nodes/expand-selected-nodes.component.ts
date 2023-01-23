import {Component} from '@angular/core';
import {PluginsService} from "../../plugins-tree-view/services/plugins.service";
import {VisualizerService} from "../../../services/visualizer.service";
import {G6BaseService} from "../../../services/g6-base.service";
import G6, {INode} from "@antv/g6";
import {GraphNode} from "../../../models/graph-node";
import {HttpClient} from "@angular/common/http";
import {Config} from "../../../../../api/config";
import {NzMessageService} from "ng-zorro-antd/message";
import {GraphDto} from "../../../../../api/models/graph-dto";
import {Graph} from "../../../models/graph";

@Component({
    selector: 'app-expand-selected-nodes',
    templateUrl: './expand-selected-nodes.component.html',
    styleUrls: ['./expand-selected-nodes.component.scss']
})
export class ExpandSelectedNodesComponent {
    public baseUrl = Config.baseServiceUrl;

    public constructor(
        pluginService: PluginsService,
        private g6BaseService: G6BaseService,
        private visualizerService: VisualizerService,
        private http: HttpClient,
        private message: NzMessageService) {

        const plugin = pluginService.getPluginData('expand');
        plugin?.subject?.subscribe(() => {
            this.execute();
        });
    }

    private async execute(): Promise<void> {
        const nodes: INode[] = this.g6BaseService.graph.getNodes();
        let selectedNode: GraphNode | null = null;
        for (const node of nodes) {
            const states = node.getStates();
            for (const state of states) {
                if (state === 'selectedNode') {
                    selectedNode = this.visualizerService.graph.getNode(node.getID())!;
                }
            }
        }

        const datasetId = this.visualizerService.getDatasetId();
        if (!datasetId) {
            this.message.create('error', 'please select one specific dataset.')
            return;
        }

        if (!selectedNode) {
            this.message.create('error', 'please select one specific node.')
            return;
        }

        const nodeType = selectedNode!.type;
        const nodeId = selectedNode!.id;

        const dto: GraphDto[] = [];

        const result = (await this.http
            .get(`${this.baseUrl}/api/expand/?id=${nodeId}&type=${nodeType}&dataset_id=${datasetId}`).toPromise()) as any;

        for (const resultElement of result) {
            dto.push(new GraphDto(resultElement));
        }

        const graph = new Graph(dto);

        for (const node of graph.nodes) {
            if (this.visualizerService.graph.isNodeExist(node.graphId)) {
                continue;
            }

            this.visualizerService.graph.nodes.push(node);
        }

        for (const edge of graph.edges) {
            if (this.visualizerService.graph.isEdgeExist(edge.graphId)) {
                continue;
            }

            this.visualizerService.graph.edges.push(edge);
        }

        await this.g6BaseService.renderGraph(this.visualizerService.graph);
    }
}
