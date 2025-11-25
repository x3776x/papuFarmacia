import { Component } from '@angular/core';

@Component({
  selector: 'cancel-accept',
  imports: [],
  templateUrl: './cancel-accept.html',
})
export class ComponentCancelAccept {
  buttonCancelText = 'Cancelar';
  buttonAcceptText = 'Aceptar';

  onClickCancel() {
    console.log('Cancel button clicked');
  }
  onClickAccept() {
    console.log('Accept button clicked');
  }
}
