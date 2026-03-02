import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const rateLimitInterceptor: HttpInterceptorFn = (req, next) => {
    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            if (error.status === 429) {
                console.warn('[rateLimitInterceptor]: Rate limit exceeded (429). Intercepted globally.', error.error);
            }
            return throwError(() => error);
        })
    );
};