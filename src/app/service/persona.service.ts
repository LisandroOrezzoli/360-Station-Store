import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Persona } from 'src/model/persona';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  baserUrl:string = "http://localhost:8080/api/v1/"

  constructor(private http:HttpClient) { }

  getAll(): Observable<any>{
    return this.http.get(this.baserUrl +"all")
  }

  save(persona: Persona): Observable<any>{
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.post(this.baserUrl +"save", JSON.stringify(persona), {headers: headers});
  }

  delete(id?: number |null) : Observable<any>{
    return this.http.get(this.baserUrl + "delete/"+id);
  }
}
