import { RouterModule, Routes } from '@angular/router';
import{NgModule} from  '@angular/core';
import{LoginComponent} from './components/login/login.component';
import{RegisterComponent} from './components/register/register.component';
import{ForgotPasswordComponent} from './components/forgot-password/forgot-password.component';
const appRoutes: Routes = [
                          
                           { path: 'login', component: LoginComponent },
                           { path: 'register', component: RegisterComponent },
                           { path: 'forgot', component: ForgotPasswordComponent },
                                     ];
@NgModule({
    declarations: [],
    imports: [RouterModule.forRoot(appRoutes)],
    providers: [],
    bootstrap: [],
    exports:[RouterModule]
  })
  export class AppRoutingModule { }
