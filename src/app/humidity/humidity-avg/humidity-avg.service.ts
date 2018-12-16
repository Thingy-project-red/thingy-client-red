import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Humidity } from '../humidity.model';
import { Subject } from "rxjs";
import { ErrorService } from '../../errors/error.service';

@Injectable({ providedIn: 'root' })
export class HumidityAvgService {
    private avg: Humidity[] = [];

    private humiditiesUpdated1 = new Subject<Humidity[]>();
    private humiditiesUpdated2 = new Subject<Humidity[]>();

    constructor(private http: HttpClient, private errorService: ErrorService) { }

    getAvgHumidity(device, rangeInSeconds) {
        this.http
            .get<Humidity[]>(
                `${environment.api}/api/v1/${device}/humidity/average/${rangeInSeconds}`,
            ).subscribe((response) => {
                this.avg = response;
                if (device == "Thingy1") {
                    this.humiditiesUpdated1.next(this.avg);
                } else {
                    this.humiditiesUpdated2.next(this.avg);
                }
            },
            (error) => {
                this.errorService.addError('Humidity: could not load average data', new Date());
            });
    }

    getHumidityUpdateListener(device) {
        if(device == "Thingy1"){
            return this.humiditiesUpdated1.asObservable();
        }else{
            return this.humiditiesUpdated2.asObservable();
        }
    }
}
