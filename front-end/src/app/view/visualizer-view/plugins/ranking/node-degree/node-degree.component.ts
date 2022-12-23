import { Component, OnInit } from '@angular/core';
import {PluginsService} from "../../plugins-tree-view/services/plugins.service";
import {G6BaseService} from "../../../services/g6-base.service";

@Component({
  selector: 'app-node-degree',
  templateUrl: './node-degree.component.html',
  styleUrls: ['./node-degree.component.scss']
})
export class NodeDegreeComponent {
  isVisible = false;
  isOkLoading = false;

  public minValue: number = 30;
  public maxValue: number = 50;

  public constructor(pluginService: PluginsService, private g6BaseService: G6BaseService) {
    const plugin = pluginService.getPluginData('size');
    plugin?.subject?.subscribe(() => {
      this.execute();
    });
  }

  private execute(): void {
    this.isVisible = true;
  }

  public handleOk(): void {
    this.isOkLoading = true;

    const graph = this.g6BaseService.graph;
    const nodes = graph.getNodes();

    let maxDegree = -1;
    let minDegree = 10000000000000000;
    for (const node of nodes) {
      const degree = node.getNeighbors().length;

      if (degree > maxDegree) maxDegree = degree;
      if (degree < minDegree) minDegree = degree;
    }

    for (const node of nodes) {
      const degree = node.getNeighbors().length;

      const size = this.getSize(degree, minDegree, maxDegree);

      graph.updateItem(node, {
        size
      });
    }

    this.isVisible = false;
    this.isOkLoading = false;
  }

  private getSize(degree: number, minDegree: number, maxDegree: number): number {
    if (this.minValue === this.maxValue) return this.maxValue;

    if (minDegree === maxDegree) return (this.maxValue + this.minValue) / 2;

    return (Math.abs(degree - minDegree) / (maxDegree - minDegree)) * (this.maxValue - this.minValue) + this.minValue;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  valueChange() {
    if (this.minValue > this.maxValue) {
      this.maxValue = this.minValue;
    }
  }
}
