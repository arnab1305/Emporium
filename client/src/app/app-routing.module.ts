import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/components/login/login.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { ProductComponent } from './product/product.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { DashboardComponent } from './digital-shop/dashboard/dashboard.component';
import { CreateShopComponent } from './digital-shop/create-shop/create-shop.component';
import { TemplateOneComponent } from './digital-shop/template-one/template-one.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardService],
  },
  { path: 'product/:id', component: ProductComponent },
  { path: 'cart', component: CartComponent },
  {
    path: 'checkout',
    component: CheckoutComponent,
    //canActivate: [AuthGuardService],
  },
  {
    path: 'order-history',
    component: OrderHistoryComponent,
    //canActivate: [AuthGuardService],
  },
  {
    path: ':email/dashboard',
    component: DashboardComponent,
  },
  {
    path: 'create-shop',
    component: CreateShopComponent,
  },
  {
    path: 'shop/TeM1oF5/:email',
    component: TemplateOneComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
