import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { WebsocketService } from '../../websocket/websocket.service';
import { Humidity } from '../humidity.model';

@Component({
    selector: 'app-humidity-latest',
    template: '<span *ngIf="latest">{{ latest }}%</span>',
    styleUrls: ['../humidity.component.css']
})

export class HumidityLatestComponent implements OnInit, OnDestroy {
    @Input() device: String;
    latest: number;

    private subscription: Subscription;

    constructor(public websocketService: WebsocketService) { }

    ngOnInit() {
        this.subscription = this.websocketService.humidities
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
