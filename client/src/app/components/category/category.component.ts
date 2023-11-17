import { Component, inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PhrasesService } from 'src/app/services/phrases.service';
import { ICategory } from 'src/app/models/category';
import { ResultService } from 'src/app/services/result.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {
  private router = inject(Router);

  @Input() public category: ICategory;

  constructor(
    private phrasesService: PhrasesService,
    private resultService: ResultService
  ) { }

  start(category: string): void {
    this.resultService.clearScore();
    this.phrasesService.getPhrases(category).subscribe(() => {
      this.router.navigate(['card'], { skipLocationChange: true });
    });
  }
}
