import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { MetricsService } from '../../ws/metrics.service';
import { Humidity } from '../humidity.model';

@Component({
    selector: 'app-humidity-latest',
    template: '{{ latest }}%',
    styleUrls: ['../humidity.component.css']
})

export class HumidityLatestComponent implements OnInit, OnDestroy {
    @Input() device: String;
    latest: number;

    private subscription: Subscription;

    constructor(public metricsService: MetricsService) { }

    ngOnInit() {
        this.subscription = this.metricsService.humidities
            .subscribe((humidity: Humidity) => {
            if (humidity.device === this.device) {
                this.latest = humidity.humidity;
            }
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
