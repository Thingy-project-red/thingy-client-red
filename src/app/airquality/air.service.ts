import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Subject } from "rxjs"; 
import { Air } from "./air.model"; 

@Injectable({providedIn: 'root'})
export class AirService {
    private airs1: Air[] = []; 
    private airs2: Air[] = []; 

    private airsUpdated1 = new Subject<Air[]>(); 
    private airsUpdated2 = new Subject<Air[]>(); 

    constructor(private http: HttpClient) { }

    getAirQuality1(rangeInSeconds) {
        this.http
            .get<Air[]>(
                `${environment.api}/api/v1/Thingy1/air_quality/${rangeInSeconds}`
        ).subscribe((response) => {
            this.airs1 = response;
            this.airsUpdated1.next([...this.airs1]);
        });
    }

    getAirQuality2(rangeInSeconds) {
        this.http
            .get<Air[]>(
                `${environment.api}/api/v1/Thingy2/air_quality/${rangeInSeconds}`
        ).subscribe((response) => {
            this.airs2 = response;
            this.airsUpdated2.next([...this.airs2]);
        });
    }

    getAirUpdateListener1() {
        return this.airsUpdated1.asObservable(); 
    }

    getAirUpdateListener2() {
        return this.airsUpdated2.asObservable(); 
    }
}
