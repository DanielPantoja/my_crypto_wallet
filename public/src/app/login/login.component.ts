import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private httpService: HttpService, public dialogRef: MatDialogRef<LoginComponent>) { }

  newUser: any;

  ngOnInit(): void {
    this.newUser = {
      email: '',
      password: ''
    }
  }

  onLogin(form: NgForm){
    if( form.invalid){
      return
    }
    this.httpService.login(form.value.email, form.value.password)
    this.dialogRef.close()
  }
}
