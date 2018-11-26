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
        this.http.post<{token: string, expiresIn: number}>(
            `${environment.api}/api/v1/auth`, authData)
            .subscribe(response => {
                const token = response.token; 
                this.token = token;
                if (token) {
                    let expiresInDuration = response.expiresIn; 
                    this.tokenTimer = setTimeout(() => {
                        this.logout(); 
                    }, expiresInDuration * 1000); // timeout in ms  
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