import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { AirChangeService } from './airquality-change.service';
import { Subscription } from 'rxjs';
import { interval } from 'rxjs';


@Component({
    selector: 'app-airquality-change',
    templateUrl: './airquality-change.component.html',
    styleUrls: ['../air.component.css','../../dashboard/dashboard.component.css']
})

export class AirChangeComponent implements OnInit, OnDestroy {
    @Input() device: String;
    @Input() rangeInSeconds: number;

    change: number;
    userIsAuthenticated = false;
    private airSub: Subscription;

    constructor(public airService: AirChangeService) { }

    ngOnInit() {
        this.airSub = interval(1000).subscribe(x => {
            this.airService.getAirChange(this.device, this.rangeInSeconds);
            this.airService.getAirChangeListener(this.device)
                .subscribe((change: number) => {
                    this.change = change;
                });
        });

    }

    ngOnDestroy() {
        this.airSub.unsubscribe();

    }
}
