import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {Module} from '../../models/module';

@Component({
    selector: 'app-layout-wrapper',
    templateUrl: './layout-wrapper.component.html',
    styleUrls: ['./layout-wrapper.component.scss'],
})
export class LayoutWrapperComponent implements OnInit{
    public selectedModule?: Module;

    public modules: Module[] = [
        {
            id: 'data',
            name: 'Explorer',
        },
        {
            id: 'visualizer-view',
            name: 'Visualizer',
        },
    ];

    public constructor(private route: Router) {}

    public ngOnInit(): void {
        this.route.events.subscribe(changes => {
            if (!(changes instanceof NavigationEnd)) return;
            const parts = changes.urlAfterRedirects.substring(1).split('/');

            if (parts.length < 2) return;

            this.selectedModule = this.modules.find(x => x.id === parts[0]);
        });
    }


    public async moduleClicked(module: Module): Promise<void> {
        if (this.selectedModule?.id === module.id) return;

        await this.route.navigate([module.id]);
    }
}
