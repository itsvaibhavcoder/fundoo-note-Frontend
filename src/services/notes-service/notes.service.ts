import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '../http-service/http.service';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private http: HttpService) {}
  getNotesApiCall(endPoint: string){
    return this.http.getApiCall(endPoint);
  }
}
