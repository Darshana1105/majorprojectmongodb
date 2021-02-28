import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  baseUrl:string = "http://localhost:3000/";  
  orderOb:BehaviorSubject<any>=new BehaviorSubject(null);
  orderData: any ;
  constructor(private http: HttpClient) {
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
      console.log(">>>>>>",data);
      
      this.orderData=data;
      this.orderOb.next(this.orderData);

    });
  }


  addOrder(orderLocation:any):Observable<any>{
    let userId:any="603ba4cbebcc8c5ffba639da"
    let queryParam = new HttpParams({fromString:"userId="+userId+'&role=user'});
    return this.http.post<any>(this.baseUrl+'addOrder',orderLocation,{params:queryParam});
  }

  getOrders():Observable<any>{
    let userId:any="603ba4cbebcc8c5ffba639da";
    let queryParam = new HttpParams({fromString:"userId="+userId+'&role=user'});
    return this.http.get<any>(this.baseUrl+'userOrders',{params:queryParam});
  }


  addFoodRating(ratingData:any):Observable<any>{
    let userId:any="603ba4cbebcc8c5ffba639da"
    let queryParam = new HttpParams({fromString:"userId="+userId+'&role=user'});
    return this.http.put<any>(this.baseUrl+'addFoodRating',ratingData,{params:queryParam})
  }
  
  addDeRating(ratingData:any):Observable<any>{
    let userId:any="603ba4cbebcc8c5ffba639da"
    let queryParam = new HttpParams({fromString:"userId="+userId+'&role=user'});
    return this.http.put<any>(this.baseUrl+'addDeRating',ratingData,{params:queryParam});
  }

}
