import { Component, OnInit, Input } from '@angular/core';
import { Subscribable, Subscription, interval } from 'rxjs';
import { LightService } from '../light.service';
import { Light } from '../light.model';

@Component({
  selector: 'app-light-bubble',
  templateUrl: './light-bubble.component.html',
  styleUrls: ['../light-bubble.component.css']
})
export class LightBubbleComponent implements OnInit {
  @Input() device: String;

  latestColor: number;
  private lightSub: Subscription;

  constructor(public lightService: LightService) { }

  ngOnInit() {
    this.lightSub = interval(1000).subscribe(x => {
      this.lightService.getLatestColor(this.device);
      this.lightService.getLightsUpdateListener(this.device)
        .subscribe((lights: Light[]) => {
          this.latestColor = this.lightService.getColorCode();
        })
    })
  }

  ngOnDestroy() {
    this.lightSub.unsubscribe();
  }

}
