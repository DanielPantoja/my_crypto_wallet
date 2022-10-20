import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private httpService: HttpService, public dialogRef: MatDialogRef<SignUpComponent>) { }

  ngOnInit(): void {
  }
  signUp(form: NgForm){
    if(form.invalid){
      console.log('invalid form')
      return 
    }
    let newUser = {
      first_name: form.value.first_name,
      last_name: form.value.last_name,
      email: form.value.email,
      password: form.value.password,
    }
    this.httpService.signUp(newUser);
    this.dialogRef.close()
  }
}
