import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Subject } from "rxjs";
import { Humidity } from "../humidity.model";

@Injectable({ providedIn: 'root' })
export class HumidityChangeService {
    private humidChangeUpdated1 = new Subject<number>();
    private humidChangeUpdated2 = new Subject<number>();

    constructor(private http: HttpClient) { }

    getHumidityChange(device, rangeInSeconds) {
        this.http
            .get<Humidity[]>(
                `${environment.api}/api/v1/${device}/humidity/average/${rangeInSeconds}`,
            ).subscribe((response) => {
                const humidity = response[0].humidity;
                let currentAvg = Math.round(humidity * 10) / 10;

                this.http
                    .get<Humidity[]>(
                        `${environment.api}/api/v1/${device}/humidity/average/${2 * rangeInSeconds}`,
                    ).subscribe((response) => {
                        const humidity = response[0].humidity;
                        let previousAvg = Math.round(humidity * 10) / 10;
                        let change = currentAvg - previousAvg;

                        if (device == "Thingy1") {
                            this.humidChangeUpdated1.next(change);
                        } else {
                            this.humidChangeUpdated2.next(change);
                        }
                    });
            })
    }

    getHumidityChangeListener(device) {
        if (device == "Thingy1") {
            return this.humidChangeUpdated1.asObservable();
        } else {
            return this.humidChangeUpdated2.asObservable();
        }
    }

}

