import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Subject } from "rxjs";
import { Temperature } from "../temperature.model";
import { ErrorService } from '../../errors/error.service';

@Injectable({ providedIn: 'root' })
export class TemperatureAvgService {
    private avg: number; 
    private tempereraturesUpdated1 = new Subject<number>();
    private tempereraturesUpdated2 = new Subject<number>();

    constructor(private http: HttpClient, private errorService: ErrorService) { }

    getAvgTemperature(device, rangeInSeconds) {
        this.http
            .get<Temperature[]>(
                `${environment.api}/api/v1/${device}/temperature/average/${rangeInSeconds}`,
            ).subscribe((response) => {
                const temperature = response[0].temperature;
                this.avg = Math.round(temperature * 10) / 10;
                if(device == "Thingy1"){
                    this.tempereraturesUpdated1.next(this.avg);

                }else{
                    this.tempereraturesUpdated2.next(this.avg);
                }
            },
            (error) => {
                this.errorService.addError('Temperature: could not load average data', new Date());
            });
    }
    getTemperatureUpdateListener(device) {
        if(device=="Thingy1"){
            return this.tempereraturesUpdated1.asObservable();
        }else {
            return this.tempereraturesUpdated2.asObservable();
        }
    }

}

