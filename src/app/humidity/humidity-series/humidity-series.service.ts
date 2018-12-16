import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Humidity } from '../humidity.model';
import { Subject } from "rxjs";
import { ErrorService } from '../../errors/error.service';

@Injectable({ providedIn: 'root' })
export class HumiditySeriesService {
    private humidities: Humidity[] = [];
    private humiditiesUpdated1 = new Subject<Humidity[]>();
    private humiditiesUpdated2 = new Subject<Humidity[]>();

    constructor(private http: HttpClient, private errorService: ErrorService) { }

    getHumiditySeries(device, rangeInSeconds) {
        this.http
            .get<Humidity[]>(
                `${environment.api}/api/v1/${device}/humidity/${rangeInSeconds}`,
            ).subscribe((response) => {
                this.humidities = response;
                if (device == "Thingy1") {
                    this.humiditiesUpdated1.next(this.humidities);
                } else {
                    this.humiditiesUpdated2.next(this.humidities);
                }
            },
            (error) => {
                this.errorService.addError('Humidity: could not load series data', new Date());
            });
    }

    getHumidityUpdateListener(device) {
        if (device == "Thingy1") {
            return this.humiditiesUpdated1.asObservable();
        } else {
            return this.humiditiesUpdated2.asObservable();
        }
    }
}
