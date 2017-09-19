import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/notAuth.guard';
const appRoutes: Routes = [

    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'forgot', component: ForgotPasswordComponent, },
    { path: 'dashboard', component: DashboardComponent,canActivate :[AuthGuard] },
    { path: 'reset/:id', component: ResetPasswordComponent },
    { path: 'dashboard/:token/:user', component: DashboardComponent }
];
@NgModule( {
    declarations: [],
    imports: [RouterModule.forRoot( appRoutes )],
    providers: [],
    bootstrap: [],
    exports: [RouterModule]
} )
export class AppRoutingModule { }
