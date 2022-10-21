import {Component, OnInit} from '@angular/core';
import {DatasetApiService} from '../../api/dataset-api.service';
import {Dataset} from './dataset';
import {Router} from '@angular/router';

@Component({
    selector: 'app-explorer-view',
    templateUrl: './explorer-view.component.html',
    styleUrls: ['./explorer-view.component.scss'],
})
export class ExplorerViewComponent implements OnInit {
    public dataset!: Dataset[];

    public constructor(
        private router: Router,
        private datasetApiService: DatasetApiService
    ) {}

    public async ngOnInit(): Promise<void> {
        const datasetsDto = await this.datasetApiService.getDatasets();
        this.dataset = datasetsDto.map((x) => new Dataset(x));
    }

    public async visualize(id: number): Promise<void> {
        const url = await this.router.serializeUrl(
            this.router.createUrlTree(['../visualizer-view/graph'], {
                queryParams: {
                    datasetId: id,
                },
            })
        );

        window.open(url, '_blank');
    }
}
