import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/components/login/login.component';
import { SignupComponent } from './auth/components/signup/signup.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { authReducer } from './store/auth/auth.reducer';
import { AuthEffects } from './store/auth/auth.effects';
import { AuthInterceptorService } from './interceptor/auth-interceptor.service';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { NgxUiLoaderConfig, NgxUiLoaderModule, SPINNER } from 'ngx-ui-loader';

import { HomeModule } from './pages/home/home/home.module';
import { UserComponent } from './layout/user/user.component';
import { AdminComponent } from './layout/admin/admin.component';

import { UsernavComponent } from './layout/usernav/usernav.component';
import { MaterialModule } from './material/material.module';
import { GoogleMapsModule } from '@angular/google-maps';
import { AdminSidebarComponent } from './shared/components/admin-sidebar/admin-sidebar.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { AdminSignupComponent } from './auth/components/admin-signup/admin-signup.component';
import { AdminLoginComponent } from './auth/components/admin-login/admin-login.component';



const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  // Set the loader's appearance
  fgsType: SPINNER.rectangleBounce,
  // Delay in milliseconds before showing the loader
  delay: 2000 // 2 seconds delay
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    SidebarComponent,
    UserComponent,
    AdminComponent,
    UsernavComponent,
    AdminSidebarComponent,
    AdminDashboardComponent,
    AdminSignupComponent,
    AdminLoginComponent,
   
  

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    StoreModule.forRoot({auth:authReducer}),
    EffectsModule.forRoot([AuthEffects]),
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    HomeModule,
    MaterialModule,
    GoogleMapsModule
    
  ],
  exports:[
    SidebarComponent
  ],
  providers: [
    provideAnimationsAsync(),
     {provide:  HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
