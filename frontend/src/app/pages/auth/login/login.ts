import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ComponentInputField } from '../../../shared/inputs/input-field/input-field';

@Component({
  selector: 'login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ComponentInputField, ComponentInputField],
  templateUrl: './login.html',
})
export class PageLogin {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      user: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Valid data:', this.loginForm.value);
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
