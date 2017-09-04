import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';


import { LoginComponent } from './Components/login/login.component';


const APP_ROUTES: Routes = [
  { path: '', component: LoginComponent }
];

export const routing = RouterModule.forRoot(APP_ROUTES);