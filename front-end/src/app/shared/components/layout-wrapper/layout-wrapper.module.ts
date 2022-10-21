import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';
import {NzBreadCrumbModule} from 'ng-zorro-antd/breadcrumb';
import {LayoutWrapperComponent} from './layout-wrapper.component';

@NgModule({
    declarations: [LayoutWrapperComponent],
    exports: [LayoutWrapperComponent],
    imports: [CommonModule, NzLayoutModule, NzBreadCrumbModule, NzDropDownModule],
})
export class LayoutWrapperModule {}
