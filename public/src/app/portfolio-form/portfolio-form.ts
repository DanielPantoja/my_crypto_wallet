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

    coins: any

    ngOnInit(): void{
        this.getData();
    }
    getData(){
        let obs = this.httpService.secondServicFunctionTest()
        obs.subscribe((response: any) => {
            // this.coins = response.response.map((c: any) => c.name)
            this.coins = response.response.map((c: any) => ({ name: c.name, id: c.id }))
            console.log('COINS', this.coins)
        })
    }
    closeForm(){
        console.log('this button works');
        console.log(this.dialogRef)
        this.dialogRef.close()
    }
    addCoin(form: NgForm){
        console.log('FORM',form.form.controls)
        console.log('FORM2',form.form.value)
        // let coin = form.form.value.coins
        let coin = form.form.value.coins
        let obs = this.httpService.addCoin(coin);
        obs.subscribe(() => {
            this.dialogRef.close()
        })
    }
}