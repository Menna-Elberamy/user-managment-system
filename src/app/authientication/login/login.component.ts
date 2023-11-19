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
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup;
  showLoader: boolean = false;

  @Select(UsersState.authienticatedUser)
  loginState$!: Observable<userModel>;

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.createForm();
    this.loginState$.subscribe((response:any) => {
      if (response && response.name=='') {
       this.showLoader=false;
      }
    });
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  submit() {
    if (this.loginForm.valid) {
      this.showLoader=true;
      this.store.dispatch(new LoginAction(this.loginForm.value));
    } 
    else {
      this.loginForm.markAllAsTouched()
      // this.toaster.error('Client error', "errorMessage",{timeOut: 3000});
    }
  }

}
