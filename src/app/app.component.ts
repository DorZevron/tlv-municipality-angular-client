import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from './core/services/api.service';
import { ApiResponse } from './core/models/api-response.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  private apiService = inject(ApiService);
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  lastResponseTime: string | null = null;
  errorMessage: string | null = null;
  isLoading = false;


  onSubmit() {
    this.errorMessage = null;

    if (this.emailControl.invalid) {
      this.errorMessage = 'אנא הזן כתובת אימייל תקינה.';
      return;
    }

    this.isLoading = true;
    this.apiService.sendEmail({ email: this.emailControl.value! }).subscribe({
      next: (response: ApiResponse) => {
        this.lastResponseTime = response.receivedAt;
        this.isLoading = false;
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading = false;
        
        if (err.status === 429 && err.error) {
          this.lastResponseTime = err.error.receivedAt;
          this.errorMessage = 'שגיאה (429): תקרת בקשות הושגה. אנא נסה שוב מאוחר יותר.';
        } else {
          this.errorMessage = `אירעה שגיאה כללית מול השרת (${err.status}). אנא נסה שוב מאוחר יותר.`;
        }
      }
    });
  }
}
