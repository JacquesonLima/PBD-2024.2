import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CoreComponent } from './pages/core/core.component';
import { SignUpComponent } from './pages/signup/signup.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignUpComponent,
  },
  {
    path: 'core',
    component: CoreComponent,
  },
];
