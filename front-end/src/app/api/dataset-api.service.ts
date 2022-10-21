import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DatasetDto} from './models/dataset-dto';
import {Config} from './config';

@Injectable()
export class DatasetApiService {
    public baseUrl = Config.baseServiceUrl;

    public constructor(private http: HttpClient) {}

    public async getDatasets(): Promise<DatasetDto[]> {
        const result = (await this.http.get(`${this.baseUrl}/api/dataset`).toPromise()) as any;
        
        return result.map((x: any) => new DatasetDto(x));
    }
}
