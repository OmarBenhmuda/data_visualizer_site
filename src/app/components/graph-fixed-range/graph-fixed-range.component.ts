import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Input,
} from '@angular/core';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-graph-fixed-range',
  templateUrl: './graph-fixed-range.component.html',
  styleUrls: ['./graph-fixed-range.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GraphFixedRangeComponent implements OnInit {
  public dateTimeRange: Date[];

  @Input() graphName: string;

  constructor(
    public dataService: DataService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.graph.layout.title = this.graphName
    this.dataService.getAll(this.graphName).subscribe((res) => {
      console.log(res);

      this.graph.data[0].x = res['x'];
      this.graph.data[0].y = res['y'];
      this.changeDetectorRef.detectChanges();
    });
  }

  changeGraphDomain() {
    this.dataService
      .getDomain(
        this.graphName,
        `${this.dateTimeRange[0].getTime() / 1000}`,
        `${this.dateTimeRange[1].getTime() / 1000}`
      )
      .subscribe((res) => {
        console.log(res);

        this.graph.data[0].x = res['x'];
        this.graph.data[0].y = res['y'];
        this.changeDetectorRef.detectChanges();
      });
  }

  public graph = {
    data: [
      {
        x: [],
        y: [],
        name: '',
        mode: 'lines+markers',
        line: {
          color: '#475473',
          width: 3,
        },
        marker: {
          color: '#ff4d40',
        },
      },
    ],
    layout: {
      height: 200,
      title: '',
      xaxis: {
        title: 'Timestamp',
        rangemode: 'nonnegative',
        type: 'date',
        autorange: true,
      },
      yaxis: {
        title: 'Value',
        rangemode: 'tozero',
      },
      margin: {
        l: 50,
        r: 0,
        t: 50,
        b: 50,
      },
      // plot_bgcolor: 'grey',
      // paper_bgcolor: 'grey',
    },
    config: {
      scrollZoom: false,
      responsive: true,
      displaylogo: false,
    },
  };
}
