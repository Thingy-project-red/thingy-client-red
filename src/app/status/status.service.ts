import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Subject } from "rxjs";
import { Status } from "./status.model";

@Injectable({ providedIn: 'root' })
export class StatusService {

    private status1: Status;
    private status2: Status;

    private statusUpdated1 = new Subject<Status>(); 
    private statusUpdated2 = new Subject<Status>(); 

    constructor(private http: HttpClient){}

    getStatus1() {
        this.http
        .get<Status>(
            `${environment.api}/api/v1/Thingy1/status`,
        ).subscribe((response) => {
            this.status1 = response;
            this.statusUpdated1.next(this.status1);
        })

    }

    getStatus2() {
        this.http
        .get<Status>(
            `${environment.api}/api/v1/Thingy2/status`,
        ).subscribe((response) => {
            this.status2 = response;
            this.statusUpdated2.next(this.status2);
        })

    }

    getStatusUpdateListener1() {
        return this.statusUpdated1.asObservable();
    }

    getStatusUpdateListener2() {
        return this.statusUpdated2.asObservable();
    }
}