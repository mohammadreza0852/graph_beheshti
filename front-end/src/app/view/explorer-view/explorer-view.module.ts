import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExplorerViewComponent} from './explorer-view.component';
import {DatasetApiService} from '../../api/dataset-api.service';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import {NzTableModule} from 'ng-zorro-antd/table';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
/** config angular i18n **/
import {registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';
registerLocaleData(en);
/** config ng-zorro-antd i18n **/
import {NZ_I18N, en_US} from 'ng-zorro-antd/i18n';

@NgModule({
    declarations: [ExplorerViewComponent],
    imports: [CommonModule, NzCardModule, NzTableModule, NzDividerModule, HttpClientModule, BrowserAnimationsModule],
    providers: [DatasetApiService, {provide: NZ_I18N, useValue: en_US}],
})
export class ExplorerViewModule {}
