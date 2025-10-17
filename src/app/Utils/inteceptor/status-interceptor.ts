import { HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StatusDialogComponent, StatusDialogData } from '../component/status-dialog/status-dialog';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

export const StatusInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const dialog = inject(MatDialog);
  const router = inject(Router);

  return next(req).pipe(
    tap({
      next: (event) => {
        if (event instanceof HttpResponse) {
          const body = event.body;

          if (body && typeof body === 'object' && 'message' in body && typeof body.message === 'string') {
            const dialogData: StatusDialogData = {
              status: 'info',
              message: body.message,
              showClose: true
            };

            dialog.open(StatusDialogComponent, {
              data: dialogData,
              width: '500px',
              panelClass: dialogData.status
            });
          }
        }
      },



     error: (error) => {
  console.error("🔥 Backend Error Object:", error);

  let status = error?.status;
  let errorMessage = 'An unexpected error occurred';

  // ✅ Chukua message kutoka backend kama ipo
  if (typeof error.error === 'string') {
    errorMessage = error.error;
  } else if (error?.error?.message && typeof error.error.message === 'string') {
    errorMessage = error.error.message;
  }

  // ✅ Optional: override message only if not set by backend
  switch (status) {
    case 403:
      errorMessage ||= 'Access Denied. You do not have permission to perform this action.';
      break;
    case 401:
      errorMessage ||= 'Unauthorized: Please login to continue.';
      router.navigate(['/login']);
      break;
    case 404:
      errorMessage ||= 'Resource not found. Please check the URL or try again later.';
      break;
    case 500:
      errorMessage ||= 'Internal Server Error. Please contact support if this persists.';
      break;
    case 502:
      errorMessage ||= 'Bad Method, Check URL.';
      break;
    default:
      break;
  }

  const dialogData: StatusDialogData = {
    status: 'error',
    message: errorMessage,
    showClose: true
  };

  dialog.open(StatusDialogComponent, {
    data: dialogData,
    width: '400px'
  });
}





    })
  );
};
