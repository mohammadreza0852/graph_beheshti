import {Component, OnInit} from '@angular/core';
import {PluginsService} from '../../plugins-tree-view/services/plugins.service';
import {G6BaseService} from '../../../services/g6-base.service';
import {CustomFilterService} from './services/custom-filter.service';
import {CustomFilterDto} from './models/custom-filter-dto';

@Component({
    selector: 'app-custom-filters',
    templateUrl: './custom-filters.component.html',
    styleUrls: ['./custom-filters.component.scss'],
})
export class CustomFiltersComponent implements OnInit {
    public isVisible = false;
    public isOkLoading = false;
    public selectedValue?: number;
    public filters!: CustomFilterDto[];

    public constructor(pluginService: PluginsService, private customFilterService: CustomFilterService) {
        const plugin = pluginService.getPluginData('custom filters');
        plugin?.subject?.subscribe(() => {
            this.execute();
        });
    }

    public async ngOnInit(): Promise<void> {
      this.filters = await this.customFilterService.getCustomFilters();
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

            if (splitParam[0] != 'filterId') {
                newParams.push(splitParam.join("="))
            } else {
                filterAdded = true;
                newParams.push(`filterId=${this.selectedValue}`);
            }
        }

        if (!filterAdded) {
            newParams.push(`filterId=${this.selectedValue}`)
        }


        console.log(split)
        return base + '?' + newParams.join('&');
    }
}
