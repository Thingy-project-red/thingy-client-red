import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Subject } from "rxjs";
import { Temperature } from "../temperature.model";

@Injectable({ providedIn: 'root' })
export class TemperatureLatestService {
    
    private latest: number; 
    private tempereraturesUpdated1 = new Subject<number>();
    private tempereraturesUpdated2 = new Subject<number>();

    constructor(private http: HttpClient) { }

    getLatestTemperature(device) {
        this.http
            .get<Temperature[]>(
                `${environment.api}/api/v1/${device}/temperature`,
            ).subscribe((response) => {
                this.latest = response[0].temperature;
                if(device == "Thingy1"){
                    this.tempereraturesUpdated1.next(this.latest);
                }else{
                    this.tempereraturesUpdated2.next(this.latest);
                }
            })
    }

    getTemperatureUpdateListener(device) {
        if(device=="Thingy1"){
            return this.tempereraturesUpdated1.asObservable();
        }else {
            return this.tempereraturesUpdated2.asObservable();
        }
    }
}
