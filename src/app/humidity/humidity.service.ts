import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Humidity } from './humidity.model';
import { Subject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class HumidityService {
    private humidities1: Humidity[] = [];
    private humidities2: Humidity[] = [];

    private humiditiesUpdated1 = new Subject<Humidity[]>();
    private humiditiesUpdated2 = new Subject<Humidity[]>();


    constructor(private http: HttpClient) { }

    getHumidities1(rangeInSeconds) {
        this.http
            .get<Humidity[]>(
                `${environment.api}/api/v1/Thingy1/humidity/${rangeInSeconds}`
            ).subscribe((response) => {
                this.humidities1 = response;
                this.humiditiesUpdated1.next([...this.humidities1]);
            })
    }

    getHumidities2(rangeInSeconds) {
        this.http
            .get<Humidity[]>(
                `${environment.api}/api/v1/Thingy2/humidity/${rangeInSeconds}`
            ).subscribe((response) => {
                this.humidities2 = response;
                this.humiditiesUpdated2.next([...this.humidities2]);
            })
    }

    getHumidityUpdateListener1() {
        return this.humiditiesUpdated1.asObservable();
    }

    getHumidityUpdateListener2() {
        return this.humiditiesUpdated2.asObservable();
    }
}
