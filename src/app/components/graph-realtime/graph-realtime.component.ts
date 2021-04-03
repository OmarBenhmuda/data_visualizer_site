import {
  ChangeDetectorRef,
  Component,
  destroyPlatform,
  Input,
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

  @Input() graphName: string;

  constructor(
    public dataService: DataService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.graph.layout.title = this.graphName;
    this.graphUpdater = setInterval(() => {
      this.dataService.getLastValue(this.graphName).subscribe((res) => {
        if (res['timestamp'] != this.timestamp) {
          this.xHolder.push(res['timestamp']);
          this.yHolder.push(res['value']);

          this.setData(this.xHolder, this.yHolder);

          this.timestamp = res['timestamp'];
          console.log(this.graph.data[0].x);
          this.graph.layout.xaxis.showticklabels = true;
          this.graph.layout.yaxis.showticklabels = true;
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
          color: '#475473',
          width: 3,
        },
        marker: {
          color: '#ff4d40',
        },
        connectgaps: false,
      },
    ],
    layout: {
      height: 280,
      title: '',
      xaxis: {
        // title: 'Timestamp',
        rangemode: 'nonnegative',
        autorange: true,
        showticklabels: false,
        zeroline: false,
        showgrid: false,
      },
      yaxis: {
        // title: 'Value',
        rangemode: 'tozero',
        showticklabels: false,
        zeroline: false,
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
