import { Routes } from '@angular/router';
import { LoginComponent } from './view/login/login.component';
import { HomeComponent } from './view/home/home.component';
import { CustomerComponent } from './view/customer/customer.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'customer', component: CustomerComponent },
];
