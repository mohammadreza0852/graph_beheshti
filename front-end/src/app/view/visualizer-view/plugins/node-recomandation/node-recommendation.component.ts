import {Component} from '@angular/core';
import {PluginsService} from '../plugins-tree-view/services/plugins.service';
import {HttpClient} from '@angular/common/http';
import {INode} from '@antv/g6';
import {GraphNode} from '../../models/graph-node';
import {G6BaseService} from '../../services/g6-base.service';
import {VisualizerService} from '../../services/visualizer.service';
import {Config} from "../../../../api/config";
import {NzMessageService} from "ng-zorro-antd/message";
import {GraphDto} from "../../../../api/models/graph-dto";
import {Graph} from "../../models/graph";

@Component({
    selector: 'app-node-recommendation',
    templateUrl: './node-recommendation.component.html',
    styleUrls: ['./node-recommendation.component.scss'],
})
export class NodeRecommendationComponent {
    public baseUrl = Config.baseServiceUrl;
    public recommendedNodes: { node_type: string, node_id: string }[] = [];
    public isVisible = false;
    public isOkLoading = false;
    public radioValue?: number;
    public selectedNode: GraphNode | null = null;

    public constructor(
        pluginService: PluginsService,
        private g6BaseService: G6BaseService,
        private http: HttpClient,
        private visualizerService: VisualizerService,
        private message: NzMessageService
    ) {
        const plugin = pluginService.getPluginData('recommend node');
        plugin?.subject?.subscribe(() => {
            this.execute();
        });
    }

    public async execute(): Promise<void> {
        if (!this.visualizerService.getDatasetId()) {
            this.message.create('error', 'please select one specific dataset.')
            return;
        }

        const nodes: INode[] = this.g6BaseService.graph.getNodes();
        for (const node of nodes) {
            const states = node.getStates();
            for (const state of states) {
                if (state === 'selectedNode') {
                    this.selectedNode = this.visualizerService.graph.getNode(node.getID())!;
                }
            }
        }
        if (!this.selectedNode) {
            this.message.create('error', 'please select one specific node.')
            return;
        }
        const nodeType = this.selectedNode!.type;
        const nodeId = this.selectedNode!.id;
        this.recommendedNodes = (await this.http
            .get(`${this.baseUrl}/api/recommand/?id=${nodeId}&type=${nodeType}`)
            .toPromise()) as any;

        this.isVisible = true;
    }

    public async handleOk(): Promise<void> {
        if (!this.radioValue) {
            this.message.create('error', 'please select one specific item.')
            return;
        }
        this.isOkLoading = true;
        const url = `${this.baseUrl}/api/graph/`;
        const body = {
            "first_node_type": this.selectedNode!.type,
            "first_node_id": this.selectedNode!.id,
            "second_node_type": this.recommendedNodes[this.radioValue].node_type,
            "second_node_id": this.recommendedNodes[this.radioValue].node_id,
            "description": "",
            "dataset": this.visualizerService.getDatasetId()
        };

        const result = await this.http.post(url, body).toPromise();
        await this.createGraph(result);
        this.isVisible = false;
        this.isOkLoading = false;
    }

    public async createGraph(result: any): Promise<void> {
        const dto: GraphDto[] = [];
        dto.push(new GraphDto(result));

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

    handleCancel(): void {
        this.isVisible = false;
    }
}
