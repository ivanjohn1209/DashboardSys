import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Price } from '../interface/price';
import { IsEmpty } from '../utility/ToolFtc';

@Injectable({
  providedIn: 'root'
})
export class PriceService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',  "Access-Control-Allow-Origin": "*", 'Accept': 'application/json'})
  };
  constructor(private http: HttpClient) { }
  readonly apiUrl = "https://localhost:7247/api";

  getPriceList(ref_assignto: string): Observable<Price[]> {
    let body = {
      ref_assignto: ref_assignto
    }
    return this.http.post<Price[]>(`${this.apiUrl}/price/list`, body,this.httpOptions)
  }

  upsertPrice(price: Price): Observable<Price> {
    let body = {
      ref_assignto: price.ref_assignto,
      ref_price: IsEmpty(price.ref_price)? undefined: price.ref_price,
      price: price.price,
      currency: price.currency
    }

    let api = IsEmpty(price.ref_price) ? `${this.apiUrl}/price/add` : `${this.apiUrl}/price/update`;
    return this.http.post<Price>(api, body,this.httpOptions)
  }

  deletePrice(ref_assignto: string, ref_price: string): Observable<string> {
    let body = {
      ref_assignto: ref_assignto,
      ref_price: ref_price
    }
    return this.http.post<string>(`${this.apiUrl}/price/delete`, body,this.httpOptions)
  }
}
