import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { ComponentInputField } from '../../../shared/inputs/input-field/input-field';
import { ServiceAuth } from '../../../services/auth/auth';
import { DialogData, DialogError } from '../../../shared/dialogs/error/dialog-error';

@Component({
  selector: 'login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ComponentInputField],
  templateUrl: './login.html',
})
export class PageLogin implements OnInit {
  loginForm: FormGroup;
  token: any = null;

  constructor(
    private fb: FormBuilder,
    private serviceAuth: ServiceAuth,
    private matDialog: MatDialog
  ) {
    this.loginForm = this.fb.group({
      identifier: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { identifier, password } = this.loginForm.value;

    this.serviceAuth.login(identifier, password).subscribe({
      next: (response: HttpResponse<any>) => {
        this.token = response.body;
        console.log('Código de estado:', response.status);
        console.log('Token recibido:', response.body);
      },
      error: (err: HttpErrorResponse) => {
        console.error(
          'Error en login:',
          err,
          '\nCódigo de estado:',
          err.status,
          '\nMensaje:',
          err.message
        );
        if (err.status === 401) {
          this.openCustomDialog();
        } else if (err.status === 500) {
          window.alert('Error del servidor');
        }
      },
      complete: () => {
        console.log('Petición de login completada');
      },
    });
  }

  openCustomDialog() {
    const data: DialogData = {
      title: 'Credenciales incorrectas',
      message: 'Usuario o contraseña incorrectos',
      showInput: false,
      inputValue: '',
      confirmText: 'Enviar',
      cancelText: 'Cancelar',
    };

    const dialogRef = this.matDialog.open(DialogError, {
      width: '400px',
      data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Resultado del diálogo:', result);
    });
  }
}
