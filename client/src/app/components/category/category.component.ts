import { Component, inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PhrasesService } from 'src/app/services/phrases.service';
import { ICategory } from 'src/app/models/category';
import { ResultService } from 'src/app/services/result.service';

import {
  faHeartPulse,
  faMountain,
  faBriefcase,
  faGears,
  faFaceSmile,
  faCarrot,
  faClipboardQuestion,
  faCommentDots,
  IconDefinition
} from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss'],
    standalone: false
})
export class CategoryComponent implements OnInit {
  private router = inject(Router);

  @Input() public category: ICategory;
  @Input() public background: string;

  // list of categories and font awesome icons
  public icons = [
    { name: 'medicine', icon: faHeartPulse },
    { name: 'nature', icon: faMountain },
    { name: 'business', icon: faBriefcase },
    { name: 'technical', icon: faGears },
    { name: 'behaviour', icon: faFaceSmile },
    { name: 'cooking', icon: faCarrot },
    { name: 'other', icon: faClipboardQuestion },
    { name: 'verbs', icon: faCommentDots },
    { name: 'phrases', icon: faCommentDots },
    { name: 'nouns', icon: faCommentDots },
    { name: 'adjectives', icon: faCommentDots },
    { name: 'phrasal verbs', icon: faCommentDots },
    { name: 'idioms', icon: faCommentDots }
  ];

  public icon: IconDefinition;

  constructor(
    private phrasesService: PhrasesService,
    private resultService: ResultService
  ) {}

  // assign icon to category
  ngOnInit(): void {
    const faData = this.icons.find((obj) => obj.name === this.category._id);
    this.icon = faData!.icon;
  }

  // start quiz function
  start(category: string): void {
    // clear previous score
    this.resultService.clearScore();
    // get phrases from category and go to card
    this.phrasesService.getPhrases(category).subscribe(() => {
      this.router.navigate(['card'], { skipLocationChange: true });
    });
  }

  // get category backgrounds
  getBgUrl() {
    return `url(./backgrounds/${this.category})`;
  }
}
