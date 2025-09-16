// Result service unit test

import { TestBed } from '@angular/core/testing';
import { ResultService } from './result.service';
import { Router } from '@angular/router';

describe('ResultService', () => {
  let service: ResultService;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        ResultService,
        { provide: Router, useValue: routerSpy }
      ]
    });

    service = TestBed.inject(ResultService);
  });

  it('should increment score', () => {
    expect(service.getScore()).toBe(0);
    service.incrementScore();
    expect(service.getScore()).toBe(1);
  });

  it('should clear score', () => {
    service.incrementScore();
    expect(service.getScore()).toBe(1);
    service.clearScore();
    expect(service.getScore()).toBe(0);
  });

  it('should open modal', (done) => {
    service.isOpen$.subscribe(isOpen => {
      if (isOpen) {
        expect(isOpen).toBeTrue();
        done();
      }
    });
    service.openModal();
  });

  it('should close modal and navigate', () => {
    service.closeModal();
    service.isOpen$.subscribe(isOpen => expect(isOpen).toBeFalse());
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
  });
});
