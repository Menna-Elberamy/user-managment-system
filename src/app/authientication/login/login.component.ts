import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  showLoader:boolean=false;

  constructor(private fb:FormBuilder,private router:Router){

   this.loginForm= this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
  
  
  ngOnInit(): void {

  }
  submit(){
    this.showLoader=true;
    if (this.loginForm.invalid) {
      return;
    } else {
      this.router.navigate(['/dashboard']);
    }
  }


}
