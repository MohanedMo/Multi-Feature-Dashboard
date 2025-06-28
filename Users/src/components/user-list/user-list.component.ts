import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h1 class="title">Users</h1>

      <!-- Loading State -->
      <div *ngIf="loading" class="loading-container">
        <div class="spinner"></div>
        <p>Loading users...</p>
      </div>

      <!-- Error State -->
      <div *ngIf="error" class="error-container">
        <div class="error-icon">⚠️</div>
        <h3>Oops! Something went wrong</h3>
        <p>{{ error }}</p>
        <button class="retry-btn" (click)="loadUsers()">Try Again</button>
      </div>

      <!-- Success State -->
      <div *ngIf="!loading && !error && users.length > 0" class="users-grid">
        <div
          *ngFor="let user of users"
          class="user-card"
          (click)="viewUserDetails(user.id)"
        >
          <div class="user-avatar">
            {{ getInitials(user.name) }}
          </div>
          <div class="user-info">
            <h3>{{ user.name }}</h3>
            <p class="username">&#64; {{ user.username }}</p>
            <p class="email">{{ user.email }}</p>
            <p class="company">{{ user.company.name }}</p>
          </div>
          <div class="arrow">→</div>
        </div>
      </div>

      <!-- Empty State -->
      <div *ngIf="!loading && !error && users.length === 0" class="empty-container">
        <div class="empty-icon">👥</div>
        <h3>No users found</h3>
        <p>There are no users to display at the moment.</p>
      </div>
    </div>
  `,
  styles: [`
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }

    .title {
      text-align: center;
      color: #2c3e50;
      margin-bottom: 30px;
      font-size: 2.5rem;
      font-weight: 300;
    }

    .loading-container, .error-container, .empty-container {
      text-align: center;
      padding: 60px 20px;
    }

    .spinner {
      width: 40px;
      height: 40px;
      border: 4px solid #f3f3f3;
      border-top: 4px solid #3498db;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto 20px;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .error-container {
      color: #e74c3c;
    }

    .error-icon {
      font-size: 3rem;
      margin-bottom: 20px;
    }

    .retry-btn {
      background: #3498db;
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 16px;
      margin-top: 20px;
      transition: background-color 0.3s ease;
    }

    .retry-btn:hover {
      background: #2980b9;
    }

    .empty-icon {
      font-size: 4rem;
      margin-bottom: 20px;
      opacity: 0.5;
    }

    .users-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }

    .user-card {
      background: white;
      border-radius: 12px;
      padding: 24px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 16px;
      border: 2px solid transparent;
    }

    .user-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 20px rgba(0,0,0,0.15);
      border-color: #3498db;
    }

    .user-avatar {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
      font-size: 18px;
      flex-shrink: 0;
    }

    .user-info {
      flex: 1;
    }

    .user-info h3 {
      margin: 0 0 8px 0;
      color: #2c3e50;
      font-size: 1.2rem;
    }

    .username {
      color: #7f8c8d;
      margin: 4px 0;
      font-weight: 500;
    }

    .email {
      color: #3498db;
      margin: 4px 0;
      font-size: 0.9rem;
    }

    .company {
      color: #95a5a6;
      margin: 4px 0;
      font-size: 0.9rem;
    }

    .arrow {
      font-size: 1.5rem;
      color: #bdc3c7;
      transition: transform 0.3s ease;
    }

    .user-card:hover .arrow {
      transform: translateX(5px);
      color: #3498db;
    }

    @media (max-width: 768px) {
      .users-grid {
        grid-template-columns: 1fr;
      }

      .user-card {
        padding: 20px;
      }

      .title {
        font-size: 2rem;
      }
    }
  `]
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  loading: boolean = false;
  error: string | null = null;

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.error = null;

    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.loading = false;
      },
      error: (error) => {
        this.error = error;
        this.loading = false;
      }
    });
  }

  viewUserDetails(userId: number): void {
    this.router.navigate(['/user', userId]);
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }
}
