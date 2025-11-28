import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { ComponentInputField } from '../../../shared/inputs/input-field/input-field';
import { ServiceAuth } from '../../../services/auth/auth';
import { ServiceDialog } from '../../../shared/dialogs/service-dialog';
import { InterfaceLogin } from '../../../interfaces/user/login';

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
    private dialogService: ServiceDialog
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

    const data: InterfaceLogin = this.loginForm.value;

    this.serviceAuth.login(data).subscribe({
      next: (response: HttpResponse<any>) => {
        this.token = response.body;
        console.log('Código de estado:', response.status, '\nToken recibido:', response.body);
        this.dialogService.success('Credenciales correctas', 'Bienvenid@.');
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
        if (err.status === 401 || err.status === 422) {
          this.dialogService.error('Credenciales incorrectas', 'Intente de nuevo.');
        } else if (err.status === 500) {
          this.dialogService.error('Error interno del servidor', 'Intente de nuevo.');
        }
      },
      complete: () => {},
    });
  }
}
