import { Component, OnInit, OnDestroy, Inject } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";
import { UserService } from "../users/user.service";
import { ErrorService } from "../errors/error.service";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

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

  constructor(private authService: AuthService, private userService: UserService, private errorService: ErrorService, public dialog: MatDialog) {}

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

  openDialog(error): void {
    const dialogRef = this.dialog.open(ErrorDialog, {
      width: '400px',
      data: {error: error}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.errorService.removeError(result);
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

@Component({
  selector: 'error-dialog',
  template: `<h1 mat-dialog-title>Error</h1>
  <div mat-dialog-content>
    <p>{{data.error}}</p>
  </div>
  <div mat-dialog-actions>
    <button mat-raised-button color="primary" (click)="onNoClick()">Cancel</button>
    <button mat-raised-button color="primary" [mat-dialog-close]="data.error" cdkFocusInitial>Dismiss Error</button>
  </div>`,
})
export class ErrorDialog {

  constructor(
    public dialogRef: MatDialogRef<ErrorDialog>,
    @Inject(MAT_DIALOG_DATA) public data) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}