import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UserFormComponent } from './pages/user-form/user-form.component';
import { UserViewComponent } from './pages/user-view/user-view.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BuyComponent } from './pages/buy/buy.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';


// Import services here
import { HttpClientModule } from '@angular/common/http';
import { TradeListComponent } from './pages/trade-list/trade-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UserFormComponent,
    UserViewComponent,
    BuyComponent,
    RegisterComponent,
    LoginComponent,
    LayoutComponent,
    TradeListComponent
  ],
  imports: [

    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule, HttpClientModule, BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
