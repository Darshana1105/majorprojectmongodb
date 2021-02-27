import { HttpClient, HttpParams ,HttpHeaders} from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SessionService } from './session.service';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl:string = "http://localhost:3000/";  
  userOb:BehaviorSubject<any>=new BehaviorSubject(null);
  userData: any ;
  constructor(private http: HttpClient, private _sessionService: SessionService) {
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

  getUserById(): Observable<any> {
    let token = this._sessionService.getJWTToken();
    console.log(token);
    let bearer = `Bearer ${token}`;
    
    
    let headers = new HttpHeaders().set("Authorization",bearer );
    // headers.append("Authorization", "Bearer " + token)
    // let queryParam = new HttpParams({fromString:"id="+id});

    return this.http.get<any>(this.baseUrl + "getUserById", { headers: headers });
  }

  updateUserDataLocal() {
    // let userId: any = "602a4a5214315c2a00e234af";
    if (this._sessionService.checkSession()) {
      this.getUserById().subscribe((data) => {
          console.log(data);
          
        this.userData = data.user;
        this.userOb.next(this.userData);
      });
    }
  }
  // async updateUserDataLocal():Promise<any>{
  //   let userId: any = "602a4a5214315c2a00e234af";
  //   let temp=await this.getUserById(userId).toPromise();
  //   this.userData=temp.user;
  // }

  incrementCartItem(foodItem: any): Observable<any> {
    // let userId: any = "602a4a5214315c2a00e234af";
    let token = this._sessionService.getJWTToken();
    let headers = new HttpHeaders();
    headers.set("Authorization", "Bearer " + token);
    // let queryParam = new HttpParams({fromString:"userId="+userId+'&role=user'});
    return this.http.put<any>(this.baseUrl + 'addToCart', foodItem, { headers: headers });
  }

  
  
  userLogin(user: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'login', user);
  }

  sendOtpForResetPassword(email:any):Observable<any>{
    let body={
      email: email
    }
    return this.http.post<any>(this.baseUrl+'sendOtpForResetPassword',body);
  }

  resetPassword(newData:any):Observable<any>{
    return this.http.put<any>(this.baseUrl+'resetPassword',newData);
  }

  addUser(userData: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'addUser', userData);
  }

  decrementCartItem(foodItem:any):Observable<any>{
    let token = this._sessionService.getJWTToken();
    let headers = new HttpHeaders();
    headers.set("Authorization", "Bearer " + token);
    
    return this.http.put<any>(this.baseUrl+'reduceCartItem',foodItem,{headers:headers});
  }

  removeItem(foodItem:any):Observable<any>{
    let token = this._sessionService.getJWTToken();
    let headers = new HttpHeaders();
    headers.set("Authorization", "Bearer " + token);
    
    
    return this.http.put<any>(this.baseUrl+'removeItem',foodItem,{headers:headers});
  }

  clearCart():Observable<any>{
    let token = this._sessionService.getJWTToken();
    let headers = new HttpHeaders();
    headers.set("Authorization", "Bearer " + token);
    return this.http.put<any>(this.baseUrl+'clearCart',null,{headers:headers});
  }
}
