import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiPayload, ApiResponse } from '../models/api-response.interface';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);

  // private apiUrl = 'http://localhost:5136/api/requests'; // TEMPORARY
  private apiUrl = `${environment.apiUrl}/requests`;


  sendEmail(payload: ApiPayload): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.apiUrl, payload);
  }
}
