import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthProvider } from '../auth/auth.provider';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GraphDataService {

  constructor(public http:HttpClient) { }

  getData(device, topic, intervalInSeconds, average) {
    return this.http.get(`${environment.api}/api/v1/` + device + '/' + topic + '/' + intervalInSeconds + '?average=' + average, { headers: AuthProvider.getHeaders(this.http) })
  }

}
