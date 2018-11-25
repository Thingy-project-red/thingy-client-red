import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthData } from './auth-data.model';
import { UserData } from './auth-user-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: "root" })
export class AuthService {
    private isAuthenticated = false;
    private token: string;
    private authStatusListener = new Subject<boolean>();

    constructor(private http: HttpClient, private router: Router) { }

    createUser(user: string, password: string) {
        console.log("Trying to create user"); 
        const authData: UserData = {
            name: user, password: password, rights: ["api",
                "admin"]
        };
        this.http.post(
            `${environment.api}/api/v1/users`, authData)
            .subscribe(response => {
                console.log(response); 
                this.login(user, password); 
            })
    }

    login(username: string, password: string) {
        const authData: AuthData = { name: username, password: password };
        this.http.post(
            `${environment.api}/api/v1/auth`, authData, { responseType: 'text' })
            .subscribe(jwt => {
                console.log("Jwt: " + jwt); 
                this.token = jwt;
                if (jwt) {
                    this.isAuthenticated = true;
                    this.authStatusListener.next(true);
                    this.router.navigate(['/dashboard']);
                }
                console.log("Token" + this.token); 
            })
    }

    logout() {
        this.token = null;
        this.isAuthenticated = false;
        this.authStatusListener.next(false);
        this.router.navigate(['/login']);

    }

    getToken() {
        return this.token;
    }

    getIsAuth() {
        return this.isAuthenticated;
    }

    getAuthStatusListener() {
        return this.authStatusListener.asObservable();
    }


}