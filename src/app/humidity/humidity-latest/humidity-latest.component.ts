import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { WebsocketService } from '../../websocket/websocket.service';
import { Humidity } from '../humidity.model';
import { ErrorService } from '../../errors/error.service';

@Component({
    selector: 'app-humidity-latest',
    template: '<span *ngIf="latest">{{ latest }}%</span>',
    styleUrls: ['../humidity.component.css']
})

export class HumidityLatestComponent implements OnInit, OnDestroy {
    @Input() device: String;
    latest: number;

    private subscription: Subscription;

    constructor(public websocketService: WebsocketService, private errorService: ErrorService) { }

    ngOnInit() {
        this.subscription = this.websocketService.humidities
            .subscribe((humidity: Humidity) => {
            if (humidity.device === this.device) {
                this.latest = humidity.humidity;
            }
        },
        (error) => {
            this.errorService.addError('Humidity: could not load latest data', new Date());
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
