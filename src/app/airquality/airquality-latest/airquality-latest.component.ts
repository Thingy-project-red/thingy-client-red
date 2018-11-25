import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Air } from '../air.model';
import { AirLatestService } from './airquality-latest.service';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-airquality-latest',
  template: '{{ latest }} ppm CO2',
  styleUrls: ['../air.component.css']
})

export class AirqualityLatestComponent implements OnInit, OnDestroy {
  @Input() device: String;

  latest: number;
  private co2Sub: Subscription;

  constructor(public co2Service: AirLatestService) { }

  ngOnInit() {
    this.co2Sub = interval(1000).subscribe(x => {
      this.co2Service.getLatestCO2(this.device);
      this.co2Service.getCO2UpdateListener(this.device)
        .subscribe((airs: Air[]) => {
          this.latest = airs[0].eco2;
        });
    })
    
  }

  ngOnDestroy() {
    this.co2Sub.unsubscribe();
  }

}
