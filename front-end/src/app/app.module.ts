import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CommonModule} from '@angular/common';
import {LayoutWrapperModule} from './shared/components/layout-wrapper/layout-wrapper.module';
import {ExplorerViewComponent} from './view/explorer-view/explorer-view.component';
import {VisualizerViewModule} from './view/visualizer-view/visualizer-view.module';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzTableModule} from 'ng-zorro-antd/table';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
    declarations: [AppComponent, ExplorerViewComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        CommonModule,
        LayoutWrapperModule,
        VisualizerViewModule,
        NzCardModule,
        NzTableModule,
        NzDividerModule,
        HttpClientModule,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
