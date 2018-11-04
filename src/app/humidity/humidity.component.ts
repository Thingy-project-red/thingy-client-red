import { Component, OnInit, OnDestroy } from '@angular/core';
import { Humidity } from './humidity.model';
import { HumidityService } from './humidity.service';
import { Subscription, interval } from 'rxjs';


@Component({
    selector: 'app-humidity',
    templateUrl: './humidity.component.html',
    styleUrls: ['./humidity.component.css']
})

export class HumidityComponent implements OnInit, OnDestroy {
    humidities1: any;
    humidities2: any;
    latest1: number;
    latest2: number;
    lookUpRange = '10'; // in seconds

    private humidSub1: Subscription;
    private humidSub2: Subscription;


    constructor(public humidityService: HumidityService) { }

    ngOnInit() {
        interval(1000).subscribe(x => {
            this.humidityService.getHumidities1(this.lookUpRange);
            this.humidSub1 = this.humidityService.getHumidityUpdateListener1()
                .subscribe((humidities1: Humidity[]) => {
                    this.latest1 = humidities1[0].humidity;
                    this.humidities1 = humidities1;
                });
        })
        interval(1000).subscribe(x => {
            this.humidityService.getHumidities2(this.lookUpRange);
            this.humidSub2 = this.humidityService.getHumidityUpdateListener2()
                .subscribe((humidities2: Humidity[]) => {
                    this.latest2 = humidities2[0].humidity;
                    this.humidities2 = humidities2;
                });
        })
    }

    ngOnDestroy() {
        this.humidSub1.unsubscribe();
        this.humidSub2.unsubscribe();
    }
}
