import {Injectable} from '@angular/core';
import {GraphApiService} from '../../../api/graph-api.service';
import {Graph} from '../models/graph';

@Injectable()
export class VisualizerService {
    public graph!: Graph;
    public constructor(private graphApi: GraphApiService) {}

    public async getGraph(): Promise<Graph> {
        const graphDto = await this.graphApi.getGraph();

        return (this.graph = new Graph(graphDto));
    }

    public async getNodeProperties(id: number, type: string): Promise<{[key: string]: string}> {
        return await this.graphApi.getNodeProperties(id, type);
    }
}
