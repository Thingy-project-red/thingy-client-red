import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Subject } from "rxjs";
import { Air } from "../air.model";

@Injectable({ providedIn: 'root' })
export class AirLatestService {
    private co2: Air[] = [];
    private co2Updated1 = new Subject<Air[]>();
    private co2Updated2 = new Subject<Air[]>();

    constructor(private http: HttpClient) { }

    getLatestCO2(device) {
        this.http
            .get<Air[]>(
                `${environment.api}/api/v1/${device}/air_quality`,
            ).subscribe((response) => {
                this.co2 = response;
                if (device == "Thingy1") {
                    this.co2Updated1.next(this.co2);
                } else {
                    this.co2Updated2.next(this.co2);
                }
            });
    }

    getCO2UpdateListener(device) {
        if (device == "Thingy1") {
            return this.co2Updated1.asObservable();
        } else {
            return this.co2Updated2.asObservable();
        }
    }
}
