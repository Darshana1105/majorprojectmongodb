import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionService } from '../session.service';

@Injectable({
  providedIn: 'root'
})
export class DeliveryExecutiveService {

  constructor(private http: HttpClient, private _sessionService: SessionService) { }
  url = 'http://localhost:3000';
  getOrders(): Observable<any> {
    return this.http.get<any>(this.url + "/orders");
  }
  getRestaurantById(id: any): Observable<any> {
    return this.http.get<any>(this.url + "/getRestaurantById/" + id);
  }

  getHeader(): HttpHeaders {
    let token = this._sessionService.getJWTToken();
    console.log(token);
    let bearer = `Bearer ${token}`;
    
    
    let headers = new HttpHeaders().set("Authorization",bearer );
    return headers;
  }

  acceptOrder(oId: any, otp: number, email: any): Observable<any> {
    // let userId: any = "602a4a5214315c2a00e234af";

    let body = {
      "otp": otp,
      "uemail": email
    };
    return this.http.patch<any>(this.url + "/accept-order-de/" + oId, body, { headers: this.getHeader() })
  }

  orderStatus(oId: any, status: string): Observable<any> {
    let body = { 'orderDateAndTime': Date.now(), 'status': status };
    return this.http.patch<any>(this.url + "/order-status/" + oId, body,{headers:this.getHeader()})
  }

  activeOrders(): Observable<any> {

    return this.http.get<any>(this.url + "/active-orders", { headers: this.getHeader() });
  }

  deliveredOrders(): Observable<any> {
    return this.http.get<any>(this.url + "/delivered-orders", { headers: this.getHeader() });
  }

  getRatings(): Observable<any> {
    return this.http.get<any>(this.url + "/getRatings", { headers: this.getHeader() });
  }

  getUserById(): Observable<any> {

    return this.http.get<any>(this.url + "/getUserById", { headers: this.getHeader() });
  }

  getRecent(): Observable<any> {
    return this.http.get<any>(this.url + "/recent-orders", { headers: this.getHeader() });
  }

  sendMail(eid: any, status: any, order: any): Observable<any> {
    let body = order;
    console.log(body)
    return this.http.post<any>(this.url + "/send-mail/" + eid + "/" + status, body);
  }

  updateDe(data: any): Observable<any> {
    return this.http.put<any>(this.url + "/update-de", data, { headers: this.getHeader() })
  }

  getOrdersByRes(id: any): Observable<any> {
    return this.http.get<any>(this.url + "/get-orders-res/" + id);
  }
}
