import { Component, OnInit } from '@angular/core';
import { components } from '../../../imports/imports';
import {
  FormGroup,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { AuthServiceService } from '../../services/auth-service.service';
import { user } from '../interface/interfaces';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [components, ReactiveFormsModule, RippleModule, ToastModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [MessageService],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  isRememberMeChecked: any;
  constructor(
    private fb: FormBuilder,
    private authService: AuthServiceService,
    private route: Router,
    private messageService: MessageService
  ) {}
  ngOnInit(): void {
    this.onInit();
  }
  onInit() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onLogIn() {
    const username = this.form.get('username')?.value ?? '';
    const password = this.form.get('password')?.value ?? '';
    const user = { username, password };
    if (this.authService.authenticateUser(user)) {
      this.handleUserStorage(user);
      this.route.navigate(['/home']);
    } else {
      this.showError();
      // this.route.navigate(['/login']);
    }
    return null;
  }

  rememberUser(event: any) {
    this.isRememberMeChecked = event.target.checked;
  }

  handleUserStorage(user: user) {
    if (this.isRememberMeChecked) {
      this.authService.saveUserToLocalStorage(user);
    } else {
      this.authService.saveUserToSessionStorage(user);
    }
  }

  showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Message Content',
    });
  }
  showError() {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Invalid username or password',
    });
  }
}
