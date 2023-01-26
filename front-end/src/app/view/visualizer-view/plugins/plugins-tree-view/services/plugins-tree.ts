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
            {
                name: 'node ranking (degree)',
                expandable: true,
                children: [
                    {
                        name: 'size',
                        expandable: false,
                        subject: new Subject<void>(),
                    }
                ]
            },
            {
                name: 'filters',
                expandable: true,
                children: [
                    {
                        name: 'properties',
                        expandable: false,
                        subject: new Subject<void>(),
                    },
                    {
                        name: 'degree',
                        expandable: false,
                        subject: new Subject<void>(),
                    },
                    {
                        name: 'custom filters',
                        expandable: false,
                        subject: new Subject<void>(),
                    },
                    {
                        name: 'node custom filters',
                        expandable: false,
                        subject: new Subject<void>(),
                    }
                ]
            },
            {
                name: 'expand',
                expandable: false,
                subject: new Subject<void>()
            },
            {
                name: 'reset',
                expandable: false,
                subject: new Subject<void>()
            }
        ]
    }
];
