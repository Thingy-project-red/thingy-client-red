import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Subject } from "rxjs";
import { Temperature } from "../temperature.model";
import { ErrorService } from '../../errors/error.service';

@Injectable({ providedIn: 'root' })
export class TemperatureChangeService {
    private tempChangeUpdated1 = new Subject<number>();
    private tempChangeUpdated2 = new Subject<number>();

    constructor(private http: HttpClient, private errorService: ErrorService) { }

    getTemperatureChange(device, rangeInSeconds) {
        this.http
            .get<Temperature[]>(
                `${environment.api}/api/v1/${device}/temperature/average/${rangeInSeconds}`,
            ).subscribe((response) => {
                const temperature = response[0].temperature;
                let currentAvg = Math.round(temperature * 10) / 10;

                this.http
                    .get<Temperature[]>(
                        `${environment.api}/api/v1/${device}/temperature/average/${2 * rangeInSeconds}`,
                    ).subscribe((response) => {
                        const temperature = response[0].temperature;
                        let previousAvg = Math.round(temperature * 10) / 10;
                        let change = currentAvg - previousAvg;

                        if (device == "Thingy1") {
                            this.tempChangeUpdated1.next(change);
                        } else {
                            this.tempChangeUpdated2.next(change);
                        }
                    });
            },(error) => {
                this.errorService.addError('Temperature: could not load change data', new Date());
            });
    }

    getTemperatureChangeListener(device) {
        if (device == "Thingy1") {
            return this.tempChangeUpdated1.asObservable();
        } else {
            return this.tempChangeUpdated2.asObservable();
        }
    }

}

