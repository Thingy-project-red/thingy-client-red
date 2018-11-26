import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./auth/login/login.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { GraphOverviewComponent } from "./graphs/graph-overview/graph-overview.component";
import { AuthGuard } from "./auth/auth.guard";
import { UserComponent } from "./users/user.component"; 

const routes: Routes = [
  { path: "", component: DashboardComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent, canActivate: [AuthGuard] },
  { path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard] },
  { path: "graphs", component: GraphOverviewComponent, canActivate: [AuthGuard] },
  { path: "users" , component: UserComponent, canActivate: [AuthGuard]}, 
  { path: "**", component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
