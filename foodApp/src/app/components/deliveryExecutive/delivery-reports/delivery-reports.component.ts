import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import { DeliveryExecutiveService } from 'src/app/utilities/delivery-executive/delivery-executive.service';


@Component({
  selector: 'app-delivery-reports',
  templateUrl: './delivery-reports.component.html',
  styleUrls: ['./delivery-reports.component.scss']
})
export class DeliveryReportsComponent implements OnInit {

  constructor(private _ordersServ: DeliveryExecutiveService){}

  public orders:any;
  public ratings:any;
  ngOnInit(){
    this._ordersServ.deliveredOrders().subscribe(res  =>{
      this.orders = res.orders;
      console.log(this.orders)
      if(this.orders.length){
        this.deliveryGraph();
      }
    });
    this._ordersServ.getRatings().subscribe(res  =>{
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
      let month =date.getMonth();
      let r = this.ratingsData[month].rating + element.rating
        let count = this.ratingsData[month].count+1
        this.ratingsData[month] = {
          rating : r,
          count : count
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
      let month = date.getMonth();
      this.deliveryData[month].count = this.deliveryData[month].count + 1;

     
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
