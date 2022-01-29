// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class InspectionService {

//   constructor() { }
// }
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Inspection, InspectionType, StatusType } from '../interface/inspection.model';

@Injectable({
  providedIn: 'root'
})
export class InspectionService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',  "Access-Control-Allow-Origin": "*", 'Accept': 'application/json'})
  };
  constructor(private http: HttpClient) { }
    readonly apiUrl = "https://localhost:7247/api"
    /** GET inspection from the server */
    getInspectionList(): Observable<Inspection[]> {
      return this.http.get<Inspection[]>(`${this.apiUrl}/inspections`, this.httpOptions)
    }

    addInspection(data: Inspection|any){
      data.id = 0;
      return this.http.post(`${this.apiUrl}/inspections`, data, this.httpOptions)
    }

    updateInspection(id:number|string, data: Inspection){
      return this.http.put(`${this.apiUrl}/inspections/${id}`, data, this.httpOptions)
    }

    deleteInspection(id:number){    
      return this.http.delete(`${this.apiUrl}/inspections/${id}`,this.httpOptions)
    }

    getInspectionTypeList(): Observable<InspectionType[]> {
      return this.http.get<InspectionType[]>(`${this.apiUrl}/inspectiontypes`, this.httpOptions)
    }

    getStatusList(): Observable<StatusType[]> {
      return this.http.get<StatusType[]>(`${this.apiUrl}/status`, this.httpOptions)
    }

}