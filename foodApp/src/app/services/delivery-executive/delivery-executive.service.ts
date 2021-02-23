import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeliveryExecutiveService {

  constructor(private http: HttpClient) { }
  url = 'http://localhost:3000';
  getOrders():Observable<any>{
    return this.http.get<any>(this.url+"/orders");
  }
  getRestaurantById(id:any):Observable<any>{
    return this.http.get<any>(this.url+"/getRestaurantById/"+id);
  }
  acceptOrder(oId:any,dId:any):Observable<any>{
    let body = {
      "dId":dId
    };
    return this.http.patch<any>(this.url+"/accept-order/"+oId,body)
  }
  doneOrder(oId:any):Observable<any>{
    let body = {'orderDateAndTime':Date.now()};
    return this.http.patch<any>(this.url+"/done-order/"+oId,body)
  }
  activeOrders(dId:any):Observable<any>{
    return this.http.get<any>(this.url+"/active-orders/"+dId);
  }
  deliveredOrders(dId:any):Observable<any>{
    return this.http.get<any>(this.url+"/delivered-orders/"+dId);
  }
  getRatings(dId:any):Observable<any>{
    return this.http.get<any>(this.url+"/getRatings/"+dId);
  }
  getUserById(id:any):Observable<any>{
    return this.http.get<any>(this.url+"/getUserById/"+id);
  }
  getRecent(id:any):Observable<any>{
    return this.http.get<any>(this.url+"/recent-orders/"+id);
  }
  updateDe(dId:any,data:any):Observable<any>{
    return this.http.put<any>(this.url+"/update-de/"+dId,data)
  }
}
