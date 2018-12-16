import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { TemperatureAvgService } from './temperature-avg.service';
import { Subscription } from 'rxjs';
import { interval } from 'rxjs';


@Component({
    selector: 'app-temperature-avg',
    template: '<span *ngIf=avg><br><span class="card-content-subval">{{ avg }}°</span><span class="subvalues-text">Last Hour</span></span>',
    styleUrls: ['../temperature.component.css', '../../dashboard/dashboard.component.css']
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
                .subscribe((temperatures: number) => {
                    this.avg = temperatures;
                });
        });

    }

    ngOnDestroy() {
        this.temperaturesSub.unsubscribe();

    }
}
