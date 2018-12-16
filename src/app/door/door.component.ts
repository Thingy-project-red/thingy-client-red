import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { WebsocketService } from '../websocket/websocket.service';
import { Door } from './door.model';
import { ErrorService } from '../errors/error.service';

@Component({
    selector: 'app-door',
    templateUrl: './door.component.html',
    styleUrls: ['../dashboard/dashboard.component.css'], 
})

export class DoorComponent implements OnInit, OnDestroy {
    @Input() device: String;
    doorStatus: String;

    private subscription: Subscription;

    constructor(public websocketService: WebsocketService, private errorService: ErrorService) { }

    ngOnInit() {
        this.subscription = this.websocketService.doors
            .subscribe((door: Door) => {
            if (door.device === this.device) {
                if (door.open) {
                    this.doorStatus = 'open';
                } else {
                    this.doorStatus = 'closed';
                }
            }
        },
        (error) => {
            this.errorService.addError('Door: could not load status of door', new Date());
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
