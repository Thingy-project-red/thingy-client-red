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

  avg: number;
  private avgSub: Subscription;

  constructor(public airAvgService: AirAvgService) { }

  ngOnInit() {
    interval(1000).subscribe(x => {
      this.airAvgService.getAvgCO2(this.device);
      this.avgSub = this.airAvgService.getAvgUpdateListener(this.device)
        .subscribe((airs: Air[]) => {
          this.avg = Math.round(airs[0].eco2 * 100) / 100;
        });
    })

  }

  ngOnDestroy() {
    this.avgSub.unsubscribe();
  }

}
