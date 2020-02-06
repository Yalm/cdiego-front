import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./views/home/home.component";
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import { AboutComponent } from './views/about/about.component';
import { ContactComponent } from './views/contact/contact.component';
import { ShopComponent } from './views/shop/shop.component';
import { CartComponent } from './views/cart/cart.component';
import { ShowProductComponent } from './views/show-product/show-product.component';
import { CartGuard } from './guards/cart/cart.guard';
import { CompleteInfoGuard } from './views/auth/guards/complete-info/complete-info.guard';
import { AuthGuard } from './views/auth/guards/auth/auth.guard';
import { CheckoutComponent } from './views/checkout/checkout.component';

const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "about", component: AboutComponent },
    { path: "contact", component: ContactComponent },
    { path: "shop", component: ShopComponent },
    { path: "cart", component: CartComponent },
    { path: 'p/:url', component: ShowProductComponent },
    { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard, CartGuard, CompleteInfoGuard] },
    {
        path: '', canActivate: [AuthGuard],
        loadChildren: () => import('./views/profile/profile.module').then(m => m.ProfileModule)
    },
    {
        path: '', loadChildren: () => import('./views/auth/auth.module').then(m => m.AuthModule)
    },
    { path: '404', component: PageNotFoundComponent },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
