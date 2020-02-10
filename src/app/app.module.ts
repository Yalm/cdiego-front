import { BrowserModule } from "@angular/platform-browser";
import { LOCALE_ID, NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Ng2UiAuthModule } from "ng2-ui-auth";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { ApiInterceptor } from "./interceptors/api.interceptor";
import { MatPaginatorIntl } from "@angular/material";
import { getDutchPaginatorIntl } from "./shared/class/MatPaginatorIntlCustom";
import { LoaderComponent } from "./components/loader/loader.component";
// importar locales
import localeEsPe from "@angular/common/locales/es-PE";
import { registerLocaleData } from "@angular/common";
import { HomeComponent } from "./views/home/home.component";
import { PageNotFoundComponent } from "./views/page-not-found/page-not-found.component";
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SharedModule } from './modules/shared.module';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { AboutComponent } from './views/about/about.component';
import { ContactComponent } from './views/contact/contact.component';
import { ShopComponent } from './views/shop/shop.component';
import { CartComponent } from './views/cart/cart.component';
import { QtyComponent } from './components/qty/qty.component';
import { ShowProductComponent } from './views/show-product/show-product.component';
import { CheckoutComponent } from './views/checkout/checkout.component';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { TermsComponent } from './views/terms/terms.component';
import { environment } from 'src/environments/environment';
// registrar los locales con el nombre que quieras utilizar a la hora de proveer
registerLocaleData(localeEsPe, "es-PE");

@NgModule({
    declarations: [
        AppComponent,
        LoaderComponent,
        HeaderComponent,
        FooterComponent,
        BreadcrumbComponent,
        HomeComponent,
        PageNotFoundComponent,
        AboutComponent,
        ContactComponent,
        ShopComponent,
        CartComponent,
        QtyComponent,
        ShowProductComponent,
        CheckoutComponent,
        TermsComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        SharedModule,
        Ng2UiAuthModule.forRoot({ providers: environment.providers }),
        MatCarouselModule.forRoot()
    ],
    providers: [
        { provide: LOCALE_ID, useValue: "es-PE" },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ApiInterceptor,
            multi: true
        },
        {
            provide: MatPaginatorIntl,
            useValue: getDutchPaginatorIntl()
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
