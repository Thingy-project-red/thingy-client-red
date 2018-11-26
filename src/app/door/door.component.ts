import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Door } from './door.model';
import { DoorService } from './door.service';
import { Subscription, interval } from 'rxjs';


@Component({
    selector: 'app-door',
    template: '{{ doorStatus }}'
})

export class DoorComponent implements OnInit, OnDestroy {
    @Input() device: String; 

    private doorStatus: string; 
    private doorSub: Subscription; 

    constructor(public doorService: DoorService) { }

    ngOnInit() {
        this.doorSub = interval(1000).subscribe(x => {
            this.doorService.getDoorStatus(this.device);
            this.doorService.getDoorUpdateListener(this.device)
                .subscribe((doors: Door[]) => {
                    const isOpen = doors[0].open;
                    if(isOpen){
                        this.doorStatus = "open"; 
                    }else {
                        this.doorStatus = "closed"; 
                    }
                });
        })
    }

    ngOnDestroy() {
        this.doorSub.unsubscribe(); 
    }
}
