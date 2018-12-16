import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { WebsocketService } from '../websocket/websocket.service';
import { Battery } from './battery.model';
import { ErrorService } from '../errors/error.service';

@Component({
    selector: 'app-battery-latest',
    template: '<span *ngIf="batteryLevel">{{ batteryLevel }}%</span>'
})

export class BatteryComponent implements OnInit, OnDestroy {
    @Input() device: String;
    batteryLevel: number;

    private subscription: Subscription;

    constructor(public websocketService: WebsocketService, private errorService: ErrorService) { }

    ngOnInit() {
        this.subscription = this.websocketService.batteries
            .subscribe((battery: Battery) => {
            if (battery.device === this.device) {
                this.batteryLevel = battery.battery_level;
            }
        },
        (error) => {
            this.errorService.addError('Battery: could not load status of battery', new Date());
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
