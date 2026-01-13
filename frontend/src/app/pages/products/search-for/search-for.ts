import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ServiceProduct } from '../../../services/product/product';
import { ComponentCard1Product } from '../../../shared/cards/product-card-1/card';
import { ProductList } from '../../../interfaces/product/products';

@Component({
  selector: 'page-search-for',
  standalone: true,
  imports: [CommonModule, ComponentCard1Product],
  templateUrl: './search-for.html',
})
export class PageSearchForProducts implements OnInit, OnDestroy {
  searchQuery: string = '';
  products: ProductList = [];
  loading: boolean = false;
  error: string = '';

  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private productService: ServiceProduct,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Escucha cambios en el parámetro de ruta
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      // Si no hay query en la URL, será undefined
      this.searchQuery = params['query'] || '';
      this.searchProducts();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  searchProducts(): void {
    this.loading = true;
    this.error = '';
    this.products = [];

    // Si NO hay query o es 'all', traer todos los productos
    if (!this.searchQuery || this.searchQuery === 'all') {
      this.productService
        .get_all()
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response: ProductList) => {
            this.products = Array.isArray(response) ? response : [];
            this.loading = false;
            this.cdr.detectChanges();
          },
          error: (err) => {
            this.handleError('Error al cargar productos', err);
          },
        });
    }
    // Si HAY query específica, buscar por query
    else {
      this.productService
        .getByQuery(this.searchQuery, 0, 999999)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response: ProductList) => {
            this.products = Array.isArray(response) ? response : [];
            this.loading = false;
            this.cdr.detectChanges();
          },
          error: (err) => {
            this.handleError('Error al buscar productos', err);
          },
        });
    }
  }

  private handleError(message: string, err: any): void {
    this.error = message;
    this.loading = false;
    console.error('Error:', err);
    this.cdr.detectChanges();
  }
}
