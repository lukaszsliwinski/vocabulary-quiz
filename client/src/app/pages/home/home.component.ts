import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';

import { Component, OnInit } from '@angular/core';
import { ICategory } from 'src/app/models/category';
import { ICategoriesHttpResponse } from 'src/app/models/http-responses';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private categories = new BehaviorSubject<ICategory[]>([]);

  public categories$ = this.categories.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.getCategories().subscribe();
  }

  getCategories(): Observable<ICategoriesHttpResponse> {
    return this.http.get<ICategoriesHttpResponse>('api/get-categories')
      .pipe(
        tap((result) => {
          this.categories.next(result.categories);
        }),
        catchError((error: HttpErrorResponse) => {
          return throwError(() => error);
        })
      );
  };
}
