import { Component, OnInit, OnDestroy } from '@angular/core';
import { Status } from './status.model';
import { StatusService } from './status.service';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit, OnDestroy {
    status1: string = 'unset'; 
    status2: string = 'unset';

    private statusSub1: Subscription; 
    private statusSub2: Subscription;

    constructor(public statusService: StatusService){}

    ngOnInit(){
        this.statusSub1 = interval(10000).subscribe(x => {
            this.statusService.getStatus1(); 
            this.statusService.getStatusUpdateListener1()
            .subscribe((data: Status) => {
                this.status1 = data.status;
            });
        })

        this.statusSub2 = interval(10000).subscribe(x => {
            this.statusService.getStatus2(); 
            this.statusService.getStatusUpdateListener2()
            .subscribe((data: Status) => {
                 this.status2 = data.status;
            });
        })
    }

    ngOnDestroy(){
        this.statusSub1.unsubscribe(); 
        this.statusSub2.unsubscribe(); 
    }
}
