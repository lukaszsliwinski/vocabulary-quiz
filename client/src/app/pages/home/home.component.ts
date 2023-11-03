import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';

import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PhrasesService } from 'src/app/services/phrases.service';
import { ICategoriesHttpResponse } from 'src/app/models/http-responses';
import { ResultService } from 'src/app/services/result.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private router = inject(Router);

  private categories = new BehaviorSubject<string[]>([]);

  public categories$ = this.categories.asObservable();

  constructor(
    private http: HttpClient,
    private phrasesService: PhrasesService,
    private resultService: ResultService
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

  start(category: string): void {
    this.resultService.clearScore();
    this.phrasesService.getPhrases(category).subscribe(() => {
      this.router.navigate(['card'], { skipLocationChange: true });
    });
  }
}
