import { Component, OnInit, OnDestroy, OnChanges} from '@angular/core';
import { Temperature } from './temperature.model';
import { TemperatureService } from './temperature.service';
import { Subscription, interval } from 'rxjs';


@Component({
    selector: 'app-temperature',
    templateUrl: './temperature.component.html',
    styleUrls: ['./temperature.component.css']
})

export class TemperatureComponent implements OnInit {
    temperatures: any;
    defaultInterval = 1;
    // private temperaturesSub: Subscription;

    constructor(public temperatureService: TemperatureService) {}

    ngOnInit() {
        interval(this.defaultInterval * 1000).subscribe(x => {
            this.temperatureService.getTemperature().subscribe(response => {
                this.temperatures = response;
            });
        });
    }
}
