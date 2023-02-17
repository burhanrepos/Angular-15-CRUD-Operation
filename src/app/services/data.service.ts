import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }
  DataService_PostProduct(data:any):Observable<any>
  {
    return this.http.post<any>("http://localhost:3000/productList/",data);
  }
  DataService_GetProduct():Observable<any>
  {
    return this.http.get<any>("http://localhost:3000/productList/");
  }
  DataService_PutProduct(data:any, id:number):Observable<any>
  {
    return this.http.put<any>("http://localhost:3000/productList/"+id,data);
  }
  DataService_DeleteProduct(id:number):Observable<any>
  {
    return this.http.delete<any>("http://localhost:3000/productList/"+id);
  }
}
