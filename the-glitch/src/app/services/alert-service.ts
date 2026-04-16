import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})

export class AlertService {

  private baseConfig = {
    background: '#151a22',
    color: '#e6edf3',
    confirmButtonColor: '#88ff00', 
    customClass: {
      popup: 'custom-swal-popup',
      title: 'custom-swal-title',
      htmlContainer: 'custom-swal-text',
      confirmButton: 'custom-swal-confirm',
      cancelButton: 'custom-swal-cancel'
    }
  };

  success(message: string, title: string = 'Éxito') {
    Swal.fire({
      ...this.baseConfig,
      title,
      text: message,
      icon: 'success',
      iconColor: '#88ff00'
    });
  }

  error(message: string, title: string = 'Oops...') {
    Swal.fire({
      ...this.baseConfig,
      title,
      text: message,
      icon: 'error',
      iconColor: '#ff4d4f',
      confirmButtonColor: '#ff4d4f'
    });
  }

  toast(message: string, icon: 'success' | 'error' | 'info' = 'success') {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2500,
      timerProgressBar: true,
      background: '#151a22',
      color: '#e6edf3',
      customClass: {
        popup: 'custom-swal-toast'
      }
    });

    Toast.fire({
      icon,
      title: message,
      iconColor:
        icon === 'success' ? '#88ff00' :
        icon === 'error' ? '#ff4d4f' :
        '#00cfff'
    });
  }

  async confirm(title: string, text: string): Promise<boolean> {
    const result = await Swal.fire({
      ...this.baseConfig,
      title,
      text,
      icon: 'warning',
      iconColor: '#ffc107',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#ff4d4f',
      cancelButtonColor: '#2a2f3a'
    });

    return result.isConfirmed;
  }
}