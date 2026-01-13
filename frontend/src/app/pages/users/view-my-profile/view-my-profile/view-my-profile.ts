import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { InterfaceUserWithProfilePicture } from '../../../../interfaces/user/user-photo';
import { catchError, finalize, of, Subject, takeUntil } from 'rxjs';
import { ServiceAuth } from '../../../../services/auth/auth';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-view-my-profile',
  imports: [NgClass],
  templateUrl: './view-my-profile.html',
})
export class ViewMyProfile implements OnInit {
  currentUser: InterfaceUserWithProfilePicture | null = null;
  isLoading: boolean = false;
  error: string | null = null;

  // Subject para gestionar unsubscribes
  private destroy$ = new Subject<void>();

  constructor(
    private authService: ServiceAuth,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    // Limpia todas las suscripciones
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadData(): void {
    this.isLoading = true;
    this.error = null;

    this.authService
      .getData()
      .pipe(
        takeUntil(this.destroy$),
        catchError((err) => {
          console.error('Error al obtener el usuario:', err);

          // Manejo de errores específicos
          if (err.status === 404) {
            this.error = 'Usuario no encontrado';
          } else if (err.status === 0) {
            this.error = 'No se pudo conectar con el servidor';
          } else {
            this.error = 'Error al cargar el usuario. Por favor, intenta de nuevo.';
          }

          return of(null);
        }),
        finalize(() => {
          this.isLoading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: (userData) => {
          if (userData) {
            this.currentUser = userData;
          } else if (!this.error) {
            this.error = 'Usuario no encontrado';
          }
        },
      });
  }

  private handleError(message: string): void {
    this.error = message;
    this.isLoading = false;
    console.error(message);
  }

  retry(): void {
    this.loadData();
  }

  goBack(): void {
    this.router.navigate(['/inicio']);
  }

  editProfile(): void {}

  changePassword(): void {}
}
