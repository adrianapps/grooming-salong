import { Routes } from '@angular/router';
import { ServiceFormComponent } from './service-form/service-form.component';
import { DogFormComponent } from './dog-form/dog-form.component';
import { VisitFormComponent } from './visit-form/visit-form.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'add-service', component: ServiceFormComponent },
    { path: 'add-dog', component: DogFormComponent },
    { path: 'add-visit', component: VisitFormComponent }
];
