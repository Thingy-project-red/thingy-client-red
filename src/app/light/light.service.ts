import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Subject } from "rxjs";
import { Light } from "./light.model";
import { AuthProvider } from '../auth/auth.provider';

@Injectable({ providedIn: 'root' })
export class LightService {
    colorCode1: any;
    colorCode2: any;

    private lights1: Light[] = [];
    private lights2: Light[] = [];

    private lightsUpdated1 = new Subject<Light[]>();
    private lightsUpdated2 = new Subject<Light[]>();

    constructor(private http: HttpClient) { }

    getLights1(rangeInSeconds) {
        this.http
            .get<Light[]>(
                `${environment.api}/api/v1/Thingy1/light_intensity/${rangeInSeconds}`,
                { headers: AuthProvider.getHeaders(this.http) }
            )
            .subscribe((transformedLights) => {
                this.lights1 = transformedLights;
                this.colorCode1 = this.setColors(this.lights1[0]);
                this.lightsUpdated1.next(this.lights1);
            })
    }

    getColorCode1() {
        return this.colorCode1;
    }

    getLights2(rangeInSeconds) {
        this.http
            .get<Light[]>(
                `${environment.api}/api/v1/Thingy2/light_intensity/${rangeInSeconds}`,
                { headers: AuthProvider.getHeaders(this.http) }
            )
            .subscribe((transformedLights) => {
                this.lights2 = transformedLights;
                this.colorCode2 = this.setColors(this.lights2[0]);
                this.lightsUpdated2.next(this.lights2);
            })
    }

    getColorCode2() {
        return this.colorCode2;
    }

    getLightsUpdateListener1() {
        return this.lightsUpdated1.asObservable();
    }

    getLightsUpdateListener2() {
        return this.lightsUpdated2.asObservable();
    }

    setColors(rgb) {
        return 'rgb(' + rgb.red + ', ' + rgb.green + ', ' + rgb.blue + ')';
    }
}
