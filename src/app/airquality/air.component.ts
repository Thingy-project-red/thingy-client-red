import { Component, OnInit } from '@angular/core';
import { Air } from './air.model';
import { AirService } from './air.service';
import { Subscription, interval } from 'rxjs';


@Component({
    selector: 'app-air',
    templateUrl: './air.component.html',
    styleUrls: ['./air.component.css']
})

export class AirComponent implements OnInit {
    airs: any;
    defaultInterval = 1;

    constructor(public airService: AirService) {}

    ngOnInit() {
        interval(this.defaultInterval * 1000).subscribe(x => {
            this.airService.getAirQuality().subscribe(response => {
                this.airs = response;
            });
        });
    }
}
