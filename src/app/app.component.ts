import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { components } from '../imports/imports';
import { PrimeNGConfig } from 'primeng/api';
import { AuthServiceService } from './services/auth-service.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, components],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [PrimeNGConfig],
})
export class AppComponent implements OnInit {
  constructor(
    private primengConfig: PrimeNGConfig,
    private authService: AuthServiceService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.checkUserLoggedIn();
  }

  checkUserLoggedIn() {
    const user =
      this.authService.getUserFromLocalStorage() ||
      this.authService.getUserFromSessionStorage();
    if (user) {
      this.authService.isLoggedIn = true;
      this.route.navigate(['home']);
    } else {
      this.authService.isLoggedIn = false;
      this.route.navigate(['login']);
    }
  }
}
