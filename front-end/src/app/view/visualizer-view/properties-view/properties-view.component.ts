import {Component} from '@angular/core';
import {G6UtilitiesService} from '../services/g6-utilities.service';
import {Item} from '@antv/g6';
import {VisualizerService} from '../services/visualizer.service';

@Component({
    selector: 'app-properties-view',
    templateUrl: './properties-view.component.html',
    styleUrls: ['./properties-view.component.scss'],
})
export class PropertiesViewComponent {
    public isEnable = false;
    public firstOpen = true;

    data: ItemData[] = [];

    public constructor(g6UtilityService: G6UtilitiesService, visualizerService: VisualizerService) {
        g6UtilityService.nodeDoubleClick.subscribe(async (item: Item) => {
            this.isEnable = true;
            this.firstOpen = false;

            const node = visualizerService.graph.nodes.find((x) => x.graphId === item._cfg?.id);
            if (node == null) return;

            const properties = await visualizerService.getNodeProperties(node.id, node?.type);

            this.data = [];
            for (const propertiesKey in properties) {
                this.data.push({
                    title: propertiesKey,
                    content: properties[propertiesKey],
                });
            }
        });
    }
}

export class ItemData {
    public avatar?: string;
    public title?: string;
    public href?: string;
    public description?: string;
    public content?: string;
}
