import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Subject } from "rxjs";
import { Light } from "./light.model";
import { AuthProvider } from '../auth/auth.provider';

@Injectable({ providedIn: 'root' })
export class LightService {
    private latestColor: any;

    private lightsUpdated1 = new Subject<Light[]>();
    private lightsUpdated2 = new Subject<Light[]>();

    constructor(private http: HttpClient) { }

    getLatestColor(device){
        this.http
            .get<Light[]>(
                `${environment.api}/api/v1/${device}/light_intensity/1`,
                { headers: AuthProvider.getHeaders(this.http) }
            )
            .subscribe((lights) => {
                this.latestColor = this.setColors(lights[0]);
                if(device == "Thingy1"){
                    this.lightsUpdated1.next(this.latestColor); 
                }else{
                    this.lightsUpdated2.next(this.latestColor); 
                }
            })
    }

    getColorCode() {
        return this.latestColor;
    }

   
    getLightsUpdateListener(device){
        if(device == "Thingy1"){
            return this.lightsUpdated1.asObservable();
        }else{
            return this.lightsUpdated2.asObservable();
        }
    }

    setColors(rgb) {
        return 'rgb(' + rgb.red + ', ' + rgb.green + ', ' + rgb.blue + ')';
    }
}
