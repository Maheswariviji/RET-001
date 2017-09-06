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
import { LoginAuthService } from './services/login-auth.service';
import { ForgotPasswordService } from './services/forgot-password.service';
import { ResetpasswordService } from './services/reset-password.service';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/notAuth.guard';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';

@NgModule( {
    declarations: [
        AppComponent,
        RegisterComponent,
        LoginComponent,
        ForgotPasswordComponent,
        DashboardComponent,
        ResetPasswordComponent
    ],
    imports: [ BrowserAnimationsModule,
        BrowserModule,
        HttpModule,
        ReactiveFormsModule,
        AppRoutingModule,
        ToastModule.forRoot()
    ],
    providers: [LoginAuthService,ForgotPasswordService,AuthGuard, NotAuthGuard,ResetpasswordService],
    bootstrap: [AppComponent]
} )
export class AppModule { }
