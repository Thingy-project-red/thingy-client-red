import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Subject } from "rxjs"; 
import { Temperature } from "./temperature.model"; 

@Injectable({providedIn: 'root'})
export class TemperatureService {
    private temperatures1: Temperature[] = []; 
    private temperatures2: Temperature[] = []; 

    private tempereraturesUpdated1 = new Subject<Temperature[]>(); 
    private tempereraturesUpdated2 = new Subject<Temperature[]>(); 

    constructor(private http: HttpClient) {}
    
    getTemperatures1(rangeInSeconds){
        this.http
            .get<Temperature[]>(
                `${environment.api}/api/v1/Thingy1/temperature/${rangeInSeconds}`
        ).subscribe((response) => {
            this.temperatures1 = response;
            this.tempereraturesUpdated1.next([...this.temperatures1]);
        })
    }

    getTemperatures2(rangeInSeconds){
        this.http
            .get<Temperature[]>(
                `${environment.api}/api/v1/Thingy2/temperature/${rangeInSeconds}`
        ).subscribe((response) => {
            this.temperatures2 = response;
            this.tempereraturesUpdated2.next([...this.temperatures2]);
        })
    }

    getTemperatureUpdateListener1() {
        return this.tempereraturesUpdated1.asObservable(); 
    }

    getTemperatureUpdateListener2() {
        return this.tempereraturesUpdated2.asObservable(); 
    }


}
