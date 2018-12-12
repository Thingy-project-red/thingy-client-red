import { Subscription } from "rxjs";
import { OnInit, OnDestroy, Component } from "@angular/core";
import { UserService } from "./user.service";
import { MatSnackBar } from '@angular/material';
import { User } from "./user.model";
import { Router } from "@angular/router";

@Component({
    selector: 'app-users',
    templateUrl: './user.component.html'
})

export class UserComponent implements OnInit, OnDestroy {
    private users: User[];
    private usersSub: Subscription;
    isLoading = false;
    isAdmin = false;

    constructor(public userService: UserService, public snackBar: MatSnackBar, public router: Router) { }

    ngOnInit() {
        this.isLoading = true;
        this.userService.getUsers();
        this.usersSub = this.userService
            .getUserUpdateListener()
            .subscribe((users) => {
                this.users = users;
            });
        this.isLoading = false; 
    }

    ngOnDestroy() {
        this.usersSub.unsubscribe();
    }

    onDelete(username: string) {
        this.isLoading = true;
        this.userService.deleteUser(username).subscribe(() => {
            this.snackBar.open("User " + username + " deleted successfully", "done", { duration: 2000 });
            this.userService.getUsers();
        });
        this.isLoading = false;

    }

    onChange(user: User, right: string, value: boolean) {
        this.isLoading = true;
        this.userService.updateRights(user, right, value);
        this.userService.getUsers();
        this.router.navigate(['/users']);
        this.isLoading = false;
        this.snackBar.open("Rights updated successfully ", "done", { duration: 3000 });
    }

}