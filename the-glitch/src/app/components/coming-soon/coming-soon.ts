import { Component, OnInit, OnDestroy} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-coming-soon',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './coming-soon.html',
  styleUrl: './coming-soon.css',
})
export class ComingSoon implements OnInit, OnDestroy {
  
  days: string = '00';
  hours: string = '00';
  minutes: string = '00';
  seconds: string = '00';
  email: string = '';
  isAvailable: boolean = false;
  
  private countdownInterval: any;
  private launchDate: Date = new Date(2026, 11, 31);
  
  ngOnInit(): void {
    this.startCountdown();
  }
  
  startCountdown(): void {
    this.updateCountdown();
    this.countdownInterval = setInterval(() => {
      this.updateCountdown();
    }, 1000);
  }
  
  updateCountdown(): void {
    const now = new Date().getTime();
    const distance = this.launchDate.getTime() - now;
    
    if (distance < 0) {
      this.isAvailable = true;
      if (this.countdownInterval) {
        clearInterval(this.countdownInterval);
      }
      return;
    }
    
    const daysCalc = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hoursCalc = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutesCalc = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const secondsCalc = Math.floor((distance % (1000 * 60)) / 1000);
    
    this.days = String(daysCalc).padStart(2, '0');
    this.hours = String(hoursCalc).padStart(2, '0');
    this.minutes = String(minutesCalc).padStart(2, '0');
    this.seconds = String(secondsCalc).padStart(2, '0');

  }
  
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  ngOnDestroy(): void {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }
}