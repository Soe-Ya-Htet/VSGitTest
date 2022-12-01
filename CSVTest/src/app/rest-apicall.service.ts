import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestAPICallService {

  constructor(private http:HttpClient) { }

  public upload(JSONResult: string): Observable<any> {
    const url = 'http://localhost:8081/employee/upload';
    const headers = { 'content-type': 'application/json'};
    const body=JSONResult;
    console.log(body)
    console.log("Before post call.")
    return this.http.post<any>(url, body,{'headers':headers});

  }
}
