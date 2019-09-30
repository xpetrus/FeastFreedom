import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = 'http://localhost:8000/api/kitchens/';
  menuUrl = 'http://localhost:8000/api/menu/';
  // headers = new HttpHeaders({ // headers for specific authorization [getting them items]
  //   'Content-Type': 'application/json',
  //   Authorization : 'Token val'
  // });

  // private _tempKitchens = ['Burger King', 'Wendys', 'White Castle'];

  constructor(private httpClient: HttpClient) { }

  getKitchens() {
    return this.httpClient.get(this.baseUrl/*, {headers: this.headers}*/);
  }

  getMenu(id: number) {
    // console.log(this.httpClient.get(this.menuUrl));
    return this.httpClient.get(this.baseUrl + id);
  }

  getMenuItem(id: number){
    return this.httpClient.get(this.menuUrl + id);
  }

  createKitchen(kitchenData): Observable<any> {
    return this.httpClient.post('http://localhost:8000/api/kitchens/', kitchenData);
  }
}
