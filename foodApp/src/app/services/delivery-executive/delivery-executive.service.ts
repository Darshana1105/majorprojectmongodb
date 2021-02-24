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
      "dId":dId,
      "status":status
    };
    return this.http.patch<any>(this.url+"/accept-order/"+oId,body)
  }
  orderStatus(oId:any,status:string):Observable<any>{
    let body = {'orderDateAndTime':Date.now(),'status':status};
    return this.http.patch<any>(this.url+"/order-status/"+oId,body)
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
  sendMail(eid:any,status:any,order:any):Observable<any>{
    let body = order;
    console.log(body)
    return this.http.post<any>(this.url+"/send-mail/"+eid+"/"+status,body);
  }
  updateDe(dId:any,data:any):Observable<any>{
    return this.http.put<any>(this.url+"/update-de/"+dId,data)
  }
}
