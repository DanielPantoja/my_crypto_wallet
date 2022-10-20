import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PortfolioFormComponent } from '../portfolio-form/portfolio-form';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  openForm(){
    let dialogRef = this.dialog.open(PortfolioFormComponent, {data: {userId: 'fakeUserId'}})
  }
}
