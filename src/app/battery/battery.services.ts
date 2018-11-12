import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Subject } from "rxjs";
import { Battery } from "./battery.model";


@Injectable({providedIn: 'root'})
export class BatteryService {

    private batteries1: Battery[] = [] ;
    private batteries2: Battery[] = [] ;

    private batteriesUpdated1 = new Subject<Battery[]>(); 
    private batteriesUpdated2 = new Subject<Battery[]>(); 

    constructor(private http: HttpClient){}

    getBattery1(rangeInSeconds) {
        this.http
        .get<Battery[]>(
            `${environment.api}/api/v1/Thingy1/battery_level/${rangeInSeconds}`
        ).subscribe((response) => {
            this.batteries1 = response;
            this.batteriesUpdated1.next(this.batteries1);
        })

    }

    getBattery2(rangeInSeconds) {
        this.http
        .get<Battery[]>(
            `${environment.api}/api/v1/Thingy2/battery_level/${rangeInSeconds}`
        ).subscribe((response) => {
            this.batteries2 = response;
            this.batteriesUpdated2.next(this.batteries2);
        })

    }

    getBatteryUpdateListener1() {
        return this.batteriesUpdated1.asObservable();
    }

    getBatteryUpdateListener2() {
        return this.batteriesUpdated2.asObservable();
    }
}