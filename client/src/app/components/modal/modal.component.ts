import { Component, OnInit, ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { ResultService } from 'src/app/services/result.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @ViewChild('okBtnRef') okBtnRef: ElementRef;

  public isOpen$ = this.resultService.isOpen$;

  constructor(private resultService: ResultService) {}

  ngOnInit(): void {
    // focus on ok button after modal show
    this.isOpen$.subscribe((isOpen) => {
      if (isOpen) {
        setTimeout(() => this.okBtnRef.nativeElement.focus());
      }
    });
  }

  // close modal function
  close(): void {
    this.resultService.closeModal();
  }

  // get final score function
  getScore(): number {
    return this.resultService.getScore();
  }
}
