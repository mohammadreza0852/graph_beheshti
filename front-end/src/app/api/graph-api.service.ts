import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GraphDto} from './models/graph-dto';

@Injectable()
export class GraphApiService {
    public baseUrl = 'http://127.0.0.1:8000';

    public constructor(private http: HttpClient) {}

    public async getGraph(): Promise<GraphDto[]> {
        const result = (await this.http.get(`${this.baseUrl}/api/graph/`).toPromise()) as any;

        return result.map((x: any) => new GraphDto(x));
    }

    public async getNodeProperties(id: number, type: string): Promise<{[key: string]: string}> {
        const result = (await this.http.get(`${this.baseUrl}/api/node/?type=${type}&id=${id}`).toPromise()) as any;

        return result;
    }
}
