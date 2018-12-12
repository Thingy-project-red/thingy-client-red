import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Subject } from "rxjs";
import { Temperature } from "../temperature.model";

@Injectable({ providedIn: 'root' })
export class TemperatureChangeService {
    private change: number; 
    private currentAvg: number; 
    private previousAvg: number; 

    private tempChangeUpdated1 = new Subject<number>();
    private tempChangeUpdated2 = new Subject<number>();

    constructor(private http: HttpClient) { }

    getTemperatureChange(device, rangeInSeconds) {
        this.http
            .get<Temperature[]>(
                `${environment.api}/api/v1/${device}/temperature/average/${rangeInSeconds}`,
            ).subscribe((response) => {
                const temperature = response[0].temperature;
                this.currentAvg = Math.round(temperature * 10) / 10;
            })

        this.http
        .get<Temperature[]>(
            `${environment.api}/api/v1/${device}/temperature/average/${2*rangeInSeconds}`,
        ).subscribe((response) => {
            const temperature = response[0].temperature; 
            this.previousAvg = Math.round(temperature * 10) / 10; 
        }); 

        this.change = this.currentAvg - this.previousAvg; 

        if(device == "Thingy1"){
            this.tempChangeUpdated1.next(this.change); 
        }else {
            this.tempChangeUpdated2.next(this.change); 
        }
    }

    getTemperatureChangeListener(device) {
        if(device=="Thingy1"){
            return this.tempChangeUpdated1.asObservable();
        }else {
            return this.tempChangeUpdated2.asObservable();
        }
    }

}

