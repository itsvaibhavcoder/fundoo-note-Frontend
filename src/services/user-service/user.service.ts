import { Injectable } from '@angular/core';
import { HttpService } from '../http-service/http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private htttpService: HttpService) { }
  loginSignUpApiCall(endPoint:string, payload:any){
     return this.htttpService.postApiCall(endPoint, payload)
  }
}
