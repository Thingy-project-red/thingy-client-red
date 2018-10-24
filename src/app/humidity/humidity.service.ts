import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class HumidityService {
    defaultInterval = 1;

    constructor(private http: HttpClient) { }

    getHumidity() {
        return this.http.get(`${environment.api}/api/v1/humidity`);
    }
}
