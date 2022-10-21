import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {VisualizerViewComponent} from './view/visualizer-view/visualizer-view.component';
import {ExplorerViewComponent} from './view/explorer-view/explorer-view.component';

const routes: Routes = [
    {
        path: 'visualizer-view',
        children: [
            {
                path: 'graph',
                component: VisualizerViewComponent,
            },
            {
                path: '**',
                pathMatch: 'full',
                redirectTo: 'graph',
            },
        ],
    },
    {
        path: 'data',
        children: [
            {
                path: 'explorer',
                component: ExplorerViewComponent,
            },
            {
                path: '**',
                pathMatch: 'full',
                redirectTo: 'explorer',
            },
        ],
    },
    {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'data/explorer',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
