import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Subject } from "rxjs";
import { Battery } from "./battery.model";

@Injectable({ providedIn: 'root' })
export class BatteryService {

    private level: number;
    private batteriesUpdated1 = new Subject<number>();
    private batteriesUpdated2 = new Subject<number>();

    constructor(private http: HttpClient) { }

    getBatteryLevel(device) {
        this.http
            .get<Battery[]>(
                `${environment.api}/api/v1/${device}/battery_level/1`,
            ).subscribe((batteries) => {
                this.level = batteries[0].battery_level;
                if (device == "Thingy1") {
                    this.batteriesUpdated1.next(this.level);
                } else {
                    this.batteriesUpdated2.next(this.level);
                }
            })
    }

    getBatteryUpdateListener(device) {
        if (device == "Thingy1") {
            return this.batteriesUpdated1.asObservable();
        } else {
            return this.batteriesUpdated2.asObservable();
        }
    }
}