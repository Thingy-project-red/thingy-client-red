import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { WebsocketService } from '../../websocket/websocket.service';
import { Air } from '../air.model';

@Component({
    selector: 'app-airquality-latest',
    template: '<span *ngIf="latest">{{ latest }}ppm</span>',
    styleUrls: ['../air.component.css']
})

export class AirqualityLatestComponent implements OnInit, OnDestroy {
    @Input() device: String;
    latest: number;

    private subscription: Subscription;

    constructor(public websocketService: WebsocketService) { }

    ngOnInit() {
        this.subscription = this.websocketService.airs
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
