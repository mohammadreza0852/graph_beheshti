import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Config} from '../../../../../../api/config';
import {CustomFilterDto} from '../models/custom-filter-dto';

@Injectable({
    providedIn: 'root',
})
export class CustomFilterService {
    public baseUrl = Config.baseServiceUrl;

    public constructor(private http: HttpClient) {}

    public async getCustomFilters(): Promise<CustomFilterDto[]> {
        let url = `${this.baseUrl}/api/filters/`;

        const result = (await this.http.get(url).toPromise()) as any;

        return result.map((x: any) => new CustomFilterDto(x));
    }
}
