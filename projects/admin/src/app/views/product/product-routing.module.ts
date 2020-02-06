import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { IdResolver } from '../../shared/resolvers/id-resolver.resolver';

export const ProductRoutingModule: Routes = [
    {
        path: '', component: ProductListComponent
    },
    {
        path: 'create', component: ProductCreateComponent
    },
    {
        path: ':id/edit', component: ProductEditComponent,
        data: {
            path: 'products',
            relations: ['category']
        },
        resolve: { product: IdResolver }
    }
];
