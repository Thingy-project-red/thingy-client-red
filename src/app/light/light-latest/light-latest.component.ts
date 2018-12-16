import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { WebsocketService } from '../../websocket/websocket.service';
import { Light } from '../light.model';
import { ErrorService } from '../../errors/error.service';

@Component({
    selector: 'app-light-latest',
    template: '{{ latestLight }}',
    styleUrls: ['../light.component.css']
})

export class LightLatestComponent implements OnInit {
    @Input() device: String;
    latestLight: string;

    private subscription: Subscription;

    constructor(public websocketService: WebsocketService, private errorService: ErrorService) { }

    ngOnInit() {
        this.subscription = this.websocketService.lights
            .subscribe((light: Light) => {
            if (light.device === this.device) {
                this.latestLight = 'rgb('
                    + light.red + ', '
                    + light.green + ', '
                    + light.blue + ')';
            }
        },
        (error) => {
            this.errorService.addError('Light: could not load latest light data', new Date());
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
