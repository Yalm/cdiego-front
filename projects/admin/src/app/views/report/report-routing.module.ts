import { Routes } from '@angular/router';
import { TopCustomerComponent } from './top-customer/top-customer.component';
import { TopProductComponent } from './top-product/top-product.component';
import { PurchasesComponent } from './purchases/purchases.component';

export const ReportRoutingModule: Routes = [
    {
        path: 'customers', component: TopCustomerComponent
    },
    {
        path: 'products', component: TopProductComponent
    },
    {
        path: 'purchases', component: PurchasesComponent
    }
];
