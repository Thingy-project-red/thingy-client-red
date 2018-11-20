import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Air } from '../air.model';
import { AirAvgService } from './airquality-avg.service';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-airquality-avg',
  template: 'ø {{ avg }} ppm',
  styleUrls: ['../air.component.css']
})

export class AirqualityAvgComponent implements OnInit, OnDestroy {
  @Input() device: String;
  @Input() rangeInSeconds: number; 

  avg: number;
  private avgSub: Subscription;

  constructor(public airAvgService: AirAvgService) { }

  ngOnInit() {
    this.avgSub = interval(10000).subscribe(x => {
      this.airAvgService.getAvgCO2(this.device, this.rangeInSeconds);
      this.airAvgService.getAvgUpdateListener(this.device)
        .subscribe((airs: Air[]) => {
          this.avg = Math.round(airs[0].eco2 * 100) / 100;
        });
    })
    
  }

  ngOnDestroy() {
    this.avgSub.unsubscribe();
  }

}
