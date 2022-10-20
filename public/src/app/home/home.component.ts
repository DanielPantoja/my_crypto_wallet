import { Component, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { HttpService } from '../http.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private httpService: HttpService,
    private dialog: MatDialog,
    private router: Router,

  ) { }
    private authListenerSubs: any;
    message: any;
    marketCap: any;
    marketCapPercentage = ''
    userIsAuthenticated = false;

  ngOnInit(): void {
    this.anotherTest();
    this.testApi();
    this.userIsAuthenticated = this.httpService.getIsAuth();
    this.authListenerSubs = this.httpService.getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    })
  }
  anotherTest(){
    let obs = this.httpService.secondServicFunctionTest()
    obs.subscribe(response => {
      this.message = response;
      console.log("MESSAGE", this.message)
    })
  }
  testApi(){
    let obs = this.httpService.serviceFunctionTest()
    obs.subscribe(response => {
      this.marketCap = response
    })
  }
  openLogin(){
    let dialogRef = this.dialog.open(LoginComponent)
    console.log('this is the opening of the login component')
  }
  openSignUp(){
    let dialogRef = this.dialog.open(SignUpComponent)
  }
  routeHome(){
    this.router.navigate(['/'])
  }
  onLogOut(){
    this.httpService.logOut()
  }
}
