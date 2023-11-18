import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { userModel } from '../models/users.model';
import { UsersService } from '../services/users.service';
import { tap, catchError, filter } from 'rxjs';
import { GetAuthintcatedUsers, LoginAction } from './user.actions';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@State<string[]>({
  name: 'userState',
  defaults: []
})
@Injectable()
export class UsersState {
    constructor(private userService:UsersService,
                private toaster:ToastrService,
                private router:Router){}

    @Selector()
    static authienticatedUser(state: userModel) {
        return state;
    }

    
    @Action(LoginAction)
    loginAction({ setState, dispatch ,getState}: StateContext<userModel>, { credentials }: LoginAction) {
      return this.userService.getAllUsers().pipe(
        tap((response: any) => {
          const filteredUser = response.filter((user:userModel) => user.email === credentials.email);
          if (filteredUser.length > 0) {
            const filteredUsers = filteredUser[0];
    
            if (filteredUsers.email === 'Sincere@april.biz') {
              filteredUsers.role = 'admin';
            } else {
              filteredUsers.role = 'user';
            }
            this.navigateBasedOnRole( filteredUsers.role);
        
        }
            else{
                this.toaster.error('Service error', "User not found", { timeOut: 3000 });
            }
        dispatch(new GetAuthintcatedUsers(filteredUser))
        setState(filteredUser)
        }),
        catchError((error) => {
          this.toaster.error('Client error', error.error.error, { timeOut: 3000 });
          return error;
        })
      );
    }

    private navigateBasedOnRole(role: string): void {
        if (role === 'admin') {
          this.router.navigate(['/dashboard']);
        } 
        else {
            this.router.navigate(['/profile']);
        }
      }



}