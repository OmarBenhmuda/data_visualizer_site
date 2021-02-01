import {
  ChangeDetectorRef,
  Component,
  destroyPlatform,
  OnInit,
} from '@angular/core';
import {
  PlotlyModule,
  PlotlyService,
  PlotlyViaCDNModule,
} from 'angular-plotly.js';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-graph-realtime',
  templateUrl: './graph-realtime.component.html',
  styleUrls: ['./graph-realtime.component.css'],
})
export class GraphRealtimeComponent implements OnInit {
  xHolder: Array<string> = [];
  yHolder: Array<number> = [];

  graphUpdater;
  timestamp = '';

  graphName: string = 'SN1';

  constructor(
    public dataService: DataService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.graphUpdater = setInterval(() => {
      this.dataService.getLastValue(this.graphName).subscribe((res) => {
        if (res['timestamp'] != this.timestamp) {
          this.xHolder.push(res['timestamp']);
          this.yHolder.push(res['value']);

          this.setData(this.xHolder, this.yHolder);

          this.timestamp = res['timestamp'];
          console.log(this.graph.data[0].x);

          this.changeDetectorRef.detectChanges();
        }
      });
    }, 1000);
  }

  changeGraphName() {
    clearInterval(this.graphUpdater);

    this.graph.layout.title = 'Realtime - ' + this.graphName;

    this.graph.data[0].x = [];
    this.graph.data[0].y = [];

    this.xHolder = [];
    this.yHolder = [];

    this.timestamp = '';

    this.graphUpdater = setInterval(() => {
      this.dataService.getLastValue(this.graphName).subscribe((res) => {
        if (res['timestamp'] != this.timestamp) {
          this.xHolder.push(res['timestamp']);
          this.yHolder.push(res['value']);

          this.setData(this.xHolder, this.yHolder);

          this.timestamp = res['timestamp'];
          console.log(this.graph.data[0].x);

          this.changeDetectorRef.detectChanges();
        }
      });
    }, 1000);
  }

  setData(x, y) {
    this.graph.data[0].x = [].concat(x);
    this.graph.data[0].y = [].concat(y);
  }

  ngOnDestroy(): void {
    if (this.graphUpdater) {
      clearInterval(this.graphUpdater);
    }

    destroyPlatform;
  }

  public graph = {
    data: [
      {
        x: [],
        y: [],
        name: '',
        mode: 'lines+markers',
        line: {
          color: '#387fba',
          width: 3,
        },
      },
    ],
    layout: {
      title: 'Realtime - ' + this.graphName,
      xaxis: {
        title: 'Timestamp',
        rangemode: 'nonnegative',
        type: 'date',
      },
      yaxis: {
        title: 'Value',
        rangemode: 'tozero',
      },
    },
    config: {
      scrollZoom: true,
      responsive: true,
      displaylogo: false,
    },
  };
}
