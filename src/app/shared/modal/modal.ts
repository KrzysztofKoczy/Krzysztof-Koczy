import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  template: `
    <div class="modal-backdrop">
      <div class="modal-content">
        <button type="button" class="modal-close" (click)="close.emit()">&times;</button>
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styleUrls: ['./modal.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Modal {
  @Output() close = new EventEmitter<void>();

  handleBackdropClick(): void {
    this.close.emit();
  }
}

