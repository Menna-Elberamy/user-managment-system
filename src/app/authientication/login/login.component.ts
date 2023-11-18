import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router, RouterLink } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { userModel } from 'src/app/shared/models/users.model';
import { UsersService } from 'src/app/shared/services/users.service';
import { LoginAction } from 'src/app/shared/state/user.actions';
import { UsersState } from 'src/app/shared/state/user.state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  showLoader:boolean=false;

  @Select(UsersState.authienticatedUser)
  loginState$!: Observable<userModel>;

  constructor(private fb:FormBuilder,
              private toaster:ToastrService,
              private router:Router,
              private store:Store){

   this.loginForm= this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
  
  
  ngOnInit(): void {
    this.loginState$.subscribe((response) => {
      if (response) {
        console.log("user state")
        console.log(response)
        // this.router.navigate(['/users']);
      }
    })

  }
  submit(){
    // this.showLoader=true;
    if (this.loginForm.invalid) {
      return;
    } else {
      // this.toaster.error('Client error', "errorMessage",{timeOut: 3000});

      this.store.dispatch(new LoginAction(this.loginForm.value));

      // this.router.navigate(['/dashboard']);
    }
  }


}
