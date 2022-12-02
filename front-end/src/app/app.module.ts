import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CommonModule} from '@angular/common';
import {LayoutWrapperModule} from './shared/components/layout-wrapper/layout-wrapper.module';
import {VisualizerViewModule} from './view/visualizer-view/visualizer-view.module';
import {ExplorerViewModule} from './view/explorer-view/explorer-view.module';
import {NzIconTestModule} from "./ng-icon.module";

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        CommonModule,
        LayoutWrapperModule,
        VisualizerViewModule,
        ExplorerViewModule,
        NzIconTestModule
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
