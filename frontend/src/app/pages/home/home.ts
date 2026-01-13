import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
})
export class PageHome {
  constructor(private router: Router) {}

  showProducts(): void {
    this.router.navigate(['/productos/buscar', 'all']);
  }
}
