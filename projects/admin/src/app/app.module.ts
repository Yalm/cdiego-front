import { LOCALE_ID, NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEsAr from '@angular/common/locales/es-AR';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Ng2UiAuthModule } from 'ng2-ui-auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorIntl } from '@angular/material';
import { getDutchPaginatorIntl } from 'src/app/shared/class/MatPaginatorIntlCustom';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiInterceptor } from './interceptors/api.interceptor';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { AuthComponent } from './layouts/auth/auth.component';
import { environment } from '../environments/environment';
import { ResetComponent } from './views/auth/reset/reset.component';
import { EmailComponent } from './views/auth/email/email.component';
import { LoginComponent } from './views/auth/login/login.component';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import { FallbackSrcDirective } from './directives/fallback-src/fallback-src.directive';
import { SharedModule } from './modules/shared.module';
import { WelcomeComponent } from './views/welcome/welcome.component';
import { ProfileComponent } from './views/profile/profile.component';
// registrar los locales con el nombre que quieras utilizar a la hora de proveer
registerLocaleData(localeEsAr, 'es-PE');

@NgModule({
    declarations: [
        AppComponent,
        PageNotFoundComponent,
        WelcomeComponent,
        DashboardComponent,
        AuthComponent,
        LoginComponent,
        ResetComponent,
        EmailComponent,
        ProfileComponent,
        FallbackSrcDirective
    ],
    imports: [
        BrowserAnimationsModule,
        AppRoutingModule,
        SharedModule,
        Ng2UiAuthModule.forRoot({  loginUrl: environment.loginUrl})
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'es-PE' },
        {
            provide: MatPaginatorIntl,
            useValue: getDutchPaginatorIntl()
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ApiInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: LoaderInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
