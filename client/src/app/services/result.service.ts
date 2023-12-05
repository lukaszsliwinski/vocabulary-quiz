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

  incrementScore(): void {
    this.score.next(this.score.value + 1)
  }

  clearScore(): void {
    this.score.next(0);
  }

  getScore(): number {
    return this.score.value;
  }

  openModal(): void {
    this.isOpen.next(true);
  }

  closeModal(): void {
    this.isOpen.next(false);
    this.router.navigate(['/']);
  }
}
