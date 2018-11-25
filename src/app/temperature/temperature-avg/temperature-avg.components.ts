import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Temperature } from '../temperature.model';
import { TemperatureAvgService } from './temperature-avg.service';
import { Subscription } from 'rxjs';
import { interval } from 'rxjs';


@Component({
    selector: 'app-temperature-avg',
    template: 'ø {{ avg }}°C',
    styleUrls: ['../temperature.component.css']
})

export class TemperatureAvgComponent implements OnInit, OnDestroy {
    @Input() device: String;
    @Input() rangeInSeconds: number;

    avg: number;
    userIsAuthenticated = false;
    private temperaturesSub: Subscription;

    constructor(public temperatureService: TemperatureAvgService) { }

    ngOnInit() {
        this.temperaturesSub = interval(1000).subscribe(x => {
            this.temperatureService.getAvgTemperature(this.device, this.rangeInSeconds);
            this.temperatureService.getTemperatureUpdateListener(this.device)
                .subscribe((temperatures: Temperature[]) => {
                    this.avg = Math.round(temperatures[0].temperature * 10) / 10;
                });
        });
    }

    ngOnDestroy() {
        this.temperaturesSub.unsubscribe();
    }
}
