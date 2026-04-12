import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContactService } from '../../services/contact-service';
import { AlertService } from '../../services/alert-service';

@Component({
  selector: 'app-contact-form-template',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './contact-form-template.html',
  styleUrl: './contact-form-template.css',
})
export class ContactFormTemplate {
  private contactService = inject(ContactService);
  private alertService = inject(AlertService);

  contactData = {
    name: '',
    email: '',
    subject: '',
    message: '',
  };

  onSubmit(form: any) {
    if (form.valid) {
      this.contactService.sendMessage(this.contactData).subscribe({
        next: () => {
          this.alertService.success('Mensaje enviado correctamente');
          form.resetForm();
        },
        error: () => this.alertService.error('Error al enviar el mensaje'),
      });
    }
  }
}
