import { Component } from '@angular/core';
import { PhrasesService } from 'src/app/services/phrases.service';
import { ResultService } from 'src/app/services/result.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent {
  public score$ = this.resultService.score$;
  public total$ = this.phrasesService.phrasesAmount$;

  constructor (
    private resultService: ResultService,
    private phrasesService: PhrasesService
  ) {}
}
