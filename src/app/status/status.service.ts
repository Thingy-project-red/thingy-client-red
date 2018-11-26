import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Subject } from "rxjs";
import { Status } from "./status.model";

@Injectable({ providedIn: 'root' })
export class StatusService {

    private status: Status;
    private statusUpdated1 = new Subject<Status>(); 
    private statusUpdated2 = new Subject<Status>(); 

    constructor(private http: HttpClient){}

    getStatus(device) {
        this.http
        .get<Status>(
            `${environment.api}/api/v1/${device}/status`,
        ).subscribe((response) => {
            this.status = response;
            if(device == "Thingy1"){
                this.statusUpdated1.next(this.status);
            }else{
                this.statusUpdated2.next(this.status);
            }
        })

    }

    getStatusUpdateListener(device) {
        if(device == "Thingy1"){
            return this.statusUpdated1.asObservable();
        }else{
            return this.statusUpdated2.asObservable();
        }
    }
}