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
import {PluginsTreeViewComponent} from './plugins/plugins-tree-view/plugins-tree-view.component';
import {NzTreeViewModule} from 'ng-zorro-antd/tree-view';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {PluginsService} from './plugins/plugins-tree-view/services/plugins.service';
import {CircularLayoutComponent} from './plugins/layouts/circular-layout/circular-layout.component';
import {GridLayoutComponent} from './plugins/layouts/grid-layout/grid-layout.component';
import {RandomLayoutComponent} from './plugins/layouts/random-layout/random-layout.component';
import {DegreeFilterComponent} from './plugins/filters/degree-filter/degree-filter.component';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {ResetGraphComponent} from './plugins/reset-graph/reset-graph.component';
import {NzInputNumberModule} from 'ng-zorro-antd/input-number';
import {FormsModule} from '@angular/forms';
import {NodeDegreeComponent} from './plugins/ranking/node-degree/node-degree.component';
import {CustomFiltersComponent} from './plugins/filters/custom-filters/custom-filters.component';
import {NodeCustomFilterComponent} from './plugins/filters/node-custom-filter/node-custom-filter.component';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {ExpandSelectedNodesComponent} from './plugins/expand/expand-selected-nodes/expand-selected-nodes.component';
import {NzMessageModule} from 'ng-zorro-antd/message';
import {PropertiesComponent} from './plugins/filters/properties/properties.component';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NodeRecommendationComponent} from './plugins/node-recomandation/node-recommendation.component';
import {NzRadioModule} from 'ng-zorro-antd/radio';

@NgModule({
    declarations: [
        VisualizerViewComponent,
        PropertiesViewComponent,
        PluginsTreeViewComponent,
        CircularLayoutComponent,
        GridLayoutComponent,
        RandomLayoutComponent,
        DegreeFilterComponent,
        ResetGraphComponent,
        NodeDegreeComponent,
        CustomFiltersComponent,
        NodeCustomFilterComponent,
        ExpandSelectedNodesComponent,
        PropertiesComponent,
        NodeRecommendationComponent,
    ],
    providers: [
        G6BaseService,
        G6ConfigService,
        G6UtilitiesService,
        GraphApiService,
        VisualizerService,
        ImagesRepositoryService,
        NodeImageApiService,
        PluginsService,
    ],
    imports: [
        CommonModule,
        NzCardModule,
        NzListModule,
        NzAvatarModule,
        NzDividerModule,
        NzTreeViewModule,
        NzIconModule,
        NzModalModule,
        NzInputNumberModule,
        FormsModule,
        NzSelectModule,
        NzMessageModule,
        NzInputModule,
        NzRadioModule,
    ],
})
export class VisualizerViewModule {}
