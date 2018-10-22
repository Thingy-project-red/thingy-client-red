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
  MatIconModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { TemperatureComponent } from './temperature/temperature.component';
import { AirComponent } from './airquality/air.component';
import { HumidityComponent } from './humidity/humidity.component';
import { LightComponent } from './light/light.component';


@NgModule({
  declarations: [
    AppComponent,
    TemperatureComponent,
    AirComponent,
    HumidityComponent,
    LightComponent
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
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }