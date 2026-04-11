import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})

export class AlertService {
  success(message: string, title: string = 'Éxito!') {
    Swal.fire({
      text: message,
      icon: 'success',
      confirmButtonColor: '#3085d6',
    });
  }

  error(message: string, title: string = 'Oops...') {
    Swal.fire({
      title: title,
      text: message,
      icon: 'error',
    });
  }

  toast(message: string, icon: 'success' | 'error' | 'info' = 'success') {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
    Toast.fire({
      icon: icon,
      title: message,
    });
  }

  async confirm(title: string, text: string): Promise<boolean> {
    const result = await Swal.fire({
      title: title,
      text: text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });

    return result.isConfirmed;
  }
}
