import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CreateRegistrationComponent} from './create-registrarion/create-registration.component';
import {RegistrarionListComponent} from './registrarion-list/registrarion-list.component';
import {UserDetailComponent} from './user-detail/user-detail.component';
import {NgToastModule} from "ng-angular-popup";
import {NgConfirmModule} from "ng-confirm-box";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CreateRegistrationComponent,
    NgConfirmModule,
    NgToastModule,
    RegistrarionListComponent,
    UserDetailComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
