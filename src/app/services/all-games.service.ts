import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AllGamesService {
  constructor(private httpClient: HttpClient) {}
  url = 'https://cors-anywhere.herokuapp.com/https://9312639a1634.ngrok.io';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getAllProducts(): Observable<any[]> {
    return this.httpClient
      .get<any[]>(this.url + '/games')
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
