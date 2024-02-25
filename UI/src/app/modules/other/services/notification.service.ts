import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  showSuccessMessage(message: string) {
    Swal.fire({
      position: 'top',
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 2000,
      toast: true,
      customClass: {
        title: 'swal-custom-title',
        container: 'swal-custom-container',
      },
      width: 'auto',
    });
  }

  showErrorMessage(message: string) {
    Swal.fire({
      position: 'top',
      icon: 'error',
      title: message,
      showConfirmButton: false,
      timer: 3000,
      toast: true,
      customClass: {
        title: 'swal-custom-title',
        container: 'swal-custom-container',
      },
      width: 'auto',
    });
  }

  showWarningMessage(message: string) {
    Swal.fire({
      position: 'top',
      icon: 'warning',
      title: message,
      showConfirmButton: false,
      timer: 2000,
      toast: true,
      customClass: {
        title: 'swal-custom-title',
        container: 'swal-custom-container',
      },
      width: 'auto',
    });
  }
}
