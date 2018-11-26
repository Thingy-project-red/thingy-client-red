import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthData } from './auth-data.model';
import { UserData } from './auth-user-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({ providedIn: "root" })
export class AuthService {
    private isAuthenticated = false;
    private token: string;
    private authStatusListener = new Subject<boolean>();
    private tokenTimer: any;

    constructor(private http: HttpClient, private router: Router) { }

    createUser(user: string, password: string) {
        const authData: UserData = {
            name: user, password: password, rights: ["admin", "api"]
        };
        this.http.post(
            `${environment.api}/api/v1/users`, authData)
            .subscribe(response => {
                console.log("User created successfully");
                this.router.navigate(['/dashboard']);
                /*
                if (response) {
                    this.login(user, password);
                }*/
        })
    }

    login(username: string, password: string) {
        const authData: AuthData = { name: username, password: password };
        this.http.post(
            `${environment.api}/api/v1/auth`,
            authData,
            { responseType: 'text' }
        )
            .subscribe(jwt => {
                this.token = jwt;
                if (jwt) {
                    const helper = new JwtHelperService();
                    // Get expiration timestamp in ms
                    const expDate: number = helper
                        .getTokenExpirationDate(jwt)
                        .getTime();
                    // Calculate time to expiration in ms
                    const expiresInDuration: number = expDate - Date.now();
                    this.tokenTimer = setTimeout(() => {
                        this.logout();
                    }, expiresInDuration); // timeout in ms
                    this.isAuthenticated = true;
                    this.authStatusListener.next(true);
                    this.router.navigate(['/dashboard']);
                }
            })
    }

    logout() {
        this.token = null;
        this.isAuthenticated = false;
        this.authStatusListener.next(false);
        clearTimeout(this.tokenTimer);
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
