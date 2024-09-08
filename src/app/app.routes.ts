import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { authGuard } from './guards/auth.guard';
import { ImageModalComponent } from './components/image-modal/image-modal.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: HomePageComponent,
    canActivate: [authGuard],

    children: [
      {
        path: ':id',
        component: ImageModalComponent,
        canActivate: [authGuard],
      },
    ],
  },
];
