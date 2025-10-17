import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { CookieService } from 'ngx-cookie-service';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { AuthInterceptor } from './app/Utils/inteceptor/auth-interceptor';
import { LoaderInterceptor } from './app/Utils/inteceptor/loader.interceptor';
import { StatusInterceptor } from './app/Utils/inteceptor/status-interceptor';




bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    CookieService,
    ...(appConfig.providers ?? []),
    provideHttpClient(withInterceptors([StatusInterceptor, LoaderInterceptor, AuthInterceptor])),
    provideRouter(routes),
    importProvidersFrom(MatNativeDateModule),
    provideAnimations()
  ]
});