import { Component, OnInit, Output } from '@angular/core';
import { GraphDataService } from '../graph-data.service';

export interface Time {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-humidity-graph',
  templateUrl: './humidity-graph.component.html',
  styleUrls: ['./humidity-graph.component.css']
})
export class HumidityGraphComponent implements OnInit {

  graphData1;
  graphData2;
  dataPoints1 = [];
  dataPoints2 = [];
  dataLabels = [];

  dataLoaded:boolean = false;
  data1Loaded:boolean = false;
  data2Loaded:boolean = false;

  times: Time[] = [
    {value: 60, viewValue: 'Minutes'},
    {value: 3600, viewValue: 'Hours'},
    {value: 86400, viewValue: 'Days'}
  ];

  selectedTime = 3600;
  selectedValue:number = 1;

  numberOfDataPoints:number = 60;

  /*
    Graph variables
  */

  public lineChartData:Array<any> = [];
  public lineChartLabels:Array<any> = [];

  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartColors:Array<any> = [
    { // red
      backgroundColor: 'rgba(255,255,255,0)',
      borderColor: 'rgba(255,0,0,1)',
      pointBackgroundColor: 'rgba(255,0,0,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // blue
      backgroundColor: 'rgba(255,255,255,0)',
      borderColor: 'rgba(0,0,255,1)',
      pointBackgroundColor: 'rgba(0,0,255,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';

  constructor(private graphDataService:GraphDataService) { }

  ngOnInit() {

    this.loadGraphData(3600, this.numberOfDataPoints);

  }

  loadGraphData(timeRange, interval) {

    this.resetVariables();

    this.graphDataService.getData('Thingy1', 'humidity', timeRange, interval).subscribe((data) => {
      this.graphData1 = data;

      for(let i = 0; i<this.graphData1.length; i++) {
        if(this.graphData1[i].humidity != null) {
          this.dataPoints1.push(Number((this.graphData1[i].humidity).toFixed(2)));
          let minutes = new Date(this.graphData1[i].time).getMinutes();
          let hours = new Date(this.graphData1[i].time).getHours();
          if(this.selectedTime == 60 || this.selectedTime == 3600) {
            this.dataLabels.push(hours + ':' + (minutes < 10 ? '0' + minutes : minutes));
          } else {
            let days = new Date(this.graphData1[i].time).getDate();
            let month = new Date(this.graphData1[i].time).getMonth() + 1;
            let year = new Date(this.graphData1[i].time).getFullYear();
            this.dataLabels.push(days + '.' + month + '.' + year + ' - ' +hours + ':' + (minutes < 10 ? '0' + minutes : minutes));
          }
        }
      }

      this.lineChartData[0] = {data: this.dataPoints1, label: 'Thingy1'};
      this.lineChartLabels = this.dataLabels;

      this.data1Loaded = true;
      if(this.data2Loaded) {
        this.dataLoaded = true;
      }
    },
    (error) => {
      console.log(error);
    });

    this.graphDataService.getData('Thingy2', 'humidity', timeRange, interval).subscribe((data) => {
      this.graphData2 = data;

      for(let i = 0; i<this.graphData2.length; i++) {
        if(this.graphData2[i].humidity != null) {
          this.dataPoints2.push(Number((this.graphData2[i].humidity).toFixed(2)));
        }
      }

      this.lineChartData[1] = {data: this.dataPoints2, label: 'Thingy2'};

      this.data2Loaded = true;
      if(this.data1Loaded) {
        this.dataLoaded = true;
      }
    },
    (error) => {
      console.log(error);
    });
  }

  resetVariables() {
    this.dataLoaded = false;
    this.data1Loaded = false;
    this.data2Loaded = false;

    this.graphData1 = null;
    this.graphData2 = null;

    this.dataPoints1 = [];
    this.dataPoints2 = [];
    this.dataLabels = [];
    this.lineChartData = [];
    this.lineChartLabels = [];
  }

}
