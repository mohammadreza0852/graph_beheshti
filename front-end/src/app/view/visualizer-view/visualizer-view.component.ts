import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {G6BaseService} from './services/g6-base.service';

@Component({
    selector: 'app-visualizer-view',
    templateUrl: './visualizer-view.component.html',
    styleUrls: ['./visualizer-view.component.scss'],
})
export class VisualizerViewComponent implements AfterViewInit {
    @ViewChild('g6Container') public container!: ElementRef;

    public ngAfterViewInit(): void {
        this.g6BaseService.init(this.container.nativeElement);
    }

    public constructor(private g6BaseService: G6BaseService) {}
}
