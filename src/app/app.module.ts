import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatTreeModule,
  MatTableModule,
  MatProgressSpinnerModule,
  MatSelectModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { TemperatureAvgComponent } from './temperature/temperature-avg/temperature-avg.components';
import { TemperatureLatestComponent } from './temperature/temperature-latest/temperature-latest.component';
import { LightComponent } from './light/light.component';
import { DoorComponent } from './door/door.component';
import { BatteryComponent } from './battery/battery.component';
import { TemperatureSeriesComponent } from './temperature/temperature-series/temperature-series.component';
import { AirqualityLatestComponent } from './airquality/airquality-latest/airquality-latest.component';
import { AirqualitySeriesComponent } from './airquality/airquality-series/airquality-series.component';
import { AirqualityAvgComponent } from './airquality/airquality-avg/airquality-avg.component';
import { HumidityLatestComponent } from './humidity/humidity-latest/humidity-latest.component';
import { HumidityAvgComponent } from './humidity/humidity-avg/humidity-avg.component';
import { HumiditySeriesComponent } from './humidity/humidity-series/humidity-series.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TemperatureGraphComponent } from './graphs/temperature-graph/temperature-graph.component';
import { HumidityGraphComponent } from './graphs/humidity-graph/humidity-graph.component';
import { GraphOverviewComponent } from './graphs/graph-overview/graph-overview.component';
import { Co2GraphComponent } from './graphs/co2-graph/co2-graph.component';
import { TvocGraphComponent } from './graphs/tvoc-graph/tvoc-graph.component'; 
import { ChartsModule } from 'ng2-charts';
import { StatusComponent } from './status/status.component'

const appRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'graphs',      component: GraphOverviewComponent },
  { path: '**', component: DashboardComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    TemperatureAvgComponent,
    TemperatureLatestComponent, 
    TemperatureSeriesComponent,
    AirqualitySeriesComponent,
    LightComponent,
    DoorComponent, 
    BatteryComponent, 
    AirqualityLatestComponent,
    AirqualityAvgComponent,
    HumidityLatestComponent,
    HumidityAvgComponent,
    HumiditySeriesComponent,
    DashboardComponent,
    TemperatureGraphComponent,
    HumidityGraphComponent,
    Co2GraphComponent,
    TvocGraphComponent,
    GraphOverviewComponent,
    StatusComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      appRoutes,
    ),
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatTreeModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
