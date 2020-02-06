import { Routes } from '@angular/router';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';
import { CategoryCreateComponent } from './category-create/category-create.component';
import { IdResolver } from '../../shared/resolvers/id-resolver.resolver';

export const CategoryRoutingModule: Routes = [
    {
        path: '', component: CategoryListComponent
    },
    {
        path: 'create', component: CategoryCreateComponent
    },
    {
        path: ':id/edit', component: CategoryEditComponent,
        resolve: { category: IdResolver },
        data: {
            path: 'categories'
        }
    }
];
