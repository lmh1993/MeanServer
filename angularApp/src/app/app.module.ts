import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localeAu from '@angular/common/locales/en-AU';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { EventsComponent } from './events/events.component';
import { SpecialEventsComponent } from './special-events/special-events.component';
import { AuthService } from './auth.service';
import { EventService } from './event.service';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService} from './token-interceptor.service';


registerLocaleData(localeAu, 'en-AU');

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    EventsComponent,
    SpecialEventsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [{provide: LOCALE_ID, useValue: 'en-AU'}, 
              {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true}, 
              AuthService, 
              EventService, 
              AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
