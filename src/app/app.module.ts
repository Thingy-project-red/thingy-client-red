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
import { AirComponent } from './airquality/air.component';
import { HumidityComponent } from './humidity/humidity.component';
import { LightComponent } from './light/light.component';
import { DoorComponent } from './door/door.component';
import { BatteryComponent } from './battery/battery.component';
import { TemperatureSeriesComponent } from './temperature/temperature-series/temperature-series.component';

@NgModule({
  declarations: [
    AppComponent,
    TemperatureAvgComponent,
    TemperatureLatestComponent, 
    TemperatureSeriesComponent,
    AirComponent,
    HumidityComponent,
    LightComponent,
    DoorComponent, 
    BatteryComponent
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
