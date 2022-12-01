import {Component} from '@angular/core';
import {PluginsService} from "../../plugins-tree-view/services/plugins.service";
import {G6BaseService} from "../../../services/g6-base.service";

@Component({
    selector: 'app-circular-layout',
    templateUrl: './circular-layout.component.html',
    styleUrls: ['./circular-layout.component.scss'],
})
export class CircularLayoutComponent {
    public constructor(pluginService: PluginsService, private g6BaseService: G6BaseService) {
        const plugin = pluginService.getPluginData('circular');
        plugin?.subject?.subscribe(() => {
            this.execute();
        });
    }

    execute(): void {
        this.g6BaseService.graph.updateLayout({
            type: 'circular',
            radius: null,
            clockwise: false,
            divisions: 5,
            ordering: 'degree',
            angleRatio: 1,
            overlap: false
        })
    }
}
