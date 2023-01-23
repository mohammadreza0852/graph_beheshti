import {Injectable} from '@angular/core';
import {GraphOptions} from '@antv/g6-core';
import G6 from "@antv/g6";

@Injectable({
    providedIn: 'root',
})
export class G6ConfigService {
    public graphContainer!: HTMLElement;

    public g6GraphConfig: GraphOptions = {
        container: 'graph-container',
        fitView: true,
        modes: {
            default: ['drag-canvas', 'drag-node', 'zoom-canvas', {
                type: 'click-select',
                multiple: false,
                selectedState: 'selectedNode'
            }],
        },
        defaultNode: {
            style: {
                fill: '#d4a63b',
            },
        },
        defaultEdge: {
            style: {
                stroke: '#1a34e7',
            },
        },
        nodeStateStyles: {
            hover: {
                stroke: '#c61a1a',
                lineWidth: 2
            },
            hoverOther: {
                fill: 'rgba(212,166,59,0.25)'
            },
            degreeHide: {
                fill: 'rgba(212,166,59,0.07)',
                lineWidth: 0
            },
            degreeBold: {
                lineWidth: 5,
                stroke: '#494fa0',
                fill: 'rgb(216,76,227)'
            },
            selectedNode: {
                stroke: '#c61a1a',
                lineWidth: 4
            }
        },
        edgeStateStyles: {
            hover: {
                stroke: '#c61a1a',
            },
            hoverOther: {
                stroke: 'rgba(26,52,231,0.25)',
            },
            degreeHide: {
                stroke: 'rgba(26,52,231,0.07)',
            }
        },

    };

    public data = {
        nodes: [
            {
                id: 'node1',
                x: 100,
                y: 200,
                size: 30,
                img: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                type: 'donut',
                icon: {
                    show: true,
                    img: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                },
            },
            {
                id: 'node2',
                x: 300,
                y: 200,
                size: 30,
                icon: {
                    show: true,
                    img: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                },
                type: 'donut',
            },
        ],
        edges: [
            {
                source: 'node1',
                target: 'node2',
                size: 5,
                style: {
                    endArrow: {
                        path: G6.Arrow.triangle(10, 10, 5),
                        d: 5
                        // ...
                    },
                }
            },
        ],
    };
}
