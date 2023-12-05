import { Component, ViewEncapsulation } from '@angular/core';
import { ResultService } from 'src/app/services/result.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  public isOpen$ = this.resultService.isOpen$;

  constructor(private resultService: ResultService) {
  }

  close() {
    this.resultService.closeModal();
  }
}
