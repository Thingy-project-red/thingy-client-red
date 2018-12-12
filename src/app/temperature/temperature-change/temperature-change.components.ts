import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Temperature } from '../temperature.model';
import { TemperatureChangeService } from './temperature-change.service';
import { Subscription } from 'rxjs';
import { interval } from 'rxjs';


@Component({
    selector: 'app-temperature-change',
    template: '<span *ngIf=change>{{ avg }}°</span>',
    styleUrls: ['../temperature.component.css']
})

export class TemperatureChangeComponent implements OnInit, OnDestroy {
    @Input() device: String;
    @Input() rangeInSeconds: number;

    change: number;
    userIsAuthenticated = false;
    private temperaturesSub: Subscription;

    constructor(public temperatureService: TemperatureChangeService) { }

    ngOnInit() {
        this.temperaturesSub = interval(1000).subscribe(x => {
            this.temperatureService.getTemperatureChange(this.device, this.rangeInSeconds);
            this.temperatureService.getTemperatureChangeListener(this.device)
                .subscribe((change: number) => {
                    this.change = change;
                });
        });

    }

    ngOnDestroy() {
        this.temperaturesSub.unsubscribe();

    }
}
