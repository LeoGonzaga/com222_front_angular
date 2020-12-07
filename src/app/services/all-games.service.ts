import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import API from '../API.js';
@Injectable({
  providedIn: 'root',
})
export class AllGamesService {
  constructor(private httpClient: HttpClient) {}
  url = 'https://cors-anywhere.herokuapp.com/' + API;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getAllProducts(): Observable<any[]> {
    return this.httpClient
      .get<any[]>(this.url + '/games')
      .pipe(retry(2), catchError(this.handleError));
  }

  getGamesInConsole(platform): Observable<any[]> {
    console.log(this.url + '/games/topRated?conso=' + platform);
    return this.httpClient
      .get<any[]>(this.url + '/games/topRated?conso=' + platform)

      .pipe(retry(2), catchError(this.handleError));
  }

  getReviews(name): Observable<any[]> {
    console.log(this.url + '/reviews/' + name);
    return this.httpClient
      .get<any[]>(this.url + '/reviews/?name=' + name, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  search(conso): Observable<any[]> {
    console.log(this.url + '/games/complete');
    return this.httpClient
      .post<any[]>(
        this.url + '/games/complete',
        JSON.stringify({
          conso: conso,
        }),
        this.httpOptions
      )
      .pipe(retry(2), catchError(this.handleError));
  }
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage =
        `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
