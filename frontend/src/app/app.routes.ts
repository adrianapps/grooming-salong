import { Routes } from '@angular/router';
import { DogFormComponent } from './dog-form/dog-form.component';
import { VisitFormComponent } from './visit-form/visit-form.component';
import { HomeComponent } from './home/home.component';
import {ServiceTableComponent} from './service-table/service-table.component';
import {DogsVisitsTableComponent} from './dogs-visits-table/dogs-visits-table.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'services', component: ServiceTableComponent },
    { path: 'add-dog', component: DogFormComponent },
    { path: 'add-visit', component: VisitFormComponent },
    { path: 'dogs-visits/:id', component: DogsVisitsTableComponent }
];
