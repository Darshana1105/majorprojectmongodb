import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  baseUrl:string = "http://localhost:3000/";  
  orderOb:BehaviorSubject<any>=new BehaviorSubject(null);
  orderData: any ;
  constructor(private http: HttpClient, private _sessionService: SessionService) {
  }


  getHeader():HttpHeaders{
    let token = this._sessionService.getJWTToken();
    let bearer = `Bearer ${token}`;
    
    
    let headers = new HttpHeaders().set("Authorization",bearer );
    return headers;
  }

  getUserOrders():Observable<any>{
    if(this.orderData==undefined)
    {
      this.updateUserOrderDataLocal();
    }
        return this.orderOb.asObservable();
  }

  updateUserOrderDataLocal(){
    this.getOrders().subscribe((data)=>{
      
      this.orderData=data;
      this.orderOb.next(this.orderData);

    });
  }


  addOrder(orderLocation:any):Observable<any>{
  
    return this.http.post<any>(this.baseUrl+'addOrder',orderLocation,{headers:this.getHeader()});
  }

  getOrders():Observable<any>{
    
    return this.http.get<any>(this.baseUrl+'userOrders',{headers:this.getHeader()});
  }


  addFoodRating(ratingData:any):Observable<any>{
  
    return this.http.put<any>(this.baseUrl+'addFoodRating',ratingData,{headers:this.getHeader()})
  }
  
  addDeRating(ratingData:any):Observable<any>{
    
    return this.http.put<any>(this.baseUrl+'addDeRating',ratingData,{headers:this.getHeader()});
  }

}
