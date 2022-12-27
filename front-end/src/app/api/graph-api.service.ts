import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GraphDto} from './models/graph-dto';
import {Config} from './config';

@Injectable()
export class GraphApiService {
    public baseUrl = Config.baseServiceUrl;

    public constructor(private http: HttpClient) {}

    public async getGraph(datasetId?: number, customFilterId?: number, nodeFilterId?: number): Promise<GraphDto[]> {
        let url = this.getUrl(datasetId, customFilterId, nodeFilterId);

        const result = (await this.http.get(url).toPromise()) as any;

        return result.map((x: any) => new GraphDto(x));
    }

    private getUrl(datasetId?: number, customFilterId?: number, nodeFilterId?: number) {
        let url = `${this.baseUrl}/api/graph/`;
        const params: string[] = [];

        if (datasetId) {
            params.push(`dataset_id=${datasetId}`);
        }

        if (customFilterId) {
            params.push(`filter_id=${customFilterId}`)
        }

        if (nodeFilterId) {
            params.push(`node_filter_id=${nodeFilterId}`)
        }

        url += '?' + params.join('&');
        return url;
    }

    public async getNodeProperties(id: number, type: string): Promise<{[key: string]: string}> {
        const result = (await this.http.get(`${this.baseUrl}/api/node/?type=${type}&id=${id}`).toPromise()) as any;

        return result;
    }
}
