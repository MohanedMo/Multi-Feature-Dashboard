import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="app-container">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    }
  `]
})
export class App {}

const routes = [
  {
    path: '',
    component: UserListComponent,
    title: 'Users Directory'
  },
  {
    path: 'user/:id',
    component: UserDetailComponent,
    title: 'User Profile'
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
] as Routes;

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideHttpClient()
  ]
});
