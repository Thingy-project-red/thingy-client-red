import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthData } from './auth-data.model';
import { UserData } from './auth-user-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from '../users/user.service';
import { User } from '../users/user.model';

@Injectable({ providedIn: "root" })
export class AuthService {
    private isAuthenticated = false;
    private token: string;
    private authStatusListener = new Subject<boolean>();
    private adminStatusListener = new Subject<boolean>();
    private usernameListener = new Subject<string>();
    private tokenTimer: any;
    private username: string;
    private user: User;
    private isAdmin: boolean; 

    constructor(private http: HttpClient, private router: Router, public userService: UserService) { }

    createUser(user: string, password: string, admin: boolean, api: boolean) {
        let rights: string[] = [];
        if (admin) {
            rights.push("admin");
        } if (api) {
            rights.push("api");
        }
        console.log(rights);
        const authData: UserData = {
            name: user, password: password, rights: rights
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
                this.username = username;
                console.log("username authservice " + username);
                if (token) {
                    const helper = new JwtHelperService();
                    const expirationDate: Date = helper
                        .getTokenExpirationDate(token)
                    const expiresInDuration: number = expirationDate.getTime();
                    this.setAuthenticationTimer(expiresInDuration);
                    this.isAuthenticated = true;
                    this.authStatusListener.next(true);
                    this.usernameListener.next(username);
                    this.isUserAdmin(username);
                    this.cacheAuthToken(token, expirationDate, username, this.isAdmin);
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
            this.isAuthenticated = true;
            this.token = authData.token;
            this.username = authData.username;
            this.isAdmin = authData.isAdmin; 
            this.setAuthenticationTimer(expiresIn);
            this.authStatusListener.next(true);
            this.usernameListener.next(this.username);
            this.isUserAdmin(this.username);
        }
    }

    logout() {
        this.token = null;
        this.username = null;
        this.isAuthenticated = false;
        this.authStatusListener.next(false);
        this.usernameListener.next(null);
        this.adminStatusListener.next(false);
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

    getUsername(){
        return this.username; 
    }

    getAdminStatus(){
        return this.isAdmin; 
    }

    getAuthStatusListener() {
        return this.authStatusListener.asObservable();
    }

    getUsernameListener() {
        return this.usernameListener.asObservable();
    }

    getAdminStatusListener() {
        return this.adminStatusListener.asObservable();
    }

    private cacheAuthToken(token: string, expirationDate: Date, username: string, isAdmin: boolean) {
        localStorage.setItem("token", token);
        localStorage.setItem("expiration", expirationDate.toISOString());
        localStorage.setItem("username", username);
        localStorage.setItem("isAdmin", String(isAdmin)); 
    }

    private clearAuthCache() {
        localStorage.removeItem("token");
        localStorage.removeItem("expiration");
        localStorage.removeItem("username");
        localStorage.removeItem("isAdmin"); 
    }

    private getCachedAuthData() {
        const token = localStorage.getItem("token");
        const expirationDate = localStorage.getItem("expiration");
        const username = localStorage.getItem("username");
        const isAdmin = localStorage.getItem("isAdmin"); 

        if (!token || !expirationDate) {
            return;
        }

        return {
            token: token,
            expirationDate: new Date(expirationDate),
            username: username,
            isAdmin: this.stringToBoolean(isAdmin) 
        };
    }

    private stringToBoolean(input: string){
        if(input == "true"){
            return true; 
        }else if(input == "false"){
            return false; 
        }else{
            return; 
        }
    }

    private setAuthenticationTimer(expiresInDuration: number) {
        this.tokenTimer = setTimeout(() => {
            this.logout();
        }, expiresInDuration);
    }

    private getUser(username: string) {
        return this.http.get<User>(
            `${environment.api}/api/v1/users/${username}`)
            .subscribe(user => {
                this.user = user;
            });
    }

    public isUserAdmin(username: string) {
        if (username != null) {
            this.getUser(username);
        }
        if (this.user == null) {
            console.log("User received is undefined");
            return; 
        } else {
            this.isAdmin = this.user.rights.includes("admin");
            this.adminStatusListener.next(this.isAdmin); 
        }
    }

}
