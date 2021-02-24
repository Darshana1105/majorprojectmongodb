import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import { DeliveryExecutiveService } from 'src/app/services/delivery-executive/delivery-executive.service';


@Component({
  selector: 'app-delivery-reports',
  templateUrl: './delivery-reports.component.html',
  styleUrls: ['./delivery-reports.component.scss']
})
export class DeliveryReportsComponent implements OnInit {

  constructor(private _ordersServ: DeliveryExecutiveService){}

  public orders:any;
  public dId = "6030c1a0a56123fa757da6ba";
  public ratings:any;
  ngOnInit(){
    this._ordersServ.deliveredOrders(this.dId).subscribe(res  =>{
      this.orders = res.orders;
      console.log(this.orders)
      this.deliveryGraph();
    });
    this._ordersServ.getRatings(this.dId).subscribe(res  =>{
      this.ratings = res.ratings.deliveryExecutive.deliveryExecutiveRatings;
      console.log(this.ratings);
      this.ratingsGraph();
    });

  }
  public monthlyRating:Array<any> = [];
  public deliveryCount:Array<any> = [];
  public deliveryData:Array<any> = [{count:0},{count:0},{count:0},{count:0},{count:0},
    {count:0},{count:0},{count:0},{count:0},{count:0},{count:0},{count:0}]
  public ratingsData:Array<any> = [{rating:0,count:0},{rating:0,count:0},{rating:0,count:0}
    ,{rating:0,count:0},{rating:0,count:0},{rating:0,count:0},{rating:0,count:0},
    {rating:0,count:0},{rating:0,count:0},{rating:0,count:0},{rating:0,count:0},
    {rating:0,count:0}];
  ratingsGraph():void{
    this.ratings.forEach((element:any) => {
      let date = new Date(element.date)
      if(date.getMonth() === 0){
        let r = this.ratingsData[0].rating + element.rating
        let count = this.ratingsData[0].count+1
        this.ratingsData[0] = {
          rating : r,
          count : count
        }
      }
      if(date.getMonth() === 1){
        let r = this.ratingsData[1].rating + element.rating
        let count = this.ratingsData[1].count+1
        this.ratingsData[1] = {
          rating : r,
          count : count
        }
      }
      if(date.getMonth() === 2){
        let r = this.ratingsData[2].rating + element.rating
        let count = this.ratingsData[2].count+1
        this.ratingsData[2] = {
          rating : r,
          count : count
        }
      }
      if(date.getMonth() === 3){
        let r = this.ratingsData[3].rating + element.rating
        let count = this.ratingsData[3].count+1
        this.ratingsData[3] = {
          rating : r,
          count : count
        }
      }
      if(date.getMonth() === 4){
        let r = this.ratingsData[4].rating + element.rating
        let count = this.ratingsData[4].count+1
        this.ratingsData[4] = {
          rating : r,
          count : count
        }
      }
      if(date.getMonth() === 5){
        let r = this.ratingsData[5].rating + element.rating
        let count = this.ratingsData[5].count+1
        this.ratingsData[5] = {
          rating : r,
          count : count
        }
      }
      if(date.getMonth() === 6){
        let r = this.ratingsData[6].rating + element.rating
        let count = this.ratingsData[6].count+1
        this.ratingsData[6] = {
          rating : r,
          count : count
        }
      }
      if(date.getMonth() === 7){
        let r = this.ratingsData[7].rating + element.rating
        let count = this.ratingsData[7].count+1
        this.ratingsData[7] = {
          rating : r,
          count : count
        }
      }
      if(date.getMonth() === 8){
        let r = this.ratingsData[8].rating + element.rating
        let count = this.ratingsData[8].count+1
        this.ratingsData[8] = {
          rating : r,
          count : count
        }
      }
      if(date.getMonth() === 9){
        let r = this.ratingsData[9].rating + element.rating
        let count = this.ratingsData[9].count+1
        this.ratingsData[9] = {
          rating : r,
          count : count
        }
      }
      if(date.getMonth() === 10){
        let r = this.ratingsData[10].rating + element.rating
        let count = this.ratingsData[10].count+1
        this.ratingsData[10] = {
          rating : r,
          count : count
        }
      }
      if(date.getMonth() === 11){
        let r = this.ratingsData[11].rating + element.rating
        let count = this.ratingsData[11].count+1
        this.ratingsData[11] = {
          rating : r,
          count : count
        }
      }
    });

    for(let i=0;i<12;i++){
      if(this.ratingsData[i].count>0)
      this.monthlyRating[i] = this.ratingsData[i].rating/this.ratingsData[i].count;
      else{
        this.monthlyRating[i] = 0;
      }
    }
    this.monthlyRating[12] = 5;
  }
  deliveryGraph():void{

    this.orders.forEach((element:any) => {
      let date = new Date(element.orderDateAndTime)
      if(date.getMonth() === 0){
        this.deliveryData[0].count = this.deliveryData[0].count + 1;
      }
      if(date.getMonth() === 1){
        this.deliveryData[1].count = this.deliveryData[1].count + 1;
      }
      if(date.getMonth() === 2){
        this.deliveryData[2].count = this.deliveryData[2].count + 1;
      }
      if(date.getMonth() === 3){
        this.deliveryData[3].count = this.deliveryData[3].count + 1;
      }
      if(date.getMonth() === 4){
        this.deliveryData[4].count = this.deliveryData[4].count + 1;
      }
      if(date.getMonth() === 5){
        this.deliveryData[5].count = this.deliveryData[5].count + 1;
      }
      if(date.getMonth() === 6){
        this.deliveryData[6].count = this.deliveryData[6].count + 1;
      }
      if(date.getMonth() === 7){
        this.deliveryData[7].count = this.deliveryData[7].count + 1;
      }
      if(date.getMonth() === 8){
        this.deliveryData[8].count = this.deliveryData[8].count + 1;
      }
      if(date.getMonth() === 9){
        this.deliveryData[9].count = this.deliveryData[9].count + 1;
      }
      if(date.getMonth() === 10){
        this.deliveryData[10].count = this.deliveryData[10].count + 1;
      }
      if(date.getMonth() === 11){
        this.deliveryData[11].count = this.deliveryData[11].count + 1;
      }
    });
    for(let i=0;i<12;i++){
      this.deliveryCount[i] = this.deliveryData[i].count;
    }
    console.log(this.deliveryCount)
  }

  public ratingChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{ticks: {
      beginAtZero: true
    }}] },
      plugins: {
        datalabels: {
          anchor: 'end',
          align: 'end',
        }
      }
    };
  public ratingChartLabels: Label[] = ['Jan','Feb','Mar','Apr','May','Jun','Jul'
  ,'Aug','Sep','Oct','Nov','Dec'];
  public ratingChartType: ChartType = 'line';
  public ratingChartLegend = true;
  public ratingChartData: ChartDataSets[] = [
    { backgroundColor: '',
      data: this.monthlyRating, label: 'SuperDeliverMan' }
  ];

  public randomizeRating(): void {
    this.ratingChartType = this.ratingChartType === 'bar' ? 'line' : 'bar';
  }

  public deliveryChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{ticks: {
      beginAtZero: true
  }}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public deliveryChartLabels: Label[] = ['Jan','Feb','Mar','Apr','May','Jun','Jul'
  ,'Aug','Sep','Oct','Nov','Dec'];
  public deliveryChartType: ChartType = 'line';
  public deliveryChartLegend = true;
  public deliveryChartData: ChartDataSets[] = [
    { backgroundColor: '',
      data: this.deliveryCount, label: 'Ayush' }
  ];

  public randomizeDelivery(): void {
    this.deliveryChartType = this.deliveryChartType === 'bar' ? 'line' : 'bar';
  }

}
