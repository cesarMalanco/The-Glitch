import { Component } from '@angular/core';
import { Hero } from '../../components/hero/hero';
import { ProductCarousel } from '../../components/product-carousel/product-carousel';
import { Benefits } from '../../components/benefits/benefits';
import { ComingSoon } from "../../components/coming-soon/coming-soon";
import { Cta } from "../../components/cta/cta";

@Component({
  selector: 'app-home',
  imports: [Hero, ProductCarousel, Benefits, ComingSoon, Cta],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
