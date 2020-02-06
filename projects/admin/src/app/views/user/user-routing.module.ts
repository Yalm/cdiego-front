import { Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { IdResolver } from '../../shared/resolvers/id-resolver.resolver';

export const UserRoutingModule: Routes = [
    {
        path: '', component: UserListComponent
    },
    {
        path: 'create', component: UserCreateComponent
    },
    {
        path: ':id/edit', component: UserEditComponent,
        resolve: { user: IdResolver },
        data: { path: 'users' }
    }
];
