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
    return this.http.patch<any>(this.url+"/acceptOrder/"+oId,dId)
  }
  getUserById(id:any):Observable<any>{
    return this.http.get<any>(this.url+"/getUserById/"+id);
  }
}
