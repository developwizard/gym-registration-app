import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {CreateRegistrationComponent} from "./create-registrarion/create-registration.component";
import {RegistrationListComponent} from "./registrarion-list/registration-list.component";

const routes: Routes = [
  {path: '', redirectTo: 'register', pathMatch: 'full'},
  {path: 'register', component: CreateRegistrationComponent},
  {path: 'list', component: RegistrationListComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
