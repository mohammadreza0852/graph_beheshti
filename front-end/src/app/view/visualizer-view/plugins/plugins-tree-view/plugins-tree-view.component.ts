import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';
import {SelectionModel} from '@angular/cdk/collections';
import {NzTreeFlatDataSource, NzTreeFlattener} from 'ng-zorro-antd/tree-view';
import {PluginData} from './models/plugin-data';
import {PluginsService} from './services/plugins.service';

@Component({
    selector: 'app-plugins-tree-view',
    templateUrl: './plugins-tree-view.component.html',
    styleUrls: ['./plugins-tree-view.component.scss'],
})
export class PluginsTreeViewComponent implements AfterViewInit {
    treeControl = new FlatTreeControl<PluginData>(
        (node: any) => node.level,
        (node: any) => node.expandable
    );

    public ngAfterViewInit(): void {
        this.treeControl.expandAll();
    }

    private transformer = (node: PluginData, level: number) => ({
        expandable: !!node.children && node.children.length > 0,
        name: node.name,
        level,
        disabled: !!node.disabled,
    });
    selectListSelection = new SelectionModel<PluginData>();

    public treeFlattener = new NzTreeFlattener(
        this.transformer,
        (node) => node.level,
        (node) => node.expandable,
        (node) => node.children
    );

    public dataSource = new NzTreeFlatDataSource(this.treeControl, this.treeFlattener as any);

    constructor(private pluginsService: PluginsService) {
        this.dataSource.setData(pluginsService.plugins);
    }

    hasChild = (_: number, node: PluginData): boolean => node.expandable;

    private isSingleClick = false;

    public click(node: PluginData) {
        if (this.isSingleClick) {
            const plugin = this.pluginsService.getPluginData(node.name);
            plugin?.subject?.next();
            this.isSingleClick = false;
            return;
        }

        this.isSingleClick = true;

        setTimeout(() => {
            this.isSingleClick = false;
        }, 250);
    }
}
