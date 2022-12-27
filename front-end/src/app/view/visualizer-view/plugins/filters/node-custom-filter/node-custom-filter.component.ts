import {Component, OnInit} from '@angular/core';
import {PluginsService} from '../../plugins-tree-view/services/plugins.service';
import {NodeCustomFilterService} from "./services/node-custom-filter.service";
import {NodeCustomFilterDto} from "./models/node-custom-filter-dto";
import {log} from "ng-zorro-antd/core/logger";

@Component({
    selector: 'app-node-custom-filter',
    templateUrl: './node-custom-filter.component.html',
    styleUrls: ['./node-custom-filter.component.scss'],
})
export class NodeCustomFilterComponent implements OnInit {
    public isVisible = false;
    public isOkLoading = false;
    public filters!: NodeCustomFilterDto[];
    public selectedValue?: number;

    public constructor(pluginService: PluginsService, private nodeCustomFilterService: NodeCustomFilterService) {
        const plugin = pluginService.getPluginData('node custom filters');
        plugin?.subject?.subscribe(() => {
            this.execute();
        });
    }

    public async ngOnInit(): Promise<void> {
        this.filters = await this.nodeCustomFilterService.getNodeCustomFilters();
    }

    private execute(): void {
        this.isVisible = true;
    }

    public handleOk(): void {
        this.isOkLoading = true;

        const currentUrl = window.location.href;
        const newUrl = this.getNewUrl(currentUrl)
        window.open(newUrl)

        this.isVisible = false;
        this.isOkLoading = false;
    }

    handleCancel(): void {
        this.isVisible = false;
    }

    private getNewUrl(currentUrl: string): string {
        const split = currentUrl.split("?");
        const base = split[0];
        const params: string[] = split[1]?.split('&') ?? [];
        const newParams: string[] = [];
        let filterAdded = false;

        for (const param of params) {
            const splitParam = param.split('=');

            if (splitParam[0] != 'nodeFilterId') {
                newParams.push(splitParam.join("="))
            } else {
                filterAdded = true;
                newParams.push(`nodeFilterId=${this.selectedValue}`);
            }
        }

        if (!filterAdded) {
            newParams.push(`nodeFilterId=${this.selectedValue}`)
        }


        console.log(split)
        return base + '?' + newParams.join('&');
    }
}
