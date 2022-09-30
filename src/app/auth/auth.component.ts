import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit {
  @ViewChild('form', { static: false }) form: NgForm;
  isLoginMode: boolean = true;
  isLoading: boolean = false;

  error: string;

  constructor(private authService: AuthService, private router: Router) {}

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  async onSubmit() {
    if (!this.form.valid) return;
    try {
      const { email, password } = this.form.value;
      this.isLoading = true;
      if (this.isLoginMode) {
        await this.authService.signIn(email, password);
      } else {
        await this.authService.signUp(email, password);
      }
      this.form.reset();
    } catch (error: any) {
      this.error = error.message;
    } finally {
      this.isLoading = false;
      this.router.navigate(['recipes']);
    }
  }

  clearError() {
    this.error = '';
  }

  ngOnInit(): void {}
}
