import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Subject } from "rxjs";
import { Air } from "../air.model";
import { ErrorService } from '../../errors/error.service';

@Injectable({ providedIn: 'root' })
export class AirChangeService {
    private airChangeUpdated1 = new Subject<number>();
    private airChangeUpdated2 = new Subject<number>();

    constructor(private http: HttpClient, private errorService: ErrorService) { }

    getAirChange(device, rangeInSeconds) {
        this.http
            .get<Air[]>(
                `${environment.api}/api/v1/${device}/air_quality/average/${rangeInSeconds}`,
            ).subscribe((response) => {
                const air = response[0].eco2;
                let currentAvg = Math.round(air * 10) / 10;

                this.http
                    .get<Air[]>(
                        `${environment.api}/api/v1/${device}/air_quality/average/${2 * rangeInSeconds}`,
                    ).subscribe((response) => {
                        const air = response[0].eco2;
                        let previousAvg = Math.round(air * 10) / 10;
                        let change = currentAvg - previousAvg;

                        if (device == "Thingy1") {
                            this.airChangeUpdated1.next(change);
                        } else {
                            this.airChangeUpdated2.next(change);
                        }
                    });
            },
            (error) => {
                this.errorService.addError('Air quality: could not load change data', new Date());
            });
    }

    getAirChangeListener(device) {
        if (device == "Thingy1") {
            return this.airChangeUpdated1.asObservable();
        } else {
            return this.airChangeUpdated2.asObservable();
        }
    }

}

