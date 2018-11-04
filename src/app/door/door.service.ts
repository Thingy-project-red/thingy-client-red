import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Subject } from "rxjs"; 
import { Door } from "./door.model"


@Injectable({providedIn: 'root'})
export class DoorService {

    private doors1: Door[] = []; 
    private doors2: Door[] = []; 

    private doorsUpdated1 = new Subject<Door[]>(); 
    private doorsUpdated2 = new Subject<Door[]>(); 

    constructor(private http: HttpClient) { }

    getDoor1(rangeInSeconds){
        this.http
            .get<Door[]>(
                `${environment.api}/api/v1/Thingy1/door/${rangeInSeconds}`
            )
            .subscribe((transformedLights) => {
                this.doors1 = transformedLights;
                this.doorsUpdated1.next(this.doors1);
            })
    }

    getDoor2(rangeInSeconds){
        this.http
            .get<Door[]>(
                `${environment.api}/api/v1/Thingy2/door/${rangeInSeconds}`
            )
            .subscribe((transformedLights) => {
                this.doors2 = transformedLights;
                this.doorsUpdated2.next(this.doors2);
            })
    }

    getDoorUpdateListener1() {
        return this.doorsUpdated1.asObservable(); 
    }

    getDoorUpdateListener2() {
        return this.doorsUpdated2.asObservable(); 
    }
}
