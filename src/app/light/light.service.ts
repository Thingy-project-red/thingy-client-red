import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class LightService {
    defaultInterval = 1;

    constructor(private http: HttpClient) { }

    getLight() {
        return this.http.get(`${environment.api}/api/v1/Thingy1/light_intensity`);
    }
}
