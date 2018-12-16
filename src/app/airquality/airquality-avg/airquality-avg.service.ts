import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Subject } from "rxjs";
import { Air } from "../air.model";
import { ErrorService } from '../../errors/error.service';

@Injectable({ providedIn: 'root' })
export class AirAvgService {
    private avg: Air[] = [];
    private avgUpdated1 = new Subject<Air[]>();
    private avgUpdated2 = new Subject<Air[]>();

    constructor(private http: HttpClient, private errorService: ErrorService) { }

    getAvgCO2(device, rangeInSeconds) {
        this.http
            .get<Air[]>(
                `${environment.api}/api/v1/${device}/air_quality/average/${rangeInSeconds}`,
            ).subscribe((response) => {
                this.avg = response;
                if (device == "Thingy1") {
                    this.avgUpdated1.next(this.avg);
                } else {
                    this.avgUpdated2.next(this.avg);
                }
            },
            (error) => {
                this.errorService.addError('Air quality: could not load average data', new Date());
            });
    }

    getAvgUpdateListener(device) {
        if (device == "Thingy1") {
            return this.avgUpdated1.asObservable();
        } else {
            return this.avgUpdated2.asObservable();
        }
    }
}
