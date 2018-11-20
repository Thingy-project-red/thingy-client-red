import { Component, OnInit, OnDestroy } from '@angular/core';
import { Battery } from './battery.model';
import { BatteryService } from './battery.services';
import { Subscription } from 'rxjs';
import { interval } from 'rxjs';

@Component({
    selector: 'app-battery', 
    templateUrl: './battery.component.html', 
    styleUrls: ['./battery.component.css']
})

export class BatteryComponent implements OnInit, OnDestroy {
    batteries1: any; 
    batteries2: any;
    latestBattery1: number; 
    latestBattery2: number; 
    lookUpRange = '10'; 

    private batterySub1: Subscription; 
    private batterySub2: Subscription;

    constructor(public batteryService: BatteryService){}

    ngOnInit(){
        this.batterySub1 = interval(10000).subscribe(x => {
            this.batteryService.getBattery1(this.lookUpRange); 
            this.batteryService.getBatteryUpdateListener1()
            .subscribe((batteries: Battery[]) => {
                this.latestBattery1 = batteries[0].battery_level; 
                this.batteries1 = batteries; 
            });
        })

        this.batterySub2 = interval(10000).subscribe(x => {
            this.batteryService.getBattery2(this.lookUpRange); 
            this.batteryService.getBatteryUpdateListener2()
            .subscribe((batteries: Battery[]) => {
                this.latestBattery2 = batteries[0].battery_level; 
                this.batteries2 = batteries; 
            });
        })
    }

    ngOnDestroy(){
        this.batterySub1.unsubscribe(); 
        this.batterySub2.unsubscribe(); 
    }
}
