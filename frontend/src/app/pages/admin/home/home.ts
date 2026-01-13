import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { ServiceAdmmin } from '../../../services/admin/admin';
import { InterfaceUser } from '../../../interfaces/user/user';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ServiceShowCustomDialog } from '../../../shared/dialogs/service-dialog';

@Component({
  selector: 'home',
  standalone: true,
  templateUrl: './home.html',
  imports: [CommonModule],
})
export class AdminPage implements OnInit {
  users: InterfaceUser[] = [];
  loading = false;
  error = '';

  private cd = inject(ChangeDetectorRef);

  constructor(
    private adminService: ServiceAdmmin,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    private customDialogService: ServiceShowCustomDialog
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;
    this.adminService.getData().subscribe({
      next: (resp: any) => {
        this.users = resp.users ?? resp;
        this.loading = false;
      },
      error: () => {
        this.error = 'Could not load users';
        this.loading = false;
      },
    });
    this.loading = false;
    this.changeDetectorRef.detectChanges();
  }

  banUser(user_id: number) {
    this.adminService.patchDataBan(user_id).subscribe({
      next: () => this.loadUsers(),
      error: () => this.customDialogService.warning('Error', 'Failed to ban user'),
    });
  }

  unbanUser(user_id: number) {
    this.adminService.patchDataUnban(user_id).subscribe({
      next: () => this.loadUsers(),
      error: () => this.customDialogService.warning('Error', 'Failed to ban user'),
    });
  }
}
