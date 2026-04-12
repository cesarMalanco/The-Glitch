import { Component } from '@angular/core';
import { ContactFormTemplate } from '../../components/contact-form-template/contact-form-template';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ContactFormTemplate],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {}
