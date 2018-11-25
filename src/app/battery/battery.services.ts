import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Subject } from "rxjs";
import { Battery } from "./battery.model";
//import { AuthProvider } from '../auth/auth.provider';


@Injectable({ providedIn: 'root' })
export class BatteryService {

    private batteries: Battery[] = [];
    private batteriesUpdated1 = new Subject<Battery[]>();
    private batteriesUpdated2 = new Subject<Battery[]>();

    constructor(private http: HttpClient) { }

    getBatteryLevel(device) {
        this.http
            .get<Battery[]>(
                `${environment.api}/api/v1/${device}/battery_level/1`,
                //{ headers: AuthProvider.getHeaders(this.http) }
            ).subscribe((response) => {
                this.batteries = response;
                if (device == "Thingy1") {
                    this.batteriesUpdated1.next(this.batteries);
                } else {
                    this.batteriesUpdated2.next(this.batteries);
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