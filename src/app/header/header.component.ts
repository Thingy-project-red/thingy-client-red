import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";
import { UserService } from "../users/user.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit, OnDestroy {
  private authListenerSubs: Subscription;
  private adminListenerSubs: Subscription;
  private usernameSubs: Subscription;
  userIsAuthenticated = false;
  username: string;
  isAdmin: boolean;

  constructor(private authService: AuthService, private userService: UserService) {}

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });

    this.username = this.authService.getUsername(); 
    this.usernameSubs = this.authService.getUsernameListener()
      .subscribe(username => {
        this.username = username;
        if(username != null){
          this.authService.isUserAdmin(username);
        }
      }); 

    this.isAdmin = this.authService.getAdminStatus(); 
    this.adminListenerSubs = this.authService
      .getAdminStatusListener()
      .subscribe(admin => {
        this.isAdmin = admin;
      }); 
  }

  onLogout() {
    this.authService.logout();
    this.username = null;
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
    this.adminListenerSubs.unsubscribe(); 
    this.usernameSubs.unsubscribe(); 
  }
}
