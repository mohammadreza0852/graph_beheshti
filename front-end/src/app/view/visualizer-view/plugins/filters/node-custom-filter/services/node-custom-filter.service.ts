import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Config} from '../../../../../../api/config';
import {NodeCustomFilterDto} from '../models/node-custom-filter-dto';

@Injectable({
    providedIn: 'root',
})
export class NodeCustomFilterService {
    public baseUrl = Config.baseServiceUrl;

    public constructor(private http: HttpClient) {}

    public async getNodeCustomFilters(): Promise<NodeCustomFilterDto[]> {
        let url = `${this.baseUrl}/api/node_filters/`;

        const result = (await this.http.get(url).toPromise()) as any;

        return result.map((x: any) => new NodeCustomFilterDto(x));
    }
}
