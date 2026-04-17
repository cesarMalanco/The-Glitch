import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private http = inject(HttpClient);
  
  private apiUrl = 'https://the-glitch.onrender.com/api/contact';


  sendMessage(messageData: any) {
    return this.http.post(this.apiUrl, messageData);
  }
}