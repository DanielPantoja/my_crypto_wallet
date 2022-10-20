import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HttpService } from './http.service';
import { WalletComponent } from './wallet/wallet.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { PortfolioFormComponent } from './portfolio-form/portfolio-form'
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button'

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
// import { BrowserAnimationModule } from '@angular/animations'
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule} from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component'

import { LayoutModule } from '@angular/cdk/layout';
import { NavComponent } from './nav/nav.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WalletComponent,
    PortfolioComponent,
    PortfolioFormComponent,
    LoginComponent,
    SignUpComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,


    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,

    BrowserAnimationsModule,
    FormsModule,
    LayoutModule

  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
