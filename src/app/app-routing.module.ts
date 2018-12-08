import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./auth/login/login.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { GraphOverviewComponent } from "./graphs/graph-overview/graph-overview.component";
import { AuthGuard } from "./auth/auth.guard";
import { UserComponent } from "./users/user.component"; 
import { PreferenceComponent } from "./preferences/preferences.component"; 

const routes: Routes = [
  { path: "", component: DashboardComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent },
  { path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard] },
  { path: "graphs", component: GraphOverviewComponent, canActivate: [AuthGuard] },
  { path: "users" , component: UserComponent, canActivate: [AuthGuard]}, 
  { path: "preferences" , component: PreferenceComponent, canActivate: [AuthGuard]},
  { path: "**", component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
