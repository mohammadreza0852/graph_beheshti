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
                name: 'rankings',
                expandable: true,
                children: [
                    {
                        name: 'node',
                        expandable: true,
                        children: [
                            {
                                name: 'color',
                                expandable: false,
                                subject: new Subject<void>(),
                            },
                            {
                                name: 'size',
                                expandable: false,
                                subject: new Subject<void>(),
                            }
                        ]
                    },
                    {
                        name: 'edge',
                        expandable: true,
                        children: [
                            {
                                name: 'color',
                                expandable: false,
                                subject: new Subject<void>(),
                            },
                            {
                                name: 'size',
                                expandable: false,
                                subject: new Subject<void>(),
                            }
                        ]
                    }
                ]
            },
            {
                name: 'filters',
                expandable: true,
                children: [
                    {
                        name: 'degree',
                        expandable: false,
                        subject: new Subject<void>(),
                    }
                ]
            },
            {
                name: 'reset',
                expandable: false,
                subject: new Subject<void>()
            }
        ]
    }
];
