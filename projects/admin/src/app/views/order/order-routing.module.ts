import { Routes } from '@angular/router';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderEditComponent } from './order-edit/order-edit.component';
import { IdResolver } from '../../shared/resolvers/id-resolver.resolver';

export const OrderRoutingModule: Routes = [
    {
        path: '', component: OrderListComponent,
    },
    {
        path: ':id/edit', component: OrderEditComponent,
        resolve: { order: IdResolver },
        data: {
            path: 'orders',
            relations: ['state','customer' ,'shipping', 'payment', 'payment.paymentType', 'products', 'products.product']
        }
    }
];
