import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { MetricsService } from '../ws/metrics.service';
import { Door } from './door.model';

@Component({
    selector: 'app-door',
    template: '{{ doorStatus }}'
})

export class DoorComponent implements OnInit, OnDestroy {
    @Input() device: String;
    doorStatus: String;

    private subscription: Subscription;

    constructor(public metricsService: MetricsService) { }

    ngOnInit() {
        this.subscription = this.metricsService.doors
            .subscribe((door: Door) => {
            if (door.device === this.device) {
                if (door.open) {
                    this.doorStatus = 'open';
                } else {
                    this.doorStatus = 'closed';
                }
            }
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
