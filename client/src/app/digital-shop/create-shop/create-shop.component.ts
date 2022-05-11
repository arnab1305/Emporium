import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
@Component({
  selector: 'app-create-shop',
  templateUrl: './create-shop.component.html',
  styleUrls: ['./create-shop.component.scss']
})
export class CreateShopComponent implements OnInit {
  httpClient: any;

  constructor(
    private _auth: AuthService,
    private cnfEmailService: TokenStorageService,
  ) { }

  ngOnInit(): void {
  }

  stepValue:number = 0;
  shopName:string = '';
  fileToUpload: File | null = null;
  aboutShop:string = '';
  category1:string = '';
  category2:string = '';
  category3:string = '';
  errorMessage:string = '';
  product1id:number ;product2id:number ;product3id:number ;product4id:number ;product5id:number ;
  product1title:string='';product2title:string='';product3title:string='';product4title:string='';product5title:string='';
  product1category:string;product2category:string;product3category:string;product4category:string;product5category:string;
  product1short_desc:string;product2short_desc:string;product3short_desc:string;product4short_desc:string;product5short_desc:string;
  product1cover:string;product2cover:string;product3cover:string;product4cover:string;product5cover:string;
  product1price:number;product2price:number;product3price:number;product4price:number;product5price:number;
  product1quantity:number;product2quantity:number;product3quantity:number;product4quantity:number;product5quantity:number;
  product1images:string;product2images:string;product3images:string;product4images:string;product5images:string;
  cnfemail:string = '';
  shop_id:number = Math.floor(Math.random() * 10000) + 1;
  cover= 'null';
  categoryup = []

  nextLast(index:number){

    if(this.stepValue == 0){

      console.log(this.shopName);

    }
    if(this.stepValue == 20){

      // this.postFile(this.fileToUpload)

    }
    if(this.stepValue == 40){

      console.log(this.aboutShop)

    }
    if(this.stepValue == 60){

      this.categoryup = [this.category1,this.category2,this.category3]
      this._auth
          .putShopData({
            shop_id : this.shop_id,
            shop_name : this.shopName,
            cover : this.cover,
            story : this.aboutShop,
            category : this.categoryup,
            hitCounter : 0,
          },this.cnfemail)
          .subscribe(
            (res) => {
              console.log(res);
            },
            (err) => {
              this.errorMessage = err.error.message;
            }
          );

    }
    if(this.stepValue == 80){
      if(this.product1title != ''){
        this._auth
          .registerProduct({
            shop_id: this.shop_id,
            id : this.product1id,
            title : this.product1title,
            category: this.product1category,
            short_desc: this.product1short_desc,
            image: this.product1title,
            price: this.product1price,
            quantity: this.product1quantity,
            images: this.product1title
          })
          .subscribe(
            (res) => {
              console.log(res);
            },
            (err) => {
              this.errorMessage = err.error.message;
            }
          );
      }
      if(this.product2title != ''){
        this._auth
          .registerProduct({
            shop_id: this.shop_id,
            id : this.product2id,
            title : this.product2title,
            category: this.product2category,
            short_desc: this.product2short_desc,
            image: this.product2title,
            price: this.product2price,
            quantity: this.product2quantity,
            images: this.product2title
          })
          .subscribe(
            (res) => {
              console.log(res);
            },
            (err) => {
              this.errorMessage = err.error.message;
            }
          );
      }
      if(this.product3title != ''){
        this._auth
          .registerProduct({
            shop_id: this.shop_id,
            id : this.product3id,
            title : this.product3title,
            category: this.product3category,
            short_desc: this.product3short_desc,
            image: this.product3title,
            price: this.product3price,
            quantity: this.product3quantity,
            images: this.product3title
          })
          .subscribe(
            (res) => {
              console.log(res);
            },
            (err) => {
              this.errorMessage = err.error.message;
            }
          );
      }
      if(this.product4title != ''){
        this._auth
          .registerProduct({
            shop_id: this.shop_id,
            id : this.product4id,
            title : this.product4title,
            category: this.product4category,
            short_desc: this.product4short_desc,
            image: this.product4title,
            price: this.product4price,
            quantity: this.product4quantity,
            images: this.product4title
          })
          .subscribe(
            (res) => {
              console.log(res);
            },
            (err) => {
              this.errorMessage = err.error.message;
            }
          );
      }
      if(this.product5title != ''){
        this._auth
          .registerProduct({
            shop_id: this.shop_id,
            id : this.product5id,
            title : this.product5title,
            category: this.product5category,
            short_desc: this.product5short_desc,
            image: this.product5title,
            price: this.product5price,
            quantity: this.product5quantity,
            images: this.product5title
          })
          .subscribe(
            (res) => {
              console.log(res);
            },
            (err) => {
              this.errorMessage = err.error.message;
            }
          );
      }


          this.cnfEmailService
          .updateCnfEmail(this.cnfemail)


    }

    if(this.stepValue <100 && index==1){
      this.stepValue = this.stepValue+20;
    }
    if(this.stepValue !=0 && index==-1){
      this.stepValue = this.stepValue-20;
    }


  }

  handleFileInput(files: FileList): void {
    this.fileToUpload = files.item(0);
  }
  postFile(fileToUpload: File): Observable<boolean> {
    const endpoint = '/client/src/assets';
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    return this.httpClient
      .post(endpoint, formData)
      .map(() => { return true; })
      .catch((e) => this.handleError(e));
}
  handleError(e: any) {
    throw new Error('Method not implemented.');
  }



}
