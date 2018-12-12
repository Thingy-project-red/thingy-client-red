import { Component, OnInit } from '@angular/core';
import { GraphDataService } from '../graph-data.service';

export interface Time {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-door-graph',
  templateUrl: './door-graph.component.html',
  styleUrls: ['./door-graph.component.css']
})
export class DoorGraphComponent implements OnInit {

  graphData1;
  graphData2;
  dataPoints1 = [];
  dataPoints2 = [];
  dataLabels = [];

  openCounts1:number = 0;
  openCounts2:number = 0;

  endDate:Date = new Date();
  startDate:Date = new Date(new Date().setHours(this.endDate.getHours() - 1));
  selectedDate:Date = new Date();
  selectedHours = this.selectedDate.getHours() - 1 + ':' + this.selectedDate.getMinutes();

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

  /*
    Graph variables
  */

  public lineChartData:Array<any> = [];
  public lineChartLabels:Array<any> = [];

  public lineChartOptions:any = {
    elements: { point: { radius: 0 } },
    tooltips: {enabled: false},
    hover: {mode: null},
    responsive: true,
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'status of door (0: closed, 1: open)',
          fontStyle: 'bold'
        }
      }],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'time (hh:mm)',
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
    
    this.loadGraphData(3600);

  }

  loadGraphData(timeRange) {

    console.log('Time in seconds: ' + timeRange);

    let tmp = this.selectedHours.split(':');
    this.selectedDate.setHours(Number(tmp[0]));
    this.selectedDate.setMinutes(Number(tmp[1]));
    this.selectedDate.setSeconds(Number(0));
    this.startDate = this.selectedDate;
    console.log('Start Date: '+this.startDate.toISOString());
    this.endDate = new Date(this.startDate);
    this.endDate.setSeconds(this.endDate.getSeconds() + timeRange);
    console.log('End Date: '+ this.endDate.toISOString());

    this.resetVariables();

    this.graphDataService.getDoorData('Thingy1', this.startDate.toISOString(), this.endDate.toISOString()).subscribe((data) => {
      this.graphData1 = data;

      let previousOpen:boolean = false;

      let axisLabelWithDate:boolean = false;

      for(let i = 0; i<this.graphData1.length; i++) {
        if(this.graphData1[i].open != null) {
          if(this.graphData1[i].open) {
            if(!previousOpen) {
              this.openCounts1++;
            }
            previousOpen = true;
            this.dataPoints1.push(1);
          } else {
            previousOpen = false;
            this.dataPoints1.push(0);
          }
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

      this.data1Loaded = true;
      if(this.data2Loaded) {
        this.dataLoaded = true;
      }
    },
    (error) => {
      console.log(error);
    });

    this.graphDataService.getDoorData('Thingy2', this.startDate.toISOString(), this.endDate.toISOString()).subscribe((data) => {
      this.graphData2 = data;

      let previousOpen:boolean = false;

      for(let i = 0; i<this.graphData2.length; i++) {
        if(this.graphData2[i].open != null) {
          if(this.graphData2[i].open) {
            if(!previousOpen) {
              this.openCounts2++;
            }
            previousOpen = true;
            this.dataPoints2.push(1);
          } else {
            previousOpen = false;
            this.dataPoints2.push(0);
          }
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

    this.openCounts1 = 0;
    this.openCounts2 = 0;

    this.dataPoints1 = [];
    this.dataPoints2 = [];
    this.dataLabels = [];
    this.lineChartData = [];
    this.lineChartLabels = [];
  }

}
