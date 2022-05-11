import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from './api.service';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject: BehaviorSubject<any>;
  public user: Observable<any>;

  constructor(private _api: ApiService, private _token: TokenStorageService) {
    this.userSubject = new BehaviorSubject<any>(this._token.getUser());
    this.user = this.userSubject.asObservable();
  }

  getUser() {
    console.log(this.userSubject);
    console.log(this.userSubject.value);
    return this.userSubject.value;
  }

  login(credentials: any): Observable<any> {
    return this._api
      .postTypeRequest('auth/login', {
        email: credentials.email,
        password: credentials.password,
      })
      .pipe(
        map((res: any) => {
          let user = {
            email: credentials.email,
            token: res.token,
          };
          this._token.setToken(res.token);
          this._token.setUser(res.data[0]);
          console.log(res);
          this.userSubject.next(user);
          return user;
        })
      );
  }

  register(user: any): Observable<any> {
    console.log(user.fullName)
    console.log(user.email)
    console.log(user.password)
    return this._api.postTypeRequest('auth/register', {
      fullName: user.fullName,
      email: user.email,
      password: user.password,
    });
  }
  registerProduct(product: any):Observable<any>{

    return this._api.postTypeRequest('products',{

      shop_id: product.shop_id,
      id: product.id,
      title: product.title,
      category: product.category,
      short_desc: product.short_desc,
      image: product.image,
      price: product.price,
      quantity:product.quantity,
      images:product.images

    });

  }
  putShopData(data :any , email:any):Observable<any>{

    return this._api.putTypeRequest('auth/update/'+ email,{

      shop_id : data.shop_id,
      shop_name : data.shop_name,
      cover : data.cover,
      story: data.story,
      category: data.category,
      hitCounter : 0

    });

  }

  logout() {
    this._token.clearStorage();
    this.userSubject.next(null);
  }
  getShopData(email: any):Observable<any>{

    return this._api.getTypeRequest('users/'+email);

  }
}
