// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UserFormComponent } from './pages/user-form/user-form.component';
import { UserViewComponent } from './pages/user-view/user-view.component';
import { UserguardGuard } from './userguard.guard';
import { BuyComponent } from './pages/buy/buy.component';
import { RegisterComponent } from './pages/register/register.component';
import { TradeListComponent } from './pages/trade-list/trade-list.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent }, // Login route
  {
    path: '', // Default route after login
    canActivate: [UserguardGuard], // Requires authentication
    children: [
      { path: 'dashboard', component: DashboardComponent }, // Dashboard accessible after login
      { path: 'user-form', component: UserFormComponent },
      { path: 'user-view', component: UserViewComponent },
      { path: 'buy', component: BuyComponent },
      { path: 'trade-list', component: TradeListComponent },
      { path: 'register', component: RegisterComponent },
      { path: '**', redirectTo: 'dashboard' } // Redirect to dashboard if an invalid route is entered
    ]
  },
  { path: '**', redirectTo: 'dashboard' } // Redirect to login if an invalid route is entered
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
