import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GraphDto} from './models/graph-dto';
import {Config} from './config';

@Injectable()
export class GraphApiService {
    public baseUrl = Config.baseServiceUrl;

    public constructor(private http: HttpClient) {}

    public async getGraph(datasetId?: number): Promise<GraphDto[]> {
        let url = `${this.baseUrl}/api/graph/`;
        if (datasetId){
            url += `?dataset_id=${datasetId}`;
        }

        const result = (await this.http.get(url).toPromise()) as any;

        return result.map((x: any) => new GraphDto(x));
    }

    public async getNodeProperties(id: number, type: string): Promise<{[key: string]: string}> {
        const result = (await this.http.get(`${this.baseUrl}/api/node/?type=${type}&id=${id}`).toPromise()) as any;

        return result;
    }
}
