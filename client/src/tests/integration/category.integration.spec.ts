// Category component integration test

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { CategoryComponent } from 'src/app/components/category/category.component';
import { ICategory } from 'src/app/models/category';
import { PhrasesService } from 'src/app/services/phrases.service';
import { ResultService } from 'src/app/services/result.service';

describe('CategoryComponent (integration)', () => {
  let fixture: ComponentFixture<CategoryComponent>;
  let component: CategoryComponent;

  // mock category
  const mockCategory: ICategory = { _id: 'technical', count: 10 };

  // spies for services
  const phrasesSpy = jasmine.createSpyObj('PhrasesService', ['getPhrases']);
  phrasesSpy.getPhrases.and.returnValue(of({ phrases: [] }));
  const resultSpy = jasmine.createSpyObj('ResultService', ['clearScore']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoryComponent],
      providers: [
        { provide: PhrasesService, useValue: phrasesSpy },
        { provide: ResultService, useValue: resultSpy }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryComponent);
    component = fixture.componentInstance;

    // assign input
    component.category = mockCategory;
  });

  it('should create component', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should start quiz and call services', () => {
    fixture.detectChanges();
    component.start(mockCategory._id);

    // expect score to be cleared
    expect(resultSpy.clearScore).toHaveBeenCalled();

    // expect phrases with correct category
    expect(phrasesSpy.getPhrases).toHaveBeenCalledWith(mockCategory._id);
  });
});
