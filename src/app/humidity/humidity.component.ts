import { Component, OnInit } from '@angular/core';
import { Humidity } from './humidity.model';
import { HumidityService } from './humidity.service';
import { Subscription, interval } from 'rxjs';


@Component({
    selector: 'app-humidity',
    templateUrl: './humidity.component.html',
    styleUrls: ['./humidity.component.css']
})

export class HumidityComponent implements OnInit {
    humidities: any;
    defaultInterval = 1;

    constructor(public humidityService: HumidityService) {}

    ngOnInit() {
        interval(this.defaultInterval * 1000).subscribe(x => {
            this.humidityService.getHumidity().subscribe(response => {
                this.humidities = response;
            });
        });
    }
}
