import { Component, OnInit } from '@angular/core';
import {PluginsService} from "../../plugins-tree-view/services/plugins.service";
import {G6BaseService} from "../../../services/g6-base.service";

@Component({
  selector: 'app-random-layout',
  templateUrl: './random-layout.component.html',
  styleUrls: ['./random-layout.component.scss']
})
export class RandomLayoutComponent {
  public constructor(pluginService: PluginsService, private g6BaseService: G6BaseService) {
    const plugin = pluginService.getPluginData('random');
    plugin?.subject?.subscribe(() => {
      this.execute();
    });
  }

  execute(): void {
    this.g6BaseService.graph.updateLayout({
      type: 'random',
    })
  }
}
