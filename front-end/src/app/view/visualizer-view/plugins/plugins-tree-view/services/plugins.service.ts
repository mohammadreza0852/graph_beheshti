import {Injectable} from '@angular/core';
import {PluginData} from '../models/plugin-data';
import {plugins} from './plugins-tree';

@Injectable()
export class PluginsService {
    public plugins: PluginData[] = plugins;

    public getPluginData(pluginName: string, plugins: PluginData[] = this.plugins): PluginData | null {
        if (plugins == null) return null;

        for (const plugin of plugins) {
            if (plugin.name === pluginName) {
                return plugin;
            }

            const child = this.getPluginData(pluginName, plugin.children);
            if (child != null) return child;
        }

        return null;
    }
}
