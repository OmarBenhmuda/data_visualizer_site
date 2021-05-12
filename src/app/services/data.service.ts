import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const port = '3000';

const url = `http://${window.location.hostname}:${port}`;
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
}
