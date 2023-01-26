import {Component} from '@angular/core';
import {PluginsService} from "../../plugins-tree-view/services/plugins.service";
import {HttpClient} from "@angular/common/http";
import {Config} from "../../../../../api/config";
import {NzMessageService} from "ng-zorro-antd/message";

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
        private message: NzMessageService) {
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
        const result = (await this.http.get(`${this.baseUrl}/api/property/?type=${type}`).toPromise()) as any;
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
