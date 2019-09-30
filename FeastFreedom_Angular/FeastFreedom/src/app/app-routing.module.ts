import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { KitchenComponent } from './kitchen/kitchen.component'
import { MenuComponent } from './menu/menu.component';
const routes: Routes = [
  {path: '',
  redirectTo: '/kitchen',
   pathMatch: 'full'},
  {path: 'login',
  component: LoginComponent},
  {path: 'register',
  component: RegisterComponent},
  {path: 'kitchen',
  component: KitchenComponent},
  {path: 'menu/:id',
  component: MenuComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
