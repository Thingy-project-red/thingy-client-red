import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Status } from './status.model';
import { StatusService } from './status.service';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-status',
  template: '{{ status }}',
})
export class StatusComponent implements OnInit, OnDestroy {
    @Input() device: string; 
    
    private status: string = 'loading...'; 
    private statusSub: Subscription; 

    constructor(public statusService: StatusService){}

    ngOnInit(){
        this.statusSub = interval(1000).subscribe(x => {
            this.statusService.getStatus(this.device); 
            this.statusService.getStatusUpdateListener(this.device)
            .subscribe((data: Status) => {
                this.status = data.status;
            });
        })
    }

    ngOnDestroy(){
        this.statusSub.unsubscribe(); 
    }
}
