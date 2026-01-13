import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';
import { Subject, takeUntil, finalize } from 'rxjs';

import { ComponentInputField, SelectOption } from '../../../shared/inputs/input-field/input-field';
import { ComponentImageUploader } from '../../../shared/inputs/image-uploader/image-uploader';
import { ServiceProduct } from '../../../services/product/product';
import { PRODUCT_TYPES } from '../../../interfaces/product/PRODUCT_TYPES';
import { InterfaceProductType } from '../../../interfaces/product/product-type';
import { InterfacePostProduct } from '../../../interfaces/product/post-product';
import { ServiceShowCustomDialog } from '../../../shared/dialogs/service-dialog';

@Component({
  selector: 'register-product',
  standalone: true,
  imports: [NgClass, ReactiveFormsModule, ComponentInputField, ComponentImageUploader],
  templateUrl: './register-product.html',
})
export class PageRegisterProduct implements OnDestroy {
  productForm!: FormGroup;
  productTypes: InterfaceProductType[] = PRODUCT_TYPES;
  productTypeOptions: SelectOption[] = [];

  isSaving: boolean = false;

  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private productService: ServiceProduct,
    private router: Router,
    private customDialogService: ServiceShowCustomDialog
  ) {
    this.productForm = this.createForm();

    // Crear opciones para el select
    this.productTypeOptions = PRODUCT_TYPES.map((type) => ({
      value: type.id,
      label: type.name,
    }));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Crea el FormGroup con validaciones
   */
  private createForm(): FormGroup {
    return this.fb.group({
      productTypeId: ['', Validators.required],
      chemicalName: ['', [Validators.minLength(3)]],
      comercialName: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(500)]],
      price: [0, [Validators.required, Validators.min(0.01)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      batch: ['', Validators.required],
      outdate: ['', Validators.required],
      provider: ['', Validators.required],
      pharmaceutical: ['', Validators.required],
      image: [''],
    });
  }

  /**
   * Verifica si debe mostrar el campo de nombre químico
   */
  shouldShowChemicalName(): boolean {
    const typeId = this.productForm.get('productTypeId')?.value;
    // Mostrar para Medicamentos (1) y algunos otros tipos según tu lógica
    return typeId === 1 || typeId === 3;
  }

  /**
   * Envía el formulario
   */
  onSubmit(): void {
    this.productForm.markAllAsTouched();

    if (this.productForm.invalid) {
      ('Por favor completa todos los campos requeridos correctamente');
      return;
    }

    // Validar nombre químico si es necesario
    if (this.shouldShowChemicalName() && !this.productForm.get('chemicalName')?.value) {
      this.customDialogService.warning('El nombre químico es requerido para este tipo de producto');
      return;
    }

    this.isSaving = true;
    const formData: InterfacePostProduct = this.productForm.value;

    this.productService
      .post(formData)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.isSaving = false;
        })
      )
      .subscribe({
        next: (response) => {
          this.customDialogService.success('Producto registrado correctamente');
          this.productForm.reset();
          this.productForm.markAsPristine();

          // Navegar a la lista de productos o detalles del producto creado
          if (response?.id) {
            this.router.navigate(['/productos/detalles', response.id]);
          } else {
            this.router.navigate(['/productos/buscar']);
          }
        },
        error: (err: any) => {
          console.error('Error al registrar producto:', err);

          if (err.status === 400) {
            this.customDialogService.error(
              'Datos inválidos. Por favor verifica la información ingresada.'
            );
          } else if (err.status === 409) {
            this.customDialogService.warning('Ya existe un producto con ese nombre comercial.');
          } else if (err.status === 0) {
            this.customDialogService.error(
              'No se pudo conectar con el servidor. Verifica tu conexión.'
            );
          } else {
            this.customDialogService.error(
              'Error al registrar el producto. Por favor intenta de nuevo.'
            );
          }
        },
      });
  }

  /**
   * Limpia el formulario
   */
  onReset(): void {
    if (confirm('¿Estás seguro de limpiar todo el formulario?')) {
      this.productForm.reset({
        productTypeId: '',
        chemicalName: '',
        comercialName: '',
        description: '',
        price: 0,
        stock: 0,
        batch: '',
        outdate: '',
        provider: '',
        pharmaceutical: '',
        image: '',
      });
      this.productForm.markAsPristine();
      this.productForm.markAsUntouched();
    }
  }

  /**
   * Cancela y vuelve atrás
   */
  onCancel(): void {
    if (this.productForm.dirty) {
      if (confirm('Hay cambios sin guardar. ¿Deseas salir?')) {
        this.router.navigate(['/productos/buscar']);
      }
    } else {
      this.router.navigate(['/productos/buscar']);
    }
  }
}
