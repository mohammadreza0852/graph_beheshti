import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VisualizerViewComponent} from './visualizer-view.component';
import {G6BaseService} from './services/g6-base.service';
import {G6ConfigService} from './services/g6-config.service';
import {G6UtilitiesService} from './services/g6-utilities.service';
import {PropertiesViewComponent} from './properties-view/properties-view.component';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzListModule} from 'ng-zorro-antd/list';
import {NzAvatarModule} from 'ng-zorro-antd/avatar';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import {GraphApiService} from '../../api/graph-api.service';
import {VisualizerService} from './services/visualizer.service';
import {ImagesRepositoryService} from './services/images-repository.service';
import {NodeImageApiService} from '../../api/node-image-api.service';

@NgModule({
    declarations: [VisualizerViewComponent, PropertiesViewComponent],
    providers: [G6BaseService, G6ConfigService, G6UtilitiesService, GraphApiService, VisualizerService, ImagesRepositoryService, NodeImageApiService],
    imports: [CommonModule, NzCardModule, NzListModule, NzAvatarModule, NzDividerModule],
})
export class VisualizerViewModule {}
