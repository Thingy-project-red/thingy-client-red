import { Component, OnInit } from '@angular/core';
import { GraphDataService } from '../graph-data.service';

export interface Time {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-tvoc-graph',
  templateUrl: './tvoc-graph.component.html',
  styleUrls: ['./tvoc-graph.component.css']
})
export class TvocGraphComponent implements OnInit {

  graphData1;
  graphData2;
  dataPoints1 = [];
  dataPoints2 = [];
  dataLabels = [];

  average1:number = 0;
  average2:number = 0;

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
    responsive: true,
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'TVOC (ppm)',
          fontStyle: 'bold'
        }
      }],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'time',
          fontStyle: 'bold'
        }
      }]
    }
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

    this.graphDataService.getData('Thingy1', 'air_quality', timeRange, interval).subscribe((data) => {
      this.graphData1 = data;

      let axisLabelWithDate:boolean = false;

      for(let i = 0; i<this.graphData1.length; i++) {
        if(this.graphData1[i].tvoc != null) {
          this.dataPoints1.push(Number((this.graphData1[i].tvoc).toFixed(2)));
          this.average1 += Number((this.graphData1[i].tvoc).toFixed(2));
          let minutes = new Date(this.graphData1[i].time).getMinutes();
          let hours = new Date(this.graphData1[i].time).getHours();
          if(this.selectedTime == 60 || this.selectedTime == 3600) {
            this.dataLabels.push(hours + ':' + (minutes < 10 ? '0' + minutes : minutes));
          } else {
            axisLabelWithDate = true;
            let days = new Date(this.graphData1[i].time).getDate();
            let month = new Date(this.graphData1[i].time).getMonth() + 1;
            let year = new Date(this.graphData1[i].time).getFullYear();
            this.dataLabels.push(days + '.' + month + '.' + year + ' - ' +hours + ':' + (minutes < 10 ? '0' + minutes : minutes));
          }
        }
      }

      if(!axisLabelWithDate) {
        this.lineChartOptions.scales.xAxes[0].scaleLabel.labelString = 'time (hh:mm)';
      } else {
        this.lineChartOptions.scales.xAxes[0].scaleLabel.labelString = 'time (DD.MM.YYYY - hh:mm)';
      }

      this.lineChartData[0] = {data: this.dataPoints1, label: 'Thingy1'};
      this.lineChartLabels = this.dataLabels;

      this.average1 = Number((this.average1 / this.graphData1.length).toFixed(2));

      this.data1Loaded = true;
      if(this.data2Loaded) {
        this.dataLoaded = true;
      }
    },
    (error) => {
      console.log(error);
    });

    this.graphDataService.getData('Thingy2', 'air_quality', timeRange, interval).subscribe((data) => {
      this.graphData2 = data;

      for(let i = 0; i<this.graphData2.length; i++) {
        if(this.graphData2[i].tvoc != null) {
          this.dataPoints2.push(Number((this.graphData2[i].tvoc).toFixed(2)));
          this.average2 += Number((this.graphData2[i].tvoc).toFixed(2));
        }
      }

      this.lineChartData[1] = {data: this.dataPoints2, label: 'Thingy2'};

      this.average2 = Number((this.average2 / this.graphData2.length).toFixed(2));

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

    this.average1 = 0;
    this.average2 = 0;

    this.dataPoints1 = [];
    this.dataPoints2 = [];
    this.dataLabels = [];
    this.lineChartData = [];
    this.lineChartLabels = [];
  }

}
