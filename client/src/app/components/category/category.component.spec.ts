// Category component unit test

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { CategoryComponent } from './category.component';
import { PhrasesService } from 'src/app/services/phrases.service';
import { ICategory } from 'src/app/models/category';

describe('CategoryComponent', () => {
  let component: CategoryComponent;
  let fixture: ComponentFixture<CategoryComponent>;

  const mockCategory: ICategory = { _id: 'technical', count: 10 };

  beforeEach(async () => {
    // create test environment
    const phrasesSpy = jasmine.createSpyObj('PhrasesService', ['getPhrases']);

    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [CategoryComponent],
      providers: [
        { provide: PhrasesService, useValue: phrasesSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryComponent);
    component = fixture.componentInstance;

    component.category = mockCategory;
    component.background = 'image';
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should assign correct icon', () => {
    component.ngOnInit();
    expect(component.icon).toBeDefined();
  });
});
