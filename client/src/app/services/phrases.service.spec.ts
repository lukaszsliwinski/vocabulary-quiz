// Phrases service unit test

import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { PhrasesService } from './phrases.service';
import { IPhrase } from '../models/phrase';
import { provideHttpClient } from '@angular/common/http';

describe('PhrasesService', () => {
  let service: PhrasesService;

  const mockPhrases: IPhrase[] = [
    { id: 1, pl: 'lakierować', en: ['varnish'], categories: ['nouns', 'technical'] },
    { id: 2, pl: 'zaklinowany', en: ['jammed', 'stucked'], categories: ['adjectives', 'technical'] },
    { id: 3, pl: 'słup energetyczny', en: ['pylon'], categories: ['nouns', 'technical'] },
    { id: 4, pl: 'imbus', en: ['allan key'], categories: ['nouns', 'technical'] },
    { id: 5, pl: 'rowek', en: ['groove'], categories: ['nouns', 'technical'] },
    { id: 6, pl: 'miedź', en: ['copper'], categories: ['nouns', 'technical'] },
    { id: 7, pl: 'asfalt', en: ['tarmac'], categories: ['nouns', 'technical'] },
    { id: 8, pl: 'opony', en: ['tyres'], categories: ['nouns', 'technical'] },
    { id: 9, pl: 'gniazdko', en: ['socket', 'outlet'], categories: ['nouns', 'technical'] },
    { id: 10, pl: 'cyna', en: ['tin'], categories: ['nouns', 'technical'] },
  ];

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
