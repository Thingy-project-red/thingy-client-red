import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from './user.model';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map'
import { Router } from '@angular/router';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';

@Injectable({ providedIn: "root" })
export class UserService {
    private users: User[];
    private usersUpdated = new Subject<User[]>();

    constructor(private http: HttpClient, private router: Router) {}

    getUsers() {
        return this.http.get<any>(
            `${environment.api}/api/v1/users`)
            .subscribe(users => {
                this.users = users;
                this.usersUpdated.next(this.users);
                this.router.navigate(['/users']);
            });
    }

    getUserUpdateListener() {
        return this.usersUpdated.asObservable();
    }

    deleteUser(username: string) {
        return this.http.delete(
            `${environment.api}/api/v1/users/${username}`)
    }

    updateRights(user: User, right: string, value: boolean) {
        let userRights = user.rights;
        let rights: string[] = this.getChangedRights(right, value, userRights);

        console.log(rights);

        return this.http.patch(
            `${environment.api}/api/v1/users/rights/${user.name}`, { rights: rights })
            .subscribe((response => {
                this.getUsers();
            }));
    }


    private getChangedRights(right: string, value: boolean, userRights: string[]) {
        let rights: string[] = [];
        if (right == "admin") {
            if (value) {
                rights.push("admin");
            }
            if (userRights.includes("api")) {
                rights.push("api");
            }
        }
        else if (right == "api") {
            if (value) {
                rights.push("api");
            }
            if (userRights.includes("admin")) {
                rights.push("admin");
            }
        }
        return rights;
    }
}