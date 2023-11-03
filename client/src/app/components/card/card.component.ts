import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { IPhrase } from 'src/app/models/phrase';
import { PhrasesService } from 'src/app/services/phrases.service';
import { ResultService } from 'src/app/services/result.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  private router =  inject(Router);

  public nextDisabled: boolean = true;

  public id: number = 1;
  public phrase: IPhrase | undefined;
  public plPhrase: string;
  public translations: string[];
  public categories: string[];
  public correct: boolean | undefined;
  public total: number = 0;

  public answerForm = new FormGroup({
    answerInput: new FormControl()
  });

  constructor(
    private phrasesService: PhrasesService,
    private resultService: ResultService
  ) {}

  ngOnInit() {
    this.clearData();
    this.getData()
  }

  clearData(): void {
    this.phrase = undefined;
    this.plPhrase = '';
    this.translations = [];
    this.categories = [];
    this.correct = undefined;

    this.answerForm.enable();
    this.answerForm.reset();
  }

  getData(): void {
    this.phrase = this.phrasesService.getPhraseById(this.id);
    this.phrasesService.phrasesAmount$.subscribe((total) => {
      this.total = total;
    })

    if (this.phrase) {
      this.plPhrase = this.phrase.pl;
      this.phrase.en.forEach((engPhrase) => {
        this.translations.push(engPhrase);
      })
      this.phrase.categories.forEach((category) => {
        this.categories.push(category);
      })
    } else if (this.id > this.total) {
      alert(`Your result: ${this.resultService.score$} / ${this.total}`);
      this.router.navigate(['/']);
    } else {
      alert('Error, please reload app and try again.');
    }
  }

  check(): void {
    this.correct = this.phrasesService.checkTheCorrectness(this.answerForm.value.answerInput, this.translations);
    this.nextDisabled = false;
    if (this.correct !== undefined) this.answerForm.disable();
    if (this.correct === true) this.resultService.incrementScore();

  }

  next(): void {
    this.id = this.id + 1;
    this.clearData();
    this.getData();
    this.nextDisabled = true;
  }
}
