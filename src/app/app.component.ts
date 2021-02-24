import { Component } from '@angular/core';
import { DataService } from './services/data.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(public dataService: DataService) {}
  title = 'workstudy-site';

  graphLabel: string = 'SN1';
  graphType: string = 'fixedRange';

  sn1Selected: boolean = false;
  sn2Selected: boolean = false;
  sn3Selected: boolean = false;
  sn4Selected: boolean = false;
}
