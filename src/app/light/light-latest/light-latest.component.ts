import { Component, OnInit, Input } from '@angular/core';
import { Subscribable, Subscription, interval } from 'rxjs';
import { LightService } from '../light.service';
import { Light } from '../light.model';

@Component({
  selector: 'app-light-latest',
  template: '{{ latestLight }}',
  styleUrls: ['../light.component.css']
})
export class LightLatestComponent implements OnInit {
  @Input() device: String;

  private latestLight: number;
  private lightSub: Subscription;

  constructor(public lightService: LightService) { }

  ngOnInit() {
    this.lightSub = interval(1000).subscribe(x => {
      this.lightService.getLatestColor(this.device);
      this.lightService.getLightsUpdateListener(this.device)
        .subscribe((lights: Light[]) => {
          this.latestLight = this.lightService.getColorCode();
        })
    })
  }

  ngOnDestroy() {
    this.lightSub.unsubscribe();
  }

}
