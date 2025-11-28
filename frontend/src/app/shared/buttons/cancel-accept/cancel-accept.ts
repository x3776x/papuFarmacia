import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-cancel-accept-buttons',
  standalone: true,
  imports: [],
  templateUrl: './cancel-accept.html',
})
export class ComponentCancelAcceptButtons {
  @Input() buttonCancelText = 'Cancelar';
  @Input() buttonAcceptText = 'Aceptar';

  @Output() cancel = new EventEmitter<void>();
  @Output() accept = new EventEmitter<void>();

  onClickCancel() {
    this.cancel.emit();
  }

  onClickAccept() {
    this.accept.emit();
  }
}
