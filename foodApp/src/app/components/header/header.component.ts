import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module'
import { LoginComponent } from '../login/login.component';
import { MatDialog } from '@angular/material/dialog';
import { SessionService } from 'src/app/utilities/session.service';
import { UserService } from 'src/app/utilities/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public dialog: MatDialog, private _sessionService:SessionService,private _userService:UserService) { }

  ngOnInit(): void {
  }

  openDialogLogin() {
    const dialogRef = this.dialog.open(LoginComponent);
  }

logout(){
  this._sessionService.clearSession();
  this._userService.resetLocalData();
}

}
