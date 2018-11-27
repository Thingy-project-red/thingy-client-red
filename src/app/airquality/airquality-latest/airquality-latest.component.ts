import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { MetricsService } from '../../ws/metrics.service';
import { Air } from '../air.model';

@Component({
    selector: 'app-airquality-latest',
    template: '{{ latest }} ppm CO2',
    styleUrls: ['../air.component.css']
})

export class AirqualityLatestComponent implements OnInit, OnDestroy {
    @Input() device: String;
    latest: number;

    private subscription: Subscription;

    constructor(public metricsService: MetricsService) { }

    ngOnInit() {
        this.subscription = this.metricsService.airs
            .subscribe((air: Air) => {
            if (air.device === this.device) {
                this.latest = air.eco2;
            }
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
