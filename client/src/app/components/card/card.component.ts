import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { IPhrase } from 'src/app/models/phrase';
import { PhrasesService } from 'src/app/services/phrases.service';
import { ResultService } from 'src/app/services/result.service';
import { ElementRef } from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @ViewChild('answerInputRef') answerInputRef: ElementRef;
  @ViewChild('nextBtnRef') nextBtnRef: ElementRef;

  public nextDisabled: boolean = true;

  public id: number = 1;
  public phrase: IPhrase | undefined;
  public plPhrase: string;
  public translations: string[];
  public categories: string[];
  public correct: boolean | undefined;
  public total: number = 0;

  public faXmark = faXmark;

  public answerForm = new FormGroup({
    answerInput: new FormControl()
  });

  constructor(
    private phrasesService: PhrasesService,
    private resultService: ResultService
  ) {}

  ngOnInit() {
    // clear previous data and get actual
    this.clearData();
    this.getData();
  }

  ngAfterViewInit() {
    // focus on input after render data
    this.answerInputRef.nativeElement.focus();
  }

  // clear card function
  clearData(): void {
    this.phrase = undefined;
    this.plPhrase = '';
    this.translations = [];
    this.categories = [];
    this.correct = undefined;

    this.answerForm.enable();
    this.answerForm.reset();
  }

  // get actual data function
  getData(): void {
    // get phrase
    this.phrase = this.phrasesService.getPhraseById(this.id);

    // get total phrases number
    this.phrasesService.phrasesAmount$.subscribe((total) => {
      this.total = total;
    });

    // assign phrase and answers to local variables
    if (this.phrase) {
      this.plPhrase = this.phrase.pl;
      this.phrase.en.forEach((engPhrase) => {
        this.translations.push(engPhrase);
      });
      this.phrase.categories.forEach((category) => {
        this.categories.push(category);
      });
    } else {
      alert('Error, please reload app and try again.');
    }
  }

  // check answer function
  check(): void {
    // check if answer is correct
    this.correct = this.phrasesService.checkTheCorrectness(
      this.answerForm.value.answerInput,
      this.translations
    );

    // enable and focus on next button
    this.nextDisabled = false;
    setTimeout(() => this.nextBtnRef.nativeElement.focus());

    // disable form
    if (this.correct !== undefined) this.answerForm.disable();

    // add point if answer is correct
    if (this.correct === true) this.resultService.incrementScore();
  }

  // next phrase function
  next(): void {
    if (this.id < this.total) {
      // clear data and prepare new card
      this.id = this.id + 1;
      this.clearData();
      this.getData();
      this.nextDisabled = true;
      this.answerInputRef.nativeElement.focus();
    } else {
      // open modal with result when no phrases left
      this.resultService.openModal();
    }
  }
}
