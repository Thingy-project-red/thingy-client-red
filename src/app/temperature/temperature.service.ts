import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class TemperatureService {
    defaultInterval = 1;

    constructor(private http: HttpClient) { }

    getTemperature() {
        return this.http.get('http://localhost:8000/api/v1/temperature');
    }
}
