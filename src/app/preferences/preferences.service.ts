import { Injectable, Predicate } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UserPreferences } from './preferences.model';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map'
import { Router } from '@angular/router';

@Injectable({ providedIn: "root" })
export class PreferenceService {
    private preferencesUpdated = new Subject<UserPreferences>();
    metrics: string[];
    units: object;

    constructor(private http: HttpClient, private router: Router) {
        this.metrics = [
            'humidity',
            'temperature',
            'eco2',
            'tvoc',
            'battery_level'
        ];
        this.units = {
            temperature: '°C',
            humidity: '%',
            eco2: 'ppm',
            tvoc: 'ppb',
            battery_level: '%'
        };
    }

    // Insert possibly missing properties
    private populatePrefs(prefs: UserPreferences) {
        if (!prefs.preferences) {
            prefs.preferences = {
                contactData: {},
                thresholds: {}
            }
        } else if (!prefs.preferences.contactData) {
            prefs.preferences.contactData = {};
        } else if (!prefs.preferences.thresholds) {
            prefs.preferences.thresholds = {};
        }
        this.metrics.forEach(metric => {
            const thresholds = prefs.preferences.thresholds;
            if (!thresholds[metric]) {
                thresholds[metric] = {};
            }
            if (!('timeout' in thresholds[metric])) {
                thresholds[metric].timeout = 60;
            }
        })
    }

    // Remove 'null' thresholds
    private cleanPrefs(prefs: UserPreferences) {
        this.metrics.forEach(metric => {
            const thresholds = prefs.preferences.thresholds;
            if (thresholds[metric].min === null) {
                delete thresholds[metric].min;
            }
            if (thresholds[metric].max === null) {
                delete thresholds[metric].max;
            }
        })
    }

    getUser(username: string) {
        return this.http.get<UserPreferences>(
            `${environment.api}/api/v1/users/${username}`)
            .subscribe(prefs => {
                this.populatePrefs(prefs);
                this.preferencesUpdated.next(prefs);
                this.router.navigate(['/preferences']);
            });
    }

    getUserUpdateListener() {
        return this.preferencesUpdated.asObservable();
    }

    updatePreferences(userPrefs: UserPreferences, username: string) {
        this.cleanPrefs(userPrefs);
        return this.http.patch(
            `${environment.api}/api/v1/users/${username}/preferences`,
            { preferences: userPrefs.preferences })
            .toPromise().then((() => {
                this.getUser(username);
            }));
    }
}
