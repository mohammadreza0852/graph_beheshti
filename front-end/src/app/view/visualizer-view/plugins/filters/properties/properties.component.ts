import {Component} from '@angular/core';
import {PluginsService} from "../../plugins-tree-view/services/plugins.service";
import {HttpClient} from "@angular/common/http";
import {Config} from "../../../../../api/config";
import {NzMessageService} from "ng-zorro-antd/message";
import {VisualizerService} from "../../../services/visualizer.service";
import {GraphDto} from "../../../../../api/models/graph-dto";
import {Graph} from "../../../models/graph";
import {G6BaseService} from "../../../services/g6-base.service";

@Component({
    selector: 'app-properties',
    templateUrl: './properties.component.html',
    styleUrls: ['./properties.component.scss']
})
export class PropertiesComponent {
    public baseUrl = Config.baseServiceUrl;

    public isVisible = false;
    public isOkLoading = false;
    public selectedNodeType = null;
    public selectedProperty = null;
    public propertyValue = null;

    public nodeTypes: string[] = [
        'House',
        'Person',
        'Vehicle'
    ];

    public properties: string[] = [];

    public constructor(
        pluginService: PluginsService,
        private http: HttpClient,
        private message: NzMessageService,
        private visualizerService: VisualizerService,
        private g6BaseService: G6BaseService) {
        const plugin = pluginService.getPluginData('properties');
        plugin?.subject?.subscribe(() => {
            this.execute();
        });
    }

    private execute(): void {
        this.isVisible = true;
    }

    public async handleOk(): Promise<void> {
        this.isOkLoading = true;
        if (this.selectedNodeType === null) {
            this.message.create('error', 'Select a node type');
            this.isOkLoading = false;
            return;
        }

        if (this.selectedProperty === null) {
            this.message.create('error', 'Select a property');
            this.isOkLoading = false;
            return;
        }

        if (this.propertyValue === null) {
            this.message.create('error', 'Enter property value');
            this.isOkLoading = false;
            return;
        }

        await this.search()

        this.isVisible = false;
        this.isOkLoading = false;
    }

    public async search(): Promise<void> {
        let url = `${this.baseUrl}/api/graph/?type=${this.selectedNodeType}&${this.selectedProperty}=${this.propertyValue}`;
        const datasetId = this.visualizerService.getDatasetId();
        if (datasetId) {
            url += `&dataset_id=${datasetId}`;
        }
        const result = (await this.http
            .get(url).toPromise()) as any;

        const dto: GraphDto[] = [];

        for (const resultElement of result) {
            dto.push(new GraphDto(resultElement));
        }

        this.visualizerService.graph = new Graph(dto);
        await this.g6BaseService.renderGraph(this.visualizerService.graph);
    }

    public handleCancel(): void {
        this.isVisible = false;
    }

    public async getProperties(type: string): Promise<void> {
        this.properties = (await this.http.get(`${this.baseUrl}/api/property/?type=${type}`).toPromise()) as any;
    }

    public async changeType(event: any): Promise<void> {
        this.selectedProperty = null;
        this.properties = [];

        if (event)
            await this.getProperties(event);
    }
}
