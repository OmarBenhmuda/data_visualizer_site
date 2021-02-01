import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphRealtimeComponent } from './components/graph-realtime/graph-realtime.component';
import { GraphFixedRangeComponent } from './components/graph-fixed-range/graph-fixed-range.component';
import * as PlotlyJS from 'plotly.js/dist/plotly.js';
import { PlotlyModule } from 'angular-plotly.js';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

PlotlyModule.plotlyjs = PlotlyJS;

@NgModule({
  declarations: [
    AppComponent,
    GraphRealtimeComponent,
    GraphFixedRangeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PlotlyModule,
    CommonModule,
    HttpClientModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
