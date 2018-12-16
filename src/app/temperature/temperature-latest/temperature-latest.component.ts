import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { WebsocketService } from '../../websocket/websocket.service';
import { Temperature } from '../temperature.model';
import { ErrorService } from '../../errors/error.service';

@Component({
    selector: 'app-temperature-latest',
    template: '<span *ngIf="latest">{{ latest }}°</span>',
    styleUrls: ['../temperature.component.css']
})

export class TemperatureLatestComponent implements OnInit, OnDestroy {
    @Input() device: String;
    latest: number;

    private subscription: Subscription;

    constructor(public websocketService: WebsocketService, private errorService: ErrorService) {}

    ngOnInit() {
        this.subscription = this.websocketService.temperatures
            .subscribe((temperature: Temperature) => {
            if (temperature.device === this.device) {
                this.latest = Math.round(temperature.temperature * 10) / 10;
            }
        },
        (error) => {
            this.errorService.addError('Temperature: could not load latest data', new Date());
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
