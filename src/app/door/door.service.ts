import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Subject } from "rxjs";
import { Door } from "./door.model";

@Injectable({ providedIn: 'root' })
export class DoorService {

    private doors: Door[] = [];
    private doorsUpdated1 = new Subject<Door[]>();
    private doorsUpdated2 = new Subject<Door[]>();

    constructor(private http: HttpClient) { }

    getDoorStatus(device) {
        this.http
            .get<Door[]>(
                `${environment.api}/api/v1/${device}/door/1`,
            )
            .subscribe((doorStatus) => {
                this.doors = doorStatus; 
                if(device == "Thingy1"){
                    this.doorsUpdated1.next(this.doors); 
                }else{
                    this.doorsUpdated2.next(this.doors); 
                }
            })
    }

    getDoorUpdateListener(device) {
        if(device == "Thingy1"){
            return this.doorsUpdated1.asObservable(); 
        }else{
            return this.doorsUpdated2.asObservable()
        }
    }
}
