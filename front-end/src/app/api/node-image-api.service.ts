import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Config} from './config';

@Injectable()
export class NodeImageApiService {
    public baseUrl = Config.baseServiceUrl;

    public constructor(private http: HttpClient) {}

    public async getImageByType(type: string): Promise<string> {
        const result = (await this.http.get(`${this.baseUrl}/api/node_image/?type=${type}`).toPromise()) as any;
        
        return result.image;
    }
}