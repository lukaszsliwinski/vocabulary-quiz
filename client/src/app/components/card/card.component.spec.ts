// Card component unit test

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CardComponent } from './card.component';
import { PhrasesService } from 'src/app/services/phrases.service';
import { ResultService } from 'src/app/services/result.service';
import { IPhrase } from 'src/app/models/phrase';
import { ElementRef } from '@angular/core';
import { of } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let phrasesSpy: jasmine.SpyObj<PhrasesService>;
  let resultSpy: jasmine.SpyObj<ResultService>;

  const mockPhrase: IPhrase = {
    id: 6,
    pl: 'miedź',
    en: [ 'copper' ],
    categories: [ 'nouns', 'technical' ]
  };

  beforeEach(async () => {
    phrasesSpy = jasmine.createSpyObj('PhrasesService', ['getPhraseById', 'checkTheCorrectness'], {
      phrasesAmount$: of(1)
    });
    phrasesSpy.getPhraseById.and.returnValue(mockPhrase);
    resultSpy = jasmine.createSpyObj('ResultService', ['incrementScore', 'openModal']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FontAwesomeModule],
      declarations: [CardComponent],
      providers: [
        { provide: PhrasesService, useValue: phrasesSpy },
        { provide: ResultService, useValue: resultSpy }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;

    // mock ElementRef for ViewChild
    component.answerInputRef = { nativeElement: { focus: jasmine.createSpy() } } as ElementRef;
    component.nextBtnRef = { nativeElement: { focus: jasmine.createSpy() } } as ElementRef;
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should get data and assign phrase', () => {
    component.clearData();
    component.getData();
    expect(component.plPhrase).toBe('miedź');
    expect(component.translations).toEqual(['copper']);
    expect(component.total).toBe(1);
  });

  it('should check correct answer and increment score', () => {
    phrasesSpy.checkTheCorrectness.and.returnValue(true);
    component.translations = ['copper'];
    component.answerForm.controls['answerInput'].setValue('copper');
    component.check();

    expect(component.correct).toBeTrue();
    expect(component.nextDisabled).toBeFalse();
    expect(resultSpy.incrementScore).toHaveBeenCalled();
  });

  it('should go to next phrase or open modal', () => {
    component.total = 1;
    component.id = 1;
    component.next();
    expect(resultSpy.openModal).toHaveBeenCalled();
  });
});
