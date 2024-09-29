import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'any'
})
export class HttpService {
  private baseUrl: string =  "http://localhost:3000/api/v1/";
  getHeader(){
     return new HttpHeaders({
      'Accept': "application/json",
      Authorization: 'bearer '+localStorage.getItem('accessToken') || ""
    })
  }
   
  constructor(private http: HttpClient) { }
  
  getApiCall(endPoint:string){
    return this.http.get(this.baseUrl+endPoint, {
      headers: this.getHeader()
    })
  }
  
  postApiCall(endPoint:string, payload:any, addHeader:boolean=false){
   return this.http.post(this.baseUrl+endPoint, payload, {headers:addHeader? this.getHeader(): {} })
  }

  deleteApiCall(endPoint:string){
    return this.http.delete(this.baseUrl + endPoint,{
      headers: this.getHeader()
    })
  }

  putApiCall(endPoint: string, payload: any) {
    return this.http.put(this.baseUrl + endPoint, payload, {
      headers: this.getHeader()
    });
  }
}
