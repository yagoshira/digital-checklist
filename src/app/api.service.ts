import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private url: string = "https://cevalogsv.com/meli/digital-checklist/api/";
  constructor(private http: HttpClient) {

  }

  postChecklist(request: any) {
    var response = this.http.post(`${this.url}finish.php`, request)
    return response
  }
}