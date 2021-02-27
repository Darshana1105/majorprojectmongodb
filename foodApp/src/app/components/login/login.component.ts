import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserService } from 'src/app/utilities/user.service';
import { SessionService } from 'src/app/utilities/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  currentIndex = 0;

  loginForm: any;
  emailRegx = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
  phoneRegx = ("^((\\+91-?)|0)?[0-9]{10}$")
  zipRegx = ("^((\\+91-?)|0)?[0-9]{6}$")
  registerForm: any;
  submitted = false;
  isUserExist: boolean = false;
  errMsg: any;

  private selectedRole: string = "user";

  setradio(e: string): void {
    this.selectedRole = e;
  }

  isSelected(name: string): boolean {
    if (!this.selectedRole) {
      // if no radio button is selected, always return false so every nothing is shown  
      return false;

    }
    return (this.registerForm.value.role === name); // if current radio button is selected, return true, else return false  
  }



  constructor(private formBuilder: FormBuilder, private _userService: UserService, private _sessionService: SessionService) { }
  hide = true;
  hideSign = true;
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(this.emailRegx)]],
      password: [null, Validators.required]
    });


  }


  //login
  submit() {
    if (!this.loginForm.valid) {
      return;
    }
    console.log("In submit button");
    
    this._userService.userLogin(this.loginForm.value).subscribe((data) => {
      console.log("Data:", data);
      this._sessionService.setLocalSession(data.token);

      this._userService.updateUserDataLocal();

    }, (err: any) => {
      this.errMsg = err.error.message;
      console.log("Message err:", this.errMsg);
    })
  }

  //this._userService.userLogin()

  get f() { return this.registerForm.controls; }

  // register

  forgotpassword: boolean=false;

  forgotPassword(){
    this.forgotpassword=true;
  }


  email = new FormControl('', [Validators.required, Validators.email]);
  formOtp = new FormControl('', [Validators.required]);
  otp: any;
  readonlyEmail: boolean = false;
  readonlyOtp: boolean = true;

  resetPassword: boolean=false;
  newPassword=new FormControl('',[Validators.required, Validators.minLength(6)])
  

  sendOtpForResetpassword() {
    // console.log(this.email.value);
    if (this.email.valid) {
      this._userService.sendOtpForResetPassword(this.email.value).subscribe((data) => {
        this.otp = data;
        console.log("Otp is :" + this.otp);
        this.readonlyOtp = false;
      },(err : any)=>{
        console.log(err);
      });
    }
  }


  checkOtp() {
    console.log("in check otp");
    
    if (this.otp != null && this.otp == this.formOtp.value) {
      this.resetPassword=true;
      this.readonlyEmail = true;
      this.readonlyOtp=true;
    }
  }

  errForgotPassword:any;

  confirmResetPassword(){
    let newData = {
      email:this.email.value,
      newPassword:this.newPassword.value
    }
    this._userService.resetPassword(newData).subscribe((data)=>{
      alert("Password updated successfully...");
      this.forgotpassword=false;
    },(err)=>{
      console.log(err);
      this.errForgotPassword=err.error.text      
    })
  }
}
