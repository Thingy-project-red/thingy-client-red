import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthData } from './auth-data.model';
import { UserData } from './auth-user-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from '../users/user.service';

@Injectable({ providedIn: "root" })
export class AuthService {
    private isAuthenticated = false;
    private token: string;
    private authStatusListener = new Subject<boolean>();
    private tokenTimer: any;

    constructor(private http: HttpClient, private router: Router, public userService: UserService) { }

    createUser(user: string, password: string) {
        const authData: UserData = {
            name: user, password: password, rights: ["admin", "api"]
        };
        this.http.post(
            `${environment.api}/api/v1/users`, authData)
            .subscribe(response => {
                console.log("User created successfully");
                this.userService.getUsers(); 
            })
    }

    login(username: string, password: string) {
        const authData: AuthData = { name: username, password: password };
        this.http.post(
            `${environment.api}/api/v1/auth`, authData, { responseType: 'text' })
            .subscribe(response => {
                const token = response;
                this.token = token;
                if (token) {
                    const helper = new JwtHelperService();
                    const expiresInDuration: number = helper
                        .getTokenExpirationDate(token)
                        .getTime();
                    this.setAuthenticationTimer(expiresInDuration);
                    this.isAuthenticated = true;
                    this.authStatusListener.next(true);
                    const now = new Date();
                    const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
                    this.cacheAuthToken(token, expirationDate);
                    this.router.navigate(['/dashboard']);
                }
            })
    }

    autoAuth() {
        const authData = this.getCachedAuthData();
        if (!authData) {
            return;
        }
        const now = new Date();
        const expiresIn = authData.expirationDate.getTime() - now.getTime();
        if (expiresIn > 0) {
            this.token = authData.token;
            this.isAuthenticated = true;
            this.setAuthenticationTimer(expiresIn / 1000);
            this.authStatusListener.next(true);
        }
    }

    logout() {
        this.token = null;
        this.isAuthenticated = false;
        this.authStatusListener.next(false);
        clearTimeout(this.tokenTimer);
        this.clearAuthCache();
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

    private cacheAuthToken(token: string, expirationDate: Date) {
        localStorage.setItem("token", token);
        localStorage.setItem("expiration", expirationDate.toISOString());
    }

    private clearAuthCache() {
        localStorage.removeItem("token");
        localStorage.removeItem("expiration");
    }

    private getCachedAuthData() {
        const token = localStorage.getItem("token");
        const expirationDate = localStorage.getItem("expiration");

        if (!token || !expirationDate) {
            return;
        }

        return {
            token: token,
            expirationDate: new Date(expirationDate)
        };
    }

    private setAuthenticationTimer(expiresInDuration: number) {
        this.tokenTimer = setTimeout(() => {
            this.logout();
        }, expiresInDuration * 1000); // timeout in ms  
    }


}
