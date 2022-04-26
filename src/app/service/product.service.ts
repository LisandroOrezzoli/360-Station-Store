import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baserUrl:string = "http://localhost:8080/api/v3/"

  constructor(private http:HttpClient) { }

  getAll(): Observable<any>{
    return this.http.get(this.baserUrl +"all")
  }

  save(product: Product): Observable<any>{
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.post(this.baserUrl +"save", JSON.stringify(product), {headers: headers});
  }

  delete(id?: number |null) : Observable<any>{
    return this.http.get(this.baserUrl + "delete/"+id);
  }
}