import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
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
  MatTableModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSnackBarModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatNativeDateModule, 
  MatMenuModule

} from '@angular/material';
import { FlexLayoutModule } from "@angular/flex-layout";

import { AppComponent } from './app.component';
import { TemperatureAvgComponent } from './temperature/temperature-avg/temperature-avg.components';
import { TemperatureLatestComponent } from './temperature/temperature-latest/temperature-latest.component';
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
import { LightBubbleComponent } from './light/light-bubble/light-bubble.component';
import { LightLatestComponent } from './light/light-latest/light-latest.component'
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthInterceptor } from './auth/auth-interceptor';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from "./app-routing.module";
import { UserComponent } from "./users/user.component";
import { PreferenceComponent } from "./preferences/preferences.component";
import { DoorGraphComponent } from './graphs/door-graph/door-graph.component';
import { chatIdDirective } from './preferences/chatid-validator.directive';
import { TemperatureChangeComponent } from './temperature/temperature-change/temperature-change.components'; 

@NgModule({
  declarations: [
    AppComponent,
    TemperatureAvgComponent,
    TemperatureLatestComponent,
    TemperatureSeriesComponent,
    AirqualitySeriesComponent,
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
    LightBubbleComponent,
    LightLatestComponent,
    StatusComponent,
    LoginComponent,
    SignupComponent,
    HeaderComponent,
    UserComponent,
    PreferenceComponent,
    SignupComponent,
    DoorGraphComponent,
    chatIdDirective, 
    TemperatureChangeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ChartsModule,
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
    MatSnackBarModule, 
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule, 
    FlexLayoutModule, 
    MatMenuModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
