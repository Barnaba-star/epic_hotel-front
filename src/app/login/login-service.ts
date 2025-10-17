import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from '../Utils/models/responces';
import { DataDTO } from './data';
import { environment } from '../Utils/enviroments/environment';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
constructor(private http:HttpClient){}
  private base = environment.baseApiUrl;
  private baseUrl: string = `${this.base}/authentication`;

changePassword(dataDTO:DataDTO):Observable<Response<any>>{
  return this.http.post<Response<any>>(`${this.baseUrl}/changePassword`, dataDTO);
}
}
