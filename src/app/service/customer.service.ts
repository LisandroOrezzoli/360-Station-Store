import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from 'src/model/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  baseUrl:string = "http://localhost:8080/api/v2/";

  constructor(private http:HttpClient) {} 

  getAll() : Observable<any>{
    return this.http.get(this.baseUrl + "all");
  }

  save(customer: Customer): Observable<any>{
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.post(this.baseUrl +"save", JSON.stringify(customer), {headers: headers});
  }

  delete(id?: number |null) : Observable<any>{
    return this.http.get(this.baseUrl + "delete/"+id);
  }

}