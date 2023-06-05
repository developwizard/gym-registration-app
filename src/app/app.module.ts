import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CreateRegistrationComponent} from './create-registrarion/create-registration.component';
import {RegistrarionListComponent} from './registrarion-list/registrarion-list.component';
import {UserDetailComponent} from './user-detail/user-detail.component';
import {NgToastModule} from "ng-angular-popup";
import {NgConfirmModule} from "ng-confirm-box";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {RouterModule} from "@angular/router";
import {AppRoutingModule} from "./app.routing.module";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    CreateRegistrationComponent,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    NgConfirmModule,
    NgToastModule,
    RegistrarionListComponent,
    UserDetailComponent,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
