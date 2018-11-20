import { Component, OnInit } from '@angular/core';
import { GraphDataService } from '../graph-data.service';

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

  dataLoaded:boolean = false;
  data1Loaded:boolean = false;
  data2Loaded:boolean = false;

  constructor(private graphDataService:GraphDataService) { }

  ngOnInit() {

    this.dataLoaded = false;

    this.graphDataService.getData('Thingy1', 'air_quality', 3600, '').subscribe((data) => {
      this.graphData1 = data;
      let counter = 0;
      let average = 0;
      for(let i = 0; i<this.graphData1.length; i++) {
        if(counter<60) {
          average = average + this.graphData1[i].tvoc;
          counter++;
        } else {
          this.dataPoints1.push(Number((average / 60).toFixed(2)));
          this.dataLabels.push(new Date(this.graphData1[i-30].time).getHours() + ':' + (new Date(this.graphData1[i-30].time).getMinutes() < 10 ? '0' + new Date(this.graphData1[i-30].time).getMinutes() : new Date(this.graphData1[i-30].time).getMinutes()));
          counter = 0;
          average = 0;
        }
      }
      this.data1Loaded = true;
      if(this.data2Loaded) {
        this.dataLoaded = true;
      }
    },
    (error) => {
      console.log(error);
    });

    this.graphDataService.getData('Thingy2', 'air_quality', 3600, '').subscribe((data) => {
      this.graphData2 = data;
      let counter = 0;
      let average = 0;
      for(let i = 0; i<this.graphData2.length; i++) {
        if(counter<60) {
          average = average + this.graphData2[i].tvoc;
          counter++;
        } else {
          this.dataPoints2.push(Number((average / 60).toFixed(2)));
          counter = 0;
          average = 0;
        }
      }
      this.data2Loaded = true;
      if(this.data1Loaded) {
        this.dataLoaded = true;
      }
    },
    (error) => {
      console.log(error);
    });

  }

  public lineChartData:Array<any> = [
    {data: this.dataPoints1, label: 'Thingy1'},
    {data: this.dataPoints2, label: 'Thingy2'}
  ];
  public lineChartLabels:Array<any> = this.dataLabels;
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

}

