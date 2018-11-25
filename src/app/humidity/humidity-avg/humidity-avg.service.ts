import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Humidity } from '../humidity.model';
import { Subject } from "rxjs";
//import { AuthProvider } from '../../auth/auth.provider';

@Injectable({ providedIn: 'root' })
export class HumidityAvgService {
    private avg: Humidity[] = [];

    private humiditiesUpdated1 = new Subject<Humidity[]>();
    private humiditiesUpdated2 = new Subject<Humidity[]>();

    constructor(private http: HttpClient) { }

    getAvgHumidity(device, rangeInSeconds) {
        this.http
            .get<Humidity[]>(
                `${environment.api}/api/v1/${device}/humidity/average/${rangeInSeconds}`,
                //{ headers: AuthProvider.getHeaders(this.http) }
            ).subscribe((response) => {
                this.avg = response;
                if (device == "Thingy1") {
                    this.humiditiesUpdated1.next(this.avg);
                } else {
                    this.humiditiesUpdated2.next(this.avg);
                }
            })
    }

    getHumidityUpdateListener(device) {
        if(device == "Thingy1"){
            return this.humiditiesUpdated1.asObservable();
        }else{
            return this.humiditiesUpdated2.asObservable();
        }
    }
}
