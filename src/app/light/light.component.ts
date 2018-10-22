import { Component, OnInit } from '@angular/core';
import { Light } from './light.model';
import { LightService } from './light.service';
import { Subscription, interval } from 'rxjs';


@Component({
    selector: 'app-light',
    templateUrl: './light.component.html',
    styleUrls: ['./light.component.css']
})

export class LightComponent implements OnInit {
    lights: any;
    defaultInterval = 1;

    constructor(public lightService: LightService) {}

    ngOnInit() {
        interval(this.defaultInterval * 1000).subscribe(x => {
            this.lightService.getLight().subscribe(response => {
                this.lights = response;
            });
        });
    }
}
