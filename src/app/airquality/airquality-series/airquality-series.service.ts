import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Subject } from "rxjs";
import { Air } from "../air.model";
import { AuthProvider } from '../../auth/auth.provider';

@Injectable({ providedIn: 'root' })
export class AirSeriesService {
    private airs: Air[] = [];
    private airsUpdated1 = new Subject<Air[]>();
    private airsUpdated2 = new Subject<Air[]>();

    constructor(private http: HttpClient) { }

    getAirSeries(device, rangeInSeconds) {
        this.http
            .get<Air[]>(
                `${environment.api}/api/v1/${device}/air_quality/${rangeInSeconds}`,
                { headers: AuthProvider.getHeaders(this.http) }
            ).subscribe((response) => {
                this.airs = response;
                if(device == "Thingy1"){
                    this.airsUpdated1.next(this.airs);
                }else{
                    this.airsUpdated2.next(this.airs);
                }
            });
    }

    getAirsUpdateListener(device) {
        if(device == "Thingy1"){
            return this.airsUpdated1.asObservable();
        }else{
            return this.airsUpdated2.asObservable();
        }
    }
}
