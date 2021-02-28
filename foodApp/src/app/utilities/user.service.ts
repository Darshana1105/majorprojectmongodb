import { HttpClient, HttpParams } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl:string = "http://localhost:3000/";  
  userOb:BehaviorSubject<any>=new BehaviorSubject(null);
  userData: any ;
  constructor(private http: HttpClient) {
  }

   getUser():Observable<any>{
    if(this.userData==undefined)
    {
      this.updateUserDataLocal();
    }
        return this.userOb.asObservable();
  }

  // async getUser(): Promise<any>{
   
  //   if(this.userData==undefined){
  //       await this.updateUserDataLocal();
  //   }
  //   return this.userData;
  // }

  getUserById(id:any):Observable<any>{
    
    let queryParam = new HttpParams({fromString:"id="+id});

    return this.http.get<any>(this.baseUrl+"getUserById",{params:queryParam});
  }

  updateUserDataLocal(){
    let userId: any = "603ba4cbebcc8c5ffba639da";
    this.getUserById(userId).subscribe((data)=>{

      this.userData=data.user;
      this.userOb.next(this.userData);
    });
  }
  // async updateUserDataLocal():Promise<any>{
  //   let userId: any = "603ba4cbebcc8c5ffba639da";
  //   let temp=await this.getUserById(userId).toPromise();
  //   this.userData=temp.user;
  // }

  incrementCartItem(foodItem:any):Observable<any>{
    let userId: any = "603ba4cbebcc8c5ffba639da";
    let queryParam = new HttpParams({fromString:"userId="+userId+'&role=user'});
    return this.http.put<any>(this.baseUrl+'addToCart',foodItem,{params:queryParam});
  }
  
  
  decrementCartItem(foodItem:any):Observable<any>{
    let userId: any = "603ba4cbebcc8c5ffba639da";
    let queryParam = new HttpParams({fromString:"userId="+userId+'&role=user'});
    return this.http.put<any>(this.baseUrl+'reduceCartItem',foodItem,{params:queryParam});
  }

  removeItem(foodItem:any):Observable<any>{
    let userId: any = "603ba4cbebcc8c5ffba639da";
    let queryParam = new HttpParams({fromString:"userId="+userId+'&role=user'});
    return this.http.put<any>(this.baseUrl+'removeItem',foodItem,{params:queryParam});
  }

  clearCart():Observable<any>{
    let userId:any="603ba4cbebcc8c5ffba639da"
    let queryParam = new HttpParams({fromString:"userId="+userId+'&role=user'});
    return this.http.put<any>(this.baseUrl+'clearCart',null,{params:queryParam});
  }
  
  
  

}
