import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResultService {
  private router =  inject(Router);

  private score = new BehaviorSubject<number>(0);
  private isOpen = new BehaviorSubject<boolean>(false);

  public score$ = this.score.asObservable();
  public isOpen$ = this.isOpen.asObservable();

  constructor() { }

  // add point to score
  incrementScore(): void {
    this.score.next(this.score.value + 1)
  }

  // reset score
  clearScore(): void {
    this.score.next(0);
  }

  // get actual score
  getScore(): number {
    return this.score.value;
  }

  // open modal with final result
  openModal(): void {
    this.isOpen.next(true);
  }

  // close modal and back to main menu
  closeModal(): void {
    this.isOpen.next(false);
    this.router.navigate(['/']);
  }
}
