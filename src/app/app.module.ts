import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatTreeModule,
  MatTableModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { TemperatureAvgComponent } from './temperature/temperature-avg/temperature-avg.components';
import { TemperatureLatestComponent } from './temperature/temperature-latest/temperature-latest.component';
import { HumidityComponent } from './humidity/humidity.component';
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

@NgModule({
  declarations: [
    AppComponent,
    TemperatureAvgComponent,
    TemperatureLatestComponent, 
    TemperatureSeriesComponent,
    AirqualitySeriesComponent,
    HumidityComponent,
    LightComponent,
    DoorComponent, 
    BatteryComponent, 
    AirqualityLatestComponent,
    AirqualityAvgComponent,
    HumidityLatestComponent,
    HumidityAvgComponent,
    HumiditySeriesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatTreeModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
