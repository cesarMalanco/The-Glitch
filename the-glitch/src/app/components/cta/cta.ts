import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cta',
  imports: [RouterLink],
  templateUrl: './cta.html',
  styleUrl: './cta.css',
})
export class Cta implements AfterViewInit {

  @ViewChild('matrixContainer', { static: true }) container!: ElementRef;

  characters = 'abcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()*&^%';
  numColumns = 40;
  drops: HTMLDivElement[] = [];

  ngAfterViewInit() {
    this.createMatrix();
  }

  createMatrix() {
    const containerEl = this.container.nativeElement;
    const width = containerEl.offsetWidth;
    const height = containerEl.offsetHeight;

    for (let i = 0; i < this.numColumns; i++) {
      const drop = document.createElement('div');

      drop.style.position = 'absolute';
      drop.style.top = '-20px';
      drop.style.left = (i * (width / this.numColumns)) + 'px';
      drop.style.color = '#00ff00';
      drop.style.fontSize = '20px';
      drop.style.fontFamily = 'monospace';
      drop.style.opacity = '0.8';
      drop.style.fontWeight = '800';

      drop.textContent = this.randomChar();

      containerEl.appendChild(drop);
      this.drops.push(drop);

      this.animateDrop(drop, height);
      this.changeCharacter(drop);
    }
  }

  animateDrop(drop: HTMLDivElement, height: number) {
    const duration = Math.random() * 3000 + 2000;

    drop.animate([
      { transform: `translateY(0px)`, opacity: 1 },
      { transform: `translateY(${height}px)`, opacity: 0 }
    ], {
      duration: duration,
      iterations: Infinity,
      easing: 'linear',
      delay: Math.random() * 1000
    });
  }

  changeCharacter(drop: HTMLDivElement) {
    setInterval(() => {
      drop.textContent = this.randomChar();
    }, 200);
  }

  randomChar(): string {
    return this.characters[Math.floor(Math.random() * this.characters.length)];
  }
}