import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { AuthProvider } from '../auth/auth.provider';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GraphDataService {

  constructor(public http: HttpClient) { }

  getData(device, topic, timeInSeconds, intervalInSeconds) {
    return this.http.get(
      `${environment.api}/api/v1/` 
        + device 
        + '/' 
        + topic 
        + '/average/' 
        + timeInSeconds 
        + '?interval=' 
        + intervalInSeconds 
        //{ headers: AuthProvider.getHeaders(this.http)}
        )
  }

  getDoorData(device, from, to) {
    return this.http.get(
      `${environment.api}/api/v1/` 
        + device 
        + '/' 
        + 'door?from='
        + encodeURIComponent(from)
        + '&to='
        + encodeURIComponent(to)
        //{ headers: AuthProvider.getHeaders(this.http)}
        )
  }

}
