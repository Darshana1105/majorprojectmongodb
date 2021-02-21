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
  public dId = "602a35f1ef3f0f46d49e867e";
  public ratings:any;
  ngOnInit(){
    this._ordersServ.deliveredOrders(this.dId).subscribe(res  =>{
      this.orders = res.orders;
      console.log(res.orders);
    });
    this._ordersServ.getRatings(this.dId).subscribe(res  =>{
      this.ratings = res.ratings.deliveryExecutive.deliveryExecutiveRatings;
      console.log(this.ratings);
      this.ratingsGraph();
    });

  }
  public months:any;
  ratingsGraph():void{
    let i=0;
    let janF = 0;
    let jan:any;
    this.ratings.forEach((element:any) => {
      var date = new Date(element.date);

      let feb:Array<any> = [];
      let mar:Array<any> = [];
      let apr:Array<any> = [];
      let may:Array<any> = [];
      let jun:Array<any> = [];
      let jul:Array<any> = [];
      let aug:Array<any> = [];
      let sep:Array<any> = [];
      let oct:Array<any> = [];
      let nov:Array<any> = [];
      let dec:Array<any> = [];
      if(date.getMonth() === 0){
        janF = janF + element.rating
        i++;
        jan = janF/i;
      }
    });
    console.log(jan);
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
  public ratingChartLabels: Label[] = ['Jan','Feb','Jul','Aug','Sept','Oct','Nov','Dec'];
  public ratingChartType: ChartType = 'line';
  public ratingChartLegend = true;
  public ratingChartData: ChartDataSets[] = [
    { backgroundColor: '',
      data: [3, 4, 4, 3, 1, 3, 1,5], label: 'SuperDeliverMan' }
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
  public deliveryChartLabels: Label[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
  public deliveryChartType: ChartType = 'line';
  public deliveryChartLegend = true;
  public deliveryChartData: ChartDataSets[] = [
    { backgroundColor: '',
      data: [30, 24, 14, 33, 13, 13, 12], label: 'Ayush' }
  ];

  public randomizeDelivery(): void {
    this.deliveryChartType = this.deliveryChartType === 'bar' ? 'line' : 'bar';
  }

}
