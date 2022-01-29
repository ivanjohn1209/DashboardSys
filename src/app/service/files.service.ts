import { Observable, of, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilesService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',  "Access-Control-Allow-Origin": "*", 'Accept': 'application/json'})
  };
 
  constructor(private http: HttpClient) { }
  readonly apiUrl = "https://localhost:7247/api";

  uploadFile(file: any , ref_assignto: string): Observable<any>{
    var formData: FormData = new FormData();
    formData.append("files", file);
    formData.append("ref_assignto", ref_assignto);
    return this.http.post<any>(`${this.apiUrl}/files/upload`, formData)
  }
  getFileList(ref_assignto: string): Observable<any[]> {
    let data = {
      ref_assignto
    }
    return this.http.post<any[]>(`${this.apiUrl}/files/list`, data, this.httpOptions)
  }
  deleteFile(ref_assignto: string, ref_file: string): Observable<string> {
    let data = {
      ref_assignto,
      ref_file
    }
    return this.http.post<string>(`${this.apiUrl}/files/delete`, data, this.httpOptions)
  }
}
