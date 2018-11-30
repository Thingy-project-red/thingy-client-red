import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { WebsocketService } from '../../websocket/websocket.service';
import { Light } from '../light.model';

@Component({
    selector: 'app-light-bubble',
    templateUrl: './light-bubble.component.html',
    styleUrls: ['../light.component.css']
})

export class LightBubbleComponent implements OnInit {
    @Input() device: String;
    latestColor: string;

    private subscription: Subscription;

    constructor(public websocketService: WebsocketService) { }

    ngOnInit() {
        this.subscription = this.websocketService.lights
            .subscribe((light: Light) => {
            if (light.device === this.device) {
                this.latestColor = 'rgb('
                    + light.red + ', '
                    + light.green + ', '
                    + light.blue + ')';
            }
        });
    }

    ngOnDestroy(){
        this.subscription.unsubscribe();
    }
}
