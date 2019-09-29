import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = 'http://localhost:8000/api/kitchens/';
  headers = new HttpHeaders({ // headers for specific authorization [getting them items]
    'Content-Type': 'application/json',
    Authorization : 'Token val'
  });

  private _tempKitchens = ['Burger King', 'Wendys', 'White Castle'];

  constructor(private httpClient: HttpClient) { }

  getKitchens(){
    return this.httpClient.get(this.baseUrl/*, {headers: this.headers}*/);
  }
}
