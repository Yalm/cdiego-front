import { Routes } from '@angular/router';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { IdResolver } from '../../shared/resolvers/id-resolver.resolver';

export const CustomerRoutingModule: Routes = [
    {
        path: '', component: CustomerListComponent
    },
    {
        path: ':id/edit', component: CustomerEditComponent,
        resolve: { customer: IdResolver },
        data: { path: 'customers', relations: ['document'] }
    }
];
