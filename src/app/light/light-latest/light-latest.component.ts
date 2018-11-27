import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { MetricsService } from '../../ws/metrics.service';
import { Light } from '../light.model';

@Component({
    selector: 'app-light-latest',
    template: '{{ latestLight }}',
    styleUrls: ['../light.component.css']
})

export class LightLatestComponent implements OnInit {
    @Input() device: String;
    latestLight: string;

    private subscription: Subscription;

    constructor(public metricsService: MetricsService) { }

    ngOnInit() {
        this.subscription = this.metricsService.lights
            .subscribe((light: Light) => {
            if (light.device === this.device) {
                this.latestLight = 'rgb('
                    + light.red + ', '
                    + light.green + ', '
                    + light.blue + ')';
            }
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
