import { Subscription } from "rxjs";
import { UserData } from "../auth/auth-user-data.model";
import { OnInit, OnDestroy, Component } from "@angular/core";
import { UserService } from "./user.service";

@Component({
    selector: 'app-users', 
    templateUrl: './user.component.html'
})

export class UserComponent implements OnInit, OnDestroy {
    private users: UserData[]; 
    private usersSub: Subscription; 
    isLoading = false; 

    constructor(public userService: UserService){}

    ngOnInit() {
        this.userService.getUsers(); 
        this.usersSub = this.userService
        .getUserUpdateListener()
        .subscribe((users) => {
            this.users = users; 
        }); 
    }

    ngOnDestroy() {
        this.usersSub.unsubscribe(); 
            
    }

    onDelete(username: string) {
        this.isLoading = true; 
        this.userService.deleteUser(username).subscribe(() => {
          this.userService.getUsers();
        });
      }
}