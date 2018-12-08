import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UserPreferences } from './preferences.model';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map'
import { Router } from '@angular/router';

@Injectable({ providedIn: "root" })
export class PreferenceService {
    private preferencesUpdated = new Subject<UserPreferences>();

    constructor(private http: HttpClient, private router: Router) {}

    getUser(username: string) {
        return this.http.get<UserPreferences>(
            `${environment.api}/api/v1/users/${username}`)
            .subscribe(prefs => {
                this.preferencesUpdated.next(prefs);
                this.router.navigate(['/preferences']);
            });
    }

    getUserUpdateListener() {
        return this.preferencesUpdated.asObservable();
    }

    updatePreferences(userPrefs: UserPreferences, username: string) {
        return this.http.patch(
            `${environment.api}/api/v1/users/${username}`, { preferences: userPrefs.preferences })
            .subscribe((response => {
                this.getUser(username);
            }));
    }
}
