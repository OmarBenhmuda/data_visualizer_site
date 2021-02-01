import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

const url = `http://${window.location.hostname}:3000`;
const testurl = `http://${window.location.hostname}:3001`;
@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getAll(graphName: string) {
    return this.http.get(`${url}/data/${graphName}`);
  }

  getDomain(graphName: string, from: string, to: string) {
    return this.http.get(`${url}/data/domain/${graphName}/${from}/${to}`);
  }

  getLastValue(graphName: string) {
    return this.http.get(`${url}/data/realtime/${graphName}`);
  }

  getLastValueTest() {
    return this.http.get(`${testurl}/data/realtime`);
  }
}
