// Phrases service unit test

import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { PhrasesService } from './phrases.service';
import { provideHttpClient } from '@angular/common/http';
import { mockPhrases } from 'src/tests/__mocks__/mockPhrases';

describe('PhrasesService', () => {
  let service: PhrasesService;;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PhrasesService,        
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    });

    service = TestBed.inject(PhrasesService);
    (service as any).randomPhrases.next(mockPhrases);
  });

  it('should get phrase by id', () => {
    const phrase = service.getPhraseById(6);
    expect(phrase).toBeDefined();
  });

  it('should correctly check input', () => {
    expect(service.checkTheCorrectness('copper', mockPhrases.find(phrase => phrase.id === 6)!.en)).toBeTrue();
    expect(service.checkTheCorrectness('COPPER', mockPhrases.find(phrase => phrase.id === 6)!.en)).toBeTrue();
  });
});
