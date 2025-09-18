// Home component integration test

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { By } from '@angular/platform-browser';
import { mockCategories } from 'src/tests/__mocks__/mockCategories';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('HomeComponent (integration)', () => {
  let fixture: ComponentFixture<HomeComponent>;
  let component: HomeComponent;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [        
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should load and render categories', () => {
    fixture.detectChanges();

    // expect one HTTP request
    const request = httpMock.expectOne('api/get-categories');
    expect(request.request.method).toBe('GET');
    request.flush({ categories: mockCategories });


    // check if <app-category> elements are rendered
    const categories = fixture.debugElement.queryAll(By.css('app-category'));
    expect(categories.length).toBe(mockCategories.length);

    // check if last category is "other"
    expect(component['categories'].value.slice(-1)[0]._id).toBe('other');
  });
});
