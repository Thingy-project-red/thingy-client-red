import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Air } from '../air.model';
import { AirAvgService } from './airquality-avg.service';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-airquality-avg',
  template: '<span *ngIf=avg><br><span class="card-content-subval">{{ avg }}</span><span class="subvalues-text">Last Hour</span></span>',
  styleUrls: ['../air.component.css', '../../dashboard/dashboard.component.css']
})

export class AirqualityAvgComponent implements OnInit, OnDestroy {
  @Input() device: String;
  @Input() rangeInSeconds: number; 

  avg: number;
  private avgSub: Subscription;

  constructor(public airAvgService: AirAvgService) { }

  ngOnInit() {
    this.avgSub = interval(1000).subscribe(x => {
      this.airAvgService.getAvgCO2(this.device, this.rangeInSeconds);
      this.airAvgService.getAvgUpdateListener(this.device)
        .subscribe((airs: Air[]) => {
          this.avg = Math.round(airs[0].eco2 * 10) / 10;
        });
    })
    
  }

  ngOnDestroy() {
    this.avgSub.unsubscribe();
  }

}
