import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {routing} from './app.routing';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
