import {Component} from '@angular/core';
import {PluginsService} from '../../plugins-tree-view/services/plugins.service';
import {G6BaseService} from '../../../services/g6-base.service';

@Component({
    selector: 'app-degree-filter',
    templateUrl: './degree-filter.component.html',
    styleUrls: ['./degree-filter.component.scss'],
})
export class DegreeFilterComponent {
    isVisible = false;
    isOkLoading = false;

    public minValue: number = 0;
    public maxValue: number = 0;

    public constructor(pluginService: PluginsService, private g6BaseService: G6BaseService) {
        const plugin = pluginService.getPluginData('degree');
        plugin?.subject?.subscribe(() => {
            this.execute();
        });
    }

    execute(): void {
        this.isVisible = true;
    }

    handleOk(): void {
        this.isOkLoading = true;
        const nodes = this.g6BaseService.graph.getNodes();
        const edges = this.g6BaseService.graph.getEdges();

        for (const node of nodes) {
            const degree = node.getNeighbors().length;
            if (degree < this.minValue || degree > this.maxValue) {
                this.g6BaseService.graph.setItemState(node, 'degreeHide', true);
            }
        }

        for (const edge of edges) {
            this.g6BaseService.graph.setItemState(edge, 'degreeHide', true);
        }

        this.isVisible = false;
        this.isOkLoading = false;
    }

    handleCancel(): void {
        this.isVisible = false;
    }

    minValueChange() {
        if (this.minValue > this.maxValue) {
            this.maxValue = this.minValue;
        }
    }
}
