import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module'
import { LoginComponent } from '../login/login.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialogLogin() {
    const dialogRef = this.dialog.open(LoginComponent);
  }

}
