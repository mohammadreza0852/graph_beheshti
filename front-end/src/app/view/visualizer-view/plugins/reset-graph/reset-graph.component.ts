import { Component, OnInit } from '@angular/core';
import {PluginsService} from "../plugins-tree-view/services/plugins.service";
import {G6BaseService} from "../../services/g6-base.service";
import {VisualizerService} from "../../services/visualizer.service";

@Component({
  selector: 'app-reset-graph',
  templateUrl: './reset-graph.component.html',
  styleUrls: ['./reset-graph.component.scss']
})
export class ResetGraphComponent {

  public constructor(pluginService: PluginsService, private g6BaseService: G6BaseService) {
    const plugin = pluginService.getPluginData('reset');
    plugin?.subject?.subscribe(() => {
      this.execute();
    });
  }

  execute(): void {
    this.g6BaseService.graph.clear();
    const container = document.getElementById('graph-container')!;
    container.innerHTML = '';

    this.g6BaseService.init(container);
  }
}
