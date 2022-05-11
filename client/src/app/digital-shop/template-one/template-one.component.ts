import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-template-one',
  templateUrl: './template-one.component.html',
  styleUrls: ['./template-one.component.scss']
})
export class TemplateOneComponent implements OnInit {

  cnfemail : string = ''
  userShopData = []
  products = []
  storyLength:number = 0

  constructor(
    private cnfEmailService : TokenStorageService,
    private _auth : AuthService,
    private route : ActivatedRoute,
    private _product : ProductService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.cnfEmailService.currentCnfEmail.subscribe( msg =>  this.cnfemail = msg);
    this.cnfemail = this.route.snapshot.paramMap.get('email');
    this._auth.getShopData(this.cnfemail).subscribe(
      (res: any) => {
        console.log(res);
        this.userShopData = res;
        console.log(this.userShopData)
      },
      (err) => {
        console.log(err);
      }
    );
    setTimeout(() => {
      this._product.getShopProduct(this.userShopData["shop_id"]).subscribe(
        (res: any) => {
          console.log(res);
          this.products = res;
          console.log(this.products)
        },
        (err) => {
          console.log(err);
        }
      );
    }, 500);


  }

}
