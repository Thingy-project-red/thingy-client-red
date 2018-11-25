import { Component, OnInit, OnDestroy } from '@angular/core';
import { Door } from './door.model';
import { DoorService } from './door.service';
import { Subscription, interval } from 'rxjs';


@Component({
    selector: 'app-door',
    templateUrl: './door.component.html',
    styleUrls: ['./door.component.css']
})

export class DoorComponent implements OnInit, OnDestroy {
    doors1: any;
    doors2: any;
    isOpen1: boolean;
    isOpen2: boolean;
    lookUpRange = '10'; // in seconds

    private doorSub1: Subscription;
    private doorSub2: Subscription;

    constructor(public doorService: DoorService) { }

    ngOnInit() {
        this.doorSub1 = interval(1000).subscribe(x => {
            this.doorService.getDoor1(this.lookUpRange);
            this.doorService.getDoorUpdateListener1()
                .subscribe((doors: Door[]) => {
                    this.doors1 = doors;
                    this.isOpen1 = this.doors1[0].open;
                });
        })
        this.doorSub2 = interval(1000).subscribe(x => {
            this.doorService.getDoor2(this.lookUpRange);
            this.doorService.getDoorUpdateListener2()
                .subscribe((doors: Door[]) => {
                    this.doors2 = doors;
                    this.isOpen2 = this.doors2[0].open;
                });
        })
    }

    ngOnDestroy() {
        this.doorSub1.unsubscribe();
        this.doorSub2.unsubscribe();
    }
}
