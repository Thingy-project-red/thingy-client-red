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
  MatGridListModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { TemperatureComponent } from './temperature/temperature.component';
import { AirComponent } from './airquality/air.component';
import { HumidityComponent } from './humidity/humidity.component';


@NgModule({
  declarations: [
    AppComponent,
    TemperatureComponent,
    AirComponent,
    HumidityComponent
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
    MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
