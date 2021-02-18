import { NONE_TYPE } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';


@Component({
  selector: 'app-search-location',
  templateUrl: './search-location.component.html',
  styleUrls: ['./search-location.component.scss']
})

export class SearchLocationComponent implements OnInit {

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
  public ratingChartLabels: Label[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
  public ratingChartType: ChartType = 'line';
  public ratingChartLegend = true;
  public ratingChartData: ChartDataSets[] = [
    { backgroundColor: '',
      data: [3, 4, 4, 3, 1, 3, 1,5], label: 'Ayush' }
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

  ngOnInit(){}


}
