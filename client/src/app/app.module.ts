import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AuthService } from './Services/regAuth.service';
import {ToastModule} from 'ng2-toastr/ng2-toastr';

@NgModule( {
    declarations: [
        AppComponent,
        RegisterComponent,
        LoginComponent,
        ForgotPasswordComponent,
        DashboardComponent
    ],
    imports: [
        BrowserModule,
        HttpModule,
        ReactiveFormsModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ToastModule.forRoot()
    ],
    providers: [AuthService],
    bootstrap: [AppComponent]
} )
export class AppModule { }
