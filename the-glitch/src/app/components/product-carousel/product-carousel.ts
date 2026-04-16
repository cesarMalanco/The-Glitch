import { Component, OnInit, ChangeDetectorRef, signal, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-carousel',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-carousel.html',
  styleUrl: './product-carousel.css',
})
export class ProductCarousel implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('track') trackRef!: ElementRef;
  products = signal<any[]>([]);
  private readonly SCROLL_SPEED = 0.5; // Pixels for each animation frame
  private autoScrollEnabled = true;
  private originalProducts: any[] = [];

  constructor(
    private productService: ProductService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.originalProducts = data;
      // Duplicate products
      this.products.set([...data, ...data]);
      this.cd.detectChanges();
    });
  }

  //delay
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.startAutoScroll();
      this.setupScrollReset();
    }, 100);
  }

private animationFrameId: any;

startAutoScroll() {
  const track = this.trackRef.nativeElement;

  const step = () => {
    if (this.autoScrollEnabled && track) {
      track.scrollLeft += this.SCROLL_SPEED;

      // loop
      if (track.scrollLeft >= track.scrollWidth / 2) {
        track.scrollLeft = 0;
      }
    }
    this.animationFrameId = requestAnimationFrame(step);
  };

  this.animationFrameId = requestAnimationFrame(step);
}

  setupScrollReset() {
  const track = this.trackRef.nativeElement;
  if (!track) return;

  track.addEventListener('pointerenter', () => {
    this.autoScrollEnabled = false;
  });

  track.addEventListener('pointerleave', () => {
    this.autoScrollEnabled = true;
  });
}

ngOnDestroy(): void {
  if (this.animationFrameId) {
    cancelAnimationFrame(this.animationFrameId);
  }
}
}