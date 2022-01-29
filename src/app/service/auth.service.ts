import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Inspection, InspectionType, StatusType } from '../interface/inspection.model';
import { AuthResponse } from '../interface/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',  "Access-Control-Allow-Origin": "*", 'Accept': 'application/json'})
  };

  userData: Subject<any> = new Subject<any>();

  constructor(private http: HttpClient) { }
  readonly apiUrl = "https://localhost:7247/api";

    loginUser(email: string, password: string){
      let data = {
        email,
        password
      }
      return this.http.post(`${this.apiUrl}/auth/login`, data, this.httpOptions)
    }

    registerUser(user_name: string, email: string, password: string){
      let data = {
        user_name,
        email,
        password
      }
      return this.http.post(`${this.apiUrl}/auth/register`, data, this.httpOptions)
    }

    getSessionInfo(): Observable<any>  {
      var token = localStorage.getItem("key_token");
      let data = {
        token: token,
      }
      return this.http.post(`${this.apiUrl}/auth/sessioninfo`, data, this.httpOptions)
      // .pipe(
      //   tap(_ => this.log("session get")),
      //   catchError(this.handleError<any>('updateHero')))
    }

    private log(message: string) {
      console.log(`Auth Service: ${message}`)
      // this.messageService.add(`HeroService: ${message}`);
    }
    /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
}
















