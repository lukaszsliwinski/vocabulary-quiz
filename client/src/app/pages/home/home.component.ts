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
  public types = ['verbs', 'phrasal verbs', 'nouns', 'adjectives', 'phrases', 'idioms'];

  constructor(private http: HttpClient) {}

  // get categories on app init
  ngOnInit() {
    this.getCategories().subscribe();
  }

  // get categories from api
  getCategories(): Observable<ICategoriesHttpResponse> {
    return this.http.get<ICategoriesHttpResponse>('api/get-categories').pipe(
      tap((result) => {
        let data: ICategory[] = result.categories;
        const otherCategory = data.find((obj) => obj._id === 'other');

        if (otherCategory) data.push(data.splice(data.indexOf(otherCategory), 1)[0]);
        this.categories.next(data);
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }
}
