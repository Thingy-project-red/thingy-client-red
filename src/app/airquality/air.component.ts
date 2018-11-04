import { Component, OnInit, OnDestroy } from '@angular/core';
import { Air } from './air.model';
import { AirService } from './air.service';
import { Subscription, interval } from 'rxjs';


@Component({
    selector: 'app-air',
    templateUrl: './air.component.html',
    styleUrls: ['./air.component.css']
})

export class AirComponent implements OnInit, OnDestroy {
    airs1: any;
    airs2: any;
    latestAir1: number;
    latestAir2: number;
    lookUpRange = '10';


    private airSub1: Subscription;
    private airSub2: Subscription;

    constructor(public airService: AirService) { }

    ngOnInit() {
        interval(1000).subscribe(x => {
            this.airService.getAirQuality1(this.lookUpRange);
            this.airSub1 = this.airService.getAirUpdateListener1()
                .subscribe((temperatures: Air[]) => {
                    this.latestAir1 = temperatures[0].eco2;
                    this.airs1 = temperatures;
                });
        })
        interval(1000).subscribe(x => {
            this.airService.getAirQuality2(this.lookUpRange);
            this.airSub2 = this.airService.getAirUpdateListener2()
                .subscribe((temperatures: Air[]) => {
                    this.latestAir2 = temperatures[0].eco2;
                    this.airs2 = temperatures;
                });
        })
    }

    ngOnDestroy() {
        this.airSub1.unsubscribe();
        this.airSub2.unsubscribe();
    }
}

