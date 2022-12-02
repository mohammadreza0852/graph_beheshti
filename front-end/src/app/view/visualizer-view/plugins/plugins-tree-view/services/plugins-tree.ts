import {PluginData} from '../models/plugin-data';
import {Subject} from 'rxjs';

export const plugins: PluginData[] = [
    {
        name: 'plugins',
        expandable: true,
        children: [
            {
                name: 'layouts',
                expandable: true,
                children: [
                    {
                        name: 'circular',
                        expandable: false,
                        subject: new Subject<void>(),
                    },
                    {
                        name: 'random',
                        expandable: false,
                        subject: new Subject<void>(),
                    },
                    {
                        name: 'grid',
                        expandable: false,
                        subject: new Subject<void>(),
                    },
                ],
            },
        ]
    }
];
