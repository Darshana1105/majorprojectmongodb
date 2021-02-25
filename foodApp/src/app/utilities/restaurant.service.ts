import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Food } from '../interfaces/food';
import { Restaurant } from '../interfaces/restaurant';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  baseUrl: string = 'http://localhost:3000/';

  constructor(private httpClient: HttpClient) { }

  getTopRestaurants():Observable<Array<Restaurant>> {
  //  let queryParam = new HttpParams({fromString:"id=602ca48cf2697638d43f4f11"});
    // queryParam.append("id",'602ca48cf2697638d43f4f11');

    return this.httpClient.get<any>(this.baseUrl + 'topRestaurants');
    // return this.httpClient.get(this.baseUrl + 'getRestaurantById',{params:queryParam});
  }

  getTopFoods():Observable<Array<Food>>{

    return this.httpClient.get<any>(this.baseUrl + 'topFoods');
  }
  acceptOrder(oId:any):Observable<any>{
    let body = {
      status:"accepted-ro"
    };
    return this.httpClient.patch<any>(this.baseUrl+"/accept-order-ro/"+oId,body)
  }
}
