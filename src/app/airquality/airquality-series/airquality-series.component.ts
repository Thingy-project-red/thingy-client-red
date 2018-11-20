import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Air } from '../air.model';
import { AirSeriesService } from './airquality-series.service';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-airquality-series',
  templateUrl: './airquality-series.component.html',
  styleUrls: ['../air.component.css']
})

export class AirqualitySeriesComponent implements OnInit, OnDestroy {
  @Input() device: String;
  @Input() rangeInSeconds: number; 

  airs: any;
  private airSub: Subscription;

  constructor(public airSeriesService: AirSeriesService) { }

  ngOnInit() {
    interval(1000).subscribe(x => {
      this.airSeriesService.getAirSeries(this.device, this.rangeInSeconds);
      this.airSub = this.airSeriesService.getAirsUpdateListener(this.device)
        .subscribe((temperatures: Air[]) => {
            this.airs = temperatures;
        });
    })
  }

  ngOnDestroy(){
    this.airSub.unsubscribe(); 
  }

}
