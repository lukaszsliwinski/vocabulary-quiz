import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResultService {
  private score = new BehaviorSubject<number>(0);

  public score$ = this.score.asObservable();

  constructor() { }

  incrementScore(): void {
    this.score.next(this.score.value + 1)
  }

  clearScore(): void {
    this.score.next(0);
  }
}
