import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Battery } from './battery.model';
import { BatteryService } from './battery.services';
import { Subscription } from 'rxjs';
import { interval } from 'rxjs';

@Component({
    selector: 'app-battery-latest', 
    template: '{{ batteryLevel }}%'
})

export class BatteryComponent implements OnInit, OnDestroy {
    @Input() device: String; 

    private batteryLevel: number; 
    private batterySub: Subscription; 

    constructor(public batteryService: BatteryService){}

    ngOnInit(){
        this.batterySub = interval(1000).subscribe(x => {
            this.batteryService.getBatteryLevel(this.device); 
            this.batteryService.getBatteryUpdateListener(this.device)
            .subscribe((level: number) => {
                this.batteryLevel = level; 
            });
        })
    }

    ngOnDestroy(){
        this.batterySub.unsubscribe(); 
    }
}
