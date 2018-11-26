import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UserData } from '../auth/auth-user-data.model';
import { Subject } from 'rxjs';

@Injectable({ providedIn: "root" })
export class UserService {
    private users: UserData[]; 
    private usersUpdated = new Subject<UserData[]>();

    constructor(private http: HttpClient) { }

    getUsers(){
        this.http.get<UserData[]>(
            `${environment.api}/api/v1/users`)
            .subscribe(users => {
                this.users = users; 
                this.usersUpdated.next(this.users);
            }); 
    }

    getUserUpdateListener() {
        return this.usersUpdated.asObservable(); 
    }

    deleteUser(username: string){
        return this.http.delete(
            `${environment.api}/api/v1/users/${username}`); 
    }
}