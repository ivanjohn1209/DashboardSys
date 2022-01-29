import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Inspection, InspectionType, StatusType } from '../interface/inspection.model';
import { Product, Service } from '../interface/product-services.model';
import { IsEmpty } from '../utility/ToolFtc';

@Injectable({
  providedIn: 'root'
})
export class ProductServicesService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',  "Access-Control-Allow-Origin": "*", 'Accept': 'application/json'})
  };
  constructor(private http: HttpClient) { }
  readonly apiUrl = "https://localhost:7247/api";


  getProductList(ref_assignto: string): Observable<Product[]> {
    let body = {
      ref_assignto: ref_assignto
    }
    return this.http.post<Product[]>(`${this.apiUrl}/products/list`, body,this.httpOptions)
  }

  upsertProduct(product: Product): Observable<Product> {
    let body = {
      ref_assignto: product.ref_assignto,
      ref_product: IsEmpty(product.ref_product)? undefined: product.ref_product,
      name: product.name,
      description: product.description
    }

    let api = IsEmpty(product.ref_product) ? `${this.apiUrl}/products/add` : `${this.apiUrl}/products/update`;
    return this.http.post<Product>(api, body,this.httpOptions)
  }

  deleteProduct(ref_assignto: string, ref_product: string): Observable<string> {
    let body = {
      ref_assignto: ref_assignto,
      ref_product:  ref_product
    }
    return this.http.post<string>(`${this.apiUrl}/products/delete`, body,this.httpOptions)
  }

  readProduct(ref_assignto: string, ref_product: string): Observable<Product> {
    let body = {
      ref_assignto: ref_assignto,
      ref_product:  ref_product
    }
    return this.http.post<Product>(`${this.apiUrl}/products/read`, body,this.httpOptions)
  }
  

  getServiceList(ref_assignto: string): Observable<Service[]> {
    let body = {
      ref_assignto: ref_assignto
    }
    return this.http.post<Service[]>(`${this.apiUrl}/services/list`, body,this.httpOptions)
  }

  upsertService(product: Service): Observable<Service> {
    let body = {
      ref_assignto: product.ref_assignto,
      ref_service: IsEmpty(product.ref_service)? undefined: product.ref_service,
      name: product.name,
      description: product.description
    }

    let api = IsEmpty(product.ref_service) ? `${this.apiUrl}/services/add` : `${this.apiUrl}/services/update`;
    return this.http.post<Service>(api, body,this.httpOptions)
  }

  deleteService(ref_assignto: string, ref_service: string): Observable<string> {
    let body = {
      ref_assignto: ref_assignto,
      ref_service:  ref_service
    }
    return this.http.post<string>(`${this.apiUrl}/services/delete`, body,this.httpOptions)
  }

}
