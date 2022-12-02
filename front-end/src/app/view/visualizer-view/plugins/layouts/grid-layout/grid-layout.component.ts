import { Component, OnInit } from '@angular/core';
import {PluginsService} from "../../plugins-tree-view/services/plugins.service";
import {G6BaseService} from "../../../services/g6-base.service";

@Component({
  selector: 'app-grid-layout',
  templateUrl: './grid-layout.component.html',
  styleUrls: ['./grid-layout.component.scss']
})
export class GridLayoutComponent {

  public constructor(pluginService: PluginsService, private g6BaseService: G6BaseService) {
    const plugin = pluginService.getPluginData('grid');
    plugin?.subject?.subscribe(() => {
      this.execute();
    });
  }

  execute(): void {
    this.g6BaseService.graph.updateLayout({
      type: 'grid',
      preventOverlap: true, // nodeSize or size in data is required for preventOverlap: true
    })
  }
}
