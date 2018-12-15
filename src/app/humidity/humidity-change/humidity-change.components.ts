import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { HumidityChangeService } from './humidity-change.service'; 
import { Subscription } from 'rxjs';
import { interval } from 'rxjs';


@Component({
    selector: 'app-humidity-change',
    templateUrl: './humidity-change.component.html',
    styleUrls: ['../humidity.component.css','../../dashboard/dashboard.component.css']
})

export class HumidityChangeComponent implements OnInit, OnDestroy {
    @Input() device: String;
    @Input() rangeInSeconds: number;

    change: number;
    userIsAuthenticated = false;
    private humiditySub: Subscription;

    constructor(public humidityService: HumidityChangeService) { }

    ngOnInit() {
        this.humiditySub = interval(1000).subscribe(x => {
            this.humidityService.getHumidityChange(this.device, this.rangeInSeconds);
            this.humidityService.getHumidityChangeListener(this.device)
                .subscribe((change: number) => {
                    this.change = change;
                });
        });

    }

    ngOnDestroy() {
        this.humiditySub.unsubscribe();

    }
}
