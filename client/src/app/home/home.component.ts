import {
  Component,
  OnInit,
  ViewEncapsulation,
  HostListener,
} from '@angular/core';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';
import { Products, Product } from '../shared/models/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  shops: any[] = [
    {
      name: 'Test Shop',
      email: 'test@gmail.com'
    },
    {
      name: 'Goods Shop',
      email: 'testdas22@gmail.com'
    },
    {
      name: 'Shop 3',
      email:'finalrev@gmail.com'
    },
    {
      name: 'Shop 4',
    },
    {
      name: 'Shop 5',
    },
    {
      name: 'Shop 6',
    },
    {
      name: 'Shop 7',
    },
    {
      name: 'Shop 8',
    },
    {
      name: 'Shop 9',
    },
  ];
  loading = false;
  productPageCounter = 1;
  additionalLoading = false;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private _route : Router
  ) {}

  public screenWidth: any;
  public screenHeight: any;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
  }

  forword(email:string){

    this._route.navigate(['/shop/TeM1oF5/'+email])

  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    this.loading = true;
    setTimeout(() => {
      this.productService.getAllProducts(9, this.productPageCounter).subscribe(
        (res: any) => {
          console.log(res);
          this.products = res;
          this.loading = false;
          console.log(this.products)
        },
        (err) => {
          console.log(err);
          this.loading = false;
        }
      );
    }, 500);
  }

  showMoreProducts(): void {
    this.additionalLoading = true;
    this.productPageCounter = this.productPageCounter + 1;
    setTimeout(() => {
      this.productService.getAllProducts(9, this.productPageCounter).subscribe(
        (res: any) => {
          console.log(res);
          this.products = [...this.products, ...res];
          this.additionalLoading = false;
        },
        (err) => {
          console.log(err);
          this.additionalLoading = false;
        }
      );
    }, 500);
  }
}
