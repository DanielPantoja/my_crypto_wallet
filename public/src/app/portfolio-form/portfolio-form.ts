import {Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { HttpService } from '../http.service';

@Component({
    selector: 'portfolio-form',
    templateUrl: './portfolio-form.html',
    styleUrls: ['./portfolio-form.css']
})
export class PortfolioFormComponent implements OnInit {

    constructor(@Inject(MAT_DIALOG_DATA) public data: { userId: string }, public dialogRef: MatDialogRef<PortfolioFormComponent>, private httpService: HttpService){}
    uId: any = null;
    coins: Array<string> = [];
    favoriteCoins: Array<string> = [];

    ngOnInit(): void{
        this.uId = this.data.userId
        this.getData();
    }
    getData(){
        let obs = this.httpService.secondServicFunctionTest()
        obs.subscribe((response: any) => {
            this.coins = response.response.map((c: any) => c.name,)
        })
    }
    closeForm(){
        console.log('this button works');
        console.log(this.dialogRef)
        this.dialogRef.close()
    }
    addCoin(form: NgForm){
        console.log('FORM',form.form.controls)
        console.log('FORM',form.form.value)
        this.favoriteCoins.push(form.value.coins)
        console.log('Favorite Coins', this.favoriteCoins)
        // let obs = this.httpService.addCoin(form.value.coin);
        // obs.subscribe(() => {
        //     this.dialogRef.close()
        //     this.getUserData();
        // })
    }
}