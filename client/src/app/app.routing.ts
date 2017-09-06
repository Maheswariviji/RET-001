import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';

const appRoutes: Routes = [

    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'forgot', component: ForgotPasswordComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'reset/:id', component: ResetPasswordComponent }
];
@NgModule( {
    declarations: [],
    imports: [RouterModule.forRoot( appRoutes )],
    providers: [],
    bootstrap: [],
    exports: [RouterModule]
} )
export class AppRoutingModule { }
