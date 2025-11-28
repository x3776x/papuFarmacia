import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

export interface DialogData {
  title: string;
  message: string;
  inputValue?: string;
  showInput?: boolean; // Show or Hide input
  confirmText?: string;
  cancelText?: string;
}

@Component({
  selector: 'app-dialog-error',
  imports: [MatDialogModule, MatButtonModule, FormsModule],
  templateUrl: './dialog-error.html',
})
export class DialogError {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<DialogError>
  ) {}

  onClose(result: any = null) {
    this.dialogRef.close(result);
  }
}
