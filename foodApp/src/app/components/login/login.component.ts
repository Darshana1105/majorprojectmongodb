import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserServiceService } from 'src/app/utilities/user-service.service';
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



  constructor(private formBuilder: FormBuilder, private _userService: UserServiceService, private _sessionService: SessionService) { }
  hide = true;
  hideSign = true;
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(this.emailRegx)]],
      password: [null, Validators.required]
    });


    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      mobileNumber: ['', [Validators.required, Validators.pattern(this.phoneRegx)]],
      gender: ['', Validators.required],
      role: ['user'],
      streetAddress: [''],
      city: [''],
      state: [''],
      country: [''],
      zip: ['', [Validators.pattern(this.zipRegx)]],
      landmark: [''],
      area: [''],
      vehicleNumber: ['']
    });
    this.registerForm.get('role').valueChanges.subscribe((val: any) => {
      if (val == 'de') {
        this.registerForm.get('streetAddress').setValidators(Validators.required);
        this.registerForm.get('city').setValidators(Validators.required);
        this.registerForm.get('state').setValidators(Validators.required);
        this.registerForm.get('country').setValidators(Validators.required);
        this.registerForm.get('zip').setValidators(Validators.required);
        this.registerForm.get('vehicleNumber').setValidators(Validators.required);
        this.registerForm.get('landmark').setValidators(Validators.required);
        this.registerForm.get('area').setValidators(Validators.required);
      }
      else {
        this.registerForm.get('streetAddress').clearValidators(Validators.required);
        this.registerForm.get('city').clearValidators(Validators.required);
        this.registerForm.get('state').clearValidators(Validators.required);
        this.registerForm.get('country').clearValidators(Validators.required);
        this.registerForm.get('zip').clearValidators(Validators.required);
        this.registerForm.get('vehicleNumber').clearValidators(Validators.required);
        this.registerForm.get('landmark').clearValidators(Validators.required);
        this.registerForm.get('area').clearValidators(Validators.required);
      }
    })
  }



  //login
  submit() {
    if (!this.loginForm.valid) {
      return;
    }
    this._userService.userLogin(this.loginForm.value).subscribe((data) => {
      console.log("Data:", data);
      this._sessionService.setLocalSession(data.token);

      this._userService.updateUserDataLocal();

    }, (err) => {
      this.errMsg = err.error.message;
      console.log("Message err:", this.errMsg);
    })
  }

  //this._userService.userLogin()

  get f() { return this.registerForm.controls; }

  // register
  onSubmit() {
    if (!this.registerForm.valid) {
      return;
    }
    this.submitted = true;

    this._userService.addUser(this.registerForm.value).subscribe((data) => {
      if (data.code && data.code == 11000) {
        this.isUserExist = true;
      }
      else {
        this.isUserExist = false;
        this.currentIndex = 0;
      }
    });

  }

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
      },(err)=>{
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
