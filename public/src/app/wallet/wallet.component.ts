import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {

  constructor(
    private httpService: HttpService,
  ) { }

    message: any;

    secondMessage: any;

  ngOnInit(): void {
    // this.Test()
    // this.anotherTest();

  }
  // Test(){
  //   let obs = this.httpService.serviceFunctionTest()
  //   obs.subscribe(response => {
  //     console.log("RESPONSE", response)
  //     // console.log('RESPONSE2', response['data']);
  //     // console.log(response.data)
  //     this.message = response;
  //   })
  // }
  // anotherTest(){
  //   let obs = this.httpService.secondServicFunctionTest()
  //   obs.subscribe(response => {
  //     console.log('ALL THE COIN DATA',response)
  //     this.secondMessage = response;
  //   })
  // }
} 
