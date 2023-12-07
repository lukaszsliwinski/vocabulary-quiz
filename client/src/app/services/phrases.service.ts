import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';

import { IPhrasesHttpResponse } from '../models/http-responses';
import { IPhrase } from '../models/phrase';

@Injectable({
  providedIn: 'root'
})
export class PhrasesService {
  private randomPhrases = new BehaviorSubject<IPhrase[]>([]);
  private phrasesAmount = new BehaviorSubject<number>(0);

  public randomPhrases$ = this.randomPhrases.asObservable();
  public phrasesAmount$ = this.phrasesAmount.asObservable();

  constructor(private http: HttpClient) {}

  // get phrases from api by category
  getPhrases(category: string): Observable<IPhrasesHttpResponse> {
    return this.http.post<IPhrasesHttpResponse>('api/get-phrases', { category: category }).pipe(
      tap((result) => {
        this.randomPhrases.next(result.phrases);
        this.phrasesAmount.next(result.phrases.length);
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }

  // get phrase by id from local list
  getPhraseById(id: number): IPhrase | undefined {
    const phrase = this.randomPhrases.value.find((phrase) => phrase.id === id);
    return phrase;
  }

  // check if the answer is in the list of correct answers
  checkTheCorrectness(input: string, translations: string[]): boolean {
    // remove all white spaces and uppercases from input string
    const formatted = input?.trim().replace(/\s+/g, ' ').toLowerCase();
    return translations.includes(formatted);
  }
}
