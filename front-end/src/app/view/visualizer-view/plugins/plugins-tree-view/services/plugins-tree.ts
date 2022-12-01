import {PluginData} from '../models/plugin-data';
import {Subject} from "rxjs";

export const plugins: PluginData[] = [
    {
        name: 'layouts',
        expandable: true,
        children: [
            {
                name: 'circular',
                expandable: false,
                subject: new Subject<void>()
            },
        ],
    },
];
