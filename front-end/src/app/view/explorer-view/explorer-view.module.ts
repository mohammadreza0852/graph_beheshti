import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ExplorerViewComponent} from './explorer-view.component';
import {DatasetApiService} from '../../api/dataset-api.service';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import {NzTableModule} from 'ng-zorro-antd/table';
import {HttpClientModule} from '@angular/common/http';



@NgModule({
  declarations: [ExplorerViewComponent],
  imports: [
    CommonModule,
    NzCardModule,
    NzTableModule,
    NzDividerModule,
    HttpClientModule,
  ],
  providers: [DatasetApiService]
})
export class ExplorerViewModule { }
