// Home component unit test

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { HomeComponent } from './home.component';
import { ICategoriesHttpResponse } from 'src/app/models/http-responses';
import { ICategory } from 'src/app/models/category';
import { mockCategories } from 'src/tests/__mocks__/mockCategories';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let httpMock: HttpTestingController;

  // mock API response
  const mockResponse: ICategoriesHttpResponse = {
    status: 200,
    message: 'ok',
    categories: mockCategories
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [        
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    }).compileComponents();

    // create component
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;

    // inject mock HTTP controller
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch categories on init', () => {
    // trigger ngOnInit which calls getCategories
    component.ngOnInit();

    // mock GET request and response
    const request = httpMock.expectOne('api/get-categories');
    request.flush(mockResponse);

    // subscribe to categories$ and check received data
    component.categories$.subscribe((data: ICategory[]) => {
      expect(data.length).toBe(mockResponse.categories.length);
    });
  });
});
