import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpService } from '../http.service';
import { LoginComponent } from '../login/login.component';
import { SignUpComponent } from '../sign-up/sign-up.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  public authListenerSubs: Subscription = new Subscription;
  userIsAuthenticated = false;

  constructor(
    private httpService: HttpService,
    private dialog: MatDialog,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.userIsAuthenticated = this.httpService.getIsAuth();
    this.authListenerSubs = this.httpService.getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    })
  }
  // ngOnDestroy(){
  //   this.authListenerSubs.unsubscribe();
  // }
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
