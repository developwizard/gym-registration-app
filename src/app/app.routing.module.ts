import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {CreateRegistrationComponent} from "./create-registrarion/create-registration.component";
import {RegistrarionListComponent} from "./registrarion-list/registrarion-list.component";

const routes: Routes = [
  {path: '', redirectTo: 'register', pathMatch: 'full'},
  {path: 'register', component: CreateRegistrationComponent},
  {path: 'list', component: RegistrarionListComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
