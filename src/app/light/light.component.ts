import { Component, OnInit, OnDestroy } from '@angular/core';
import { Light } from './light.model';
import { LightService } from './light.service';
import { Subscription, interval } from 'rxjs';


@Component({
    selector: 'app-light',
    templateUrl: './light.component.html',
    styleUrls: ['./light.component.css']
})

export class LightComponent implements OnInit, OnDestroy {
    lights1: any;
    lights2: any;
    colorCode1: any; 
    colorCode2: any;
    door1: any; 
    door2: any;
    lookUpRange = '10'; // in seconds

    private ligthSub1: Subscription;
    private ligthSub2: Subscription;

    constructor(public lightService: LightService) {}

    ngOnInit() {
        interval(1000).subscribe(x => {
            this.lightService.getLights1(this.lookUpRange); 
            this.ligthSub1 = this.lightService.getLightsUpdateListener1()
            .subscribe((lights: Light[]) => {
                this.colorCode1 = this.lightService.getColorCode1();
                this.door1 = this.lightService.getDoor1(); 
                this.lights1 = lights; 
            });
        })
        interval(1000).subscribe(x => {
            this.lightService.getLights2(this.lookUpRange); 
            this.ligthSub1 = this.lightService.getLightsUpdateListener2()
            .subscribe((lights: Light[]) => {
                this.colorCode2 = this.lightService.getColorCode2();
                this.door2 = this.lightService.getDoor2(); 
                this.lights2 = lights; 
            });
        })
    }

    ngOnDestroy() {
        this.ligthSub1.unsubscribe();
        this.ligthSub2.unsubscribe(); 
    }
}
