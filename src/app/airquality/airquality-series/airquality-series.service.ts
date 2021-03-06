import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Subject } from "rxjs";
import { Air } from "../air.model";
import { ErrorService } from '../../errors/error.service';

@Injectable({ providedIn: 'root' })
export class AirSeriesService {
    private airs: Air[] = [];
    private airsUpdated1 = new Subject<Air[]>();
    private airsUpdated2 = new Subject<Air[]>();

    constructor(private http: HttpClient, private errorService: ErrorService) { }

    getAirSeries(device, rangeInSeconds) {
        this.http
            .get<Air[]>(
                `${environment.api}/api/v1/${device}/air_quality/${rangeInSeconds}`,
            ).subscribe((response) => {
                this.airs = response;
                if (device == "Thingy1") {
                    this.airsUpdated1.next(this.airs);
                } else {
                    this.airsUpdated2.next(this.airs);
                }
            },
            (error) => {
                this.errorService.addError('Air quality: could not load series data', new Date());
            });
    }

    getAirsUpdateListener(device) {
        if (device == "Thingy1") {
            return this.airsUpdated1.asObservable();
        } else {
            return this.airsUpdated2.asObservable();
        }
    }
}
