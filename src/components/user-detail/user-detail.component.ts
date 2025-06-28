import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <!-- Back Button -->
      <button class="back-btn" (click)="goBack()">
        ← Back to Users
      </button>

      <!-- Loading State -->
      <div *ngIf="loading" class="loading-container">
        <div class="spinner"></div>
        <p>Loading user details...</p>
      </div>

      <!-- Error State -->
      <div *ngIf="error" class="error-container">
        <div class="error-icon">⚠️</div>
        <h3>User Not Found</h3>
        <p>{{ error }}</p>
        <button class="retry-btn" (click)="loadUserDetails()">Try Again</button>
      </div>

      <!-- Success State -->
      <div *ngIf="!loading && !error && user" class="user-profile">
        <div class="profile-header">
          <div class="user-avatar-large">
            {{ getInitials(user.name) }}
          </div>
          <div class="user-basic-info">
            <h1>{{ user.name }}</h1>
            <p class="username">&#64;{{ user.username }}</p>
          </div>
        </div>

        <div class="profile-content">
          <div class="info-section">
            <h3>Contact Information</h3>
            <div class="info-grid">
              <div class="info-item">
                <span class="label">Email:</span>
                <span class="value">{{ user.email }}</span>
              </div>
              <div class="info-item">
                <span class="label">Phone:</span>
                <span class="value">{{ user.phone }}</span>
              </div>
              <div class="info-item">
                <span class="label">Website:</span>
                <span class="value">
                  <a [href]="'https://' + user.website" target="_blank">{{ user.website }}</a>
                </span>
              </div>
            </div>
          </div>

          <div class="info-section">
            <h3>Address</h3>
            <div class="address-card">
              <div class="address-text">
                <p>{{ user.address.suite }}, {{ user.address.street }}</p>
                <p>{{ user.address.city }} - {{ user.address.zipcode }}</p>
              </div>
              <div class="coordinates">
                <small [textContent]="'Coordinates: ' + user.address.geo.lat + ', ' + user.address.geo.lng"></small>
              </div>
            </div>
          </div>

          <div class="info-section">
            <h3>Company</h3>
            <div class="company-card">
              <h4>{{ user.company.name }}</h4>
              <p class="catchphrase">"{{ user.company.catchPhrase }}"</p>
              <p class="business">{{ user.company.bs }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }

    .back-btn {
      background: #95a5a6;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 14px;
      margin-bottom: 30px;
      transition: background-color 0.3s ease;
    }

    .back-btn:hover {
      background: #7f8c8d;
    }

    .loading-container, .error-container {
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

    .user-profile {
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
      overflow: hidden;
    }

    .profile-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 40px 30px;
      display: flex;
      align-items: center;
      gap: 24px;
    }

    .user-avatar-large {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background: rgba(255,255,255,0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      font-weight: bold;
      border: 3px solid rgba(255,255,255,0.3);
    }

    .user-basic-info h1 {
      margin: 0 0 8px 0;
      font-size: 2.5rem;
      font-weight: 300;
    }

    .username {
      opacity: 0.9;
      font-size: 1.2rem;
      margin: 0;
    }

    .profile-content {
      padding: 30px;
    }

    .info-section {
      margin-bottom: 30px;
    }

    .info-section h3 {
      color: #2c3e50;
      margin-bottom: 20px;
      font-size: 1.4rem;
      font-weight: 500;
      border-bottom: 2px solid #ecf0f1;
      padding-bottom: 10px;
    }

    .info-grid {
      display: grid;
      gap: 16px;
    }

    .info-item {
      display: flex;
      align-items: center;
      padding: 12px 0;
    }

    .label {
      font-weight: 600;
      color: #7f8c8d;
      min-width: 80px;
      margin-right: 16px;
    }

    .value {
      color: #2c3e50;
    }

    .value a {
      color: #3498db;
      text-decoration: none;
    }

    .value a:hover {
      text-decoration: underline;
    }

    .address-card, .company-card {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 8px;
      border-left: 4px solid #3498db;
    }

    .address-text p {
      margin: 4px 0;
      color: #2c3e50;
    }

    .coordinates {
      margin-top: 12px;
      color: #95a5a6;
    }

    .company-card h4 {
      margin: 0 0 12px 0;
      color: #2c3e50;
      font-size: 1.3rem;
    }

    .catchphrase {
      font-style: italic;
      color: #7f8c8d;
      margin: 8px 0;
      font-size: 1.1rem;
    }

    .business {
      color: #95a5a6;
      margin: 8px 0;
      text-transform: capitalize;
    }

    @media (max-width: 768px) {
      .profile-header {
        flex-direction: column;
        text-align: center;
        padding: 30px 20px;
      }

      .user-basic-info h1 {
        font-size: 2rem;
      }

      .profile-content {
        padding: 20px;
      }

      .info-item {
        flex-direction: column;
        align-items: flex-start;
        gap: 4px;
      }

      .label {
        min-width: auto;
        margin-right: 0;
      }
    }
  `]
})
export class UserDetailComponent implements OnInit {
  user: User | null = null;
  loading: boolean = false;
  error: string | null = null;
  userId: number = 0;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = +params['id'];
      this.loadUserDetails();
    });
  }

  loadUserDetails(): void {
    this.loading = true;
    this.error = null;

    this.userService.getUserById(this.userId).subscribe({
      next: (user: any) => {
        this.user = user;
        this.loading = false;
      },
      error: (error: any) => {
        this.error = error;
        this.loading = false;
      }
    });
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
