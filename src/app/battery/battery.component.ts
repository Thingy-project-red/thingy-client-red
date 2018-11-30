import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { WebsocketService } from '../websocket/websocket.service';
import { Battery } from './battery.model';

@Component({
    selector: 'app-battery-latest',
    template: '{{ batteryLevel }}%'
})

export class BatteryComponent implements OnInit, OnDestroy {
    @Input() device: String;
    batteryLevel: number;

    private subscription: Subscription;

    constructor(public websocketService: WebsocketService) { }

    ngOnInit() {
        this.subscription = this.websocketService.batteries
            .subscribe((battery: Battery) => {
            if (battery.device === this.device) {
                this.batteryLevel = battery.battery_level;
            }
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
