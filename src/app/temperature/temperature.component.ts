import { Component, OnInit, OnDestroy } from '@angular/core';
import { Temperature } from './temperature.model';
import { TemperatureService } from './temperature.service';
import { Subscription } from 'rxjs';
import { interval } from 'rxjs';


@Component({
    selector: 'app-temperature',
    templateUrl: './temperature.component.html',
    styleUrls: ['./temperature.component.css']
})

export class TemperatureComponent implements OnInit, OnDestroy {
    temperatures1: any;
    temperatures2: any;
    latestTemp1: number;
    latestTemp2: number;
    lookUpRange = '10'; // in seconds

    private temperaturesSub1: Subscription;
    private temperaturesSub2: Subscription;

    constructor(public temperatureService: TemperatureService) { }

    ngOnInit() {
        interval(1000).subscribe(x => {
            this.temperatureService.getTemperatures1(this.lookUpRange);
            this.temperaturesSub1 = this.temperatureService.getTemperatureUpdateListener1()
                .subscribe((temperatures: Temperature[]) => {
                    this.latestTemp1 = temperatures[0].temperature;
                    this.temperatures1 = temperatures;
                });
        })
        interval(1000).subscribe(x => {
            this.temperatureService.getTemperatures2(this.lookUpRange);
            this.temperaturesSub2 = this.temperatureService.getTemperatureUpdateListener2()
                .subscribe((temperatures: Temperature[]) => {
                    this.latestTemp2 = temperatures[0].temperature;
                    this.temperatures2 = temperatures;
                });
        })
    }

    ngOnDestroy() {
        this.temperaturesSub1.unsubscribe();
        this.temperaturesSub2.unsubscribe();
    }
}
