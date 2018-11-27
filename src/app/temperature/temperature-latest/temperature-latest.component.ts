import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { MetricsService } from '../../ws/metrics.service';
import { Temperature } from '../temperature.model';

@Component({
    selector: 'app-temperature-latest',
    template: '{{ latest }}°C',
    styleUrls: ['../temperature.component.css']
})

export class TemperatureLatestComponent implements OnInit, OnDestroy {
    @Input() device: String;
    latest: number;

    private subscription: Subscription;

    constructor(public metricsService: MetricsService) { }

    ngOnInit() {
        this.subscription = this.metricsService.temperatures
            .subscribe((temperature: Temperature) => {
            if (temperature.device === this.device) {
                this.latest = temperature.temperature;
            }
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
