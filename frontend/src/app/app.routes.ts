import { Routes } from '@angular/router';
import { ServiceFormComponent } from './service-form/service-form.component';
import { DogFormComponent } from './dog-form/dog-form.component';
import { VisitFormComponent } from './visit-form/visit-form.component';

export const routes: Routes = [
    { path: 'add-service', component: ServiceFormComponent },
    { path: 'add-dog', component: DogFormComponent },
    { path: 'add-visit', component: VisitFormComponent }
];
