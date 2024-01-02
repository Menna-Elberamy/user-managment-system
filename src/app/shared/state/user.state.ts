import { Injectable, NgZone } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { userModel } from '../models/users.model';
import { UsersService } from '../services/users.service';
import { tap, catchError, filter } from 'rxjs';
import {
  DeleteAuthintcatedUser,
  EditAuthintcatedUser,
  LoginAction,
  SaveAuthintcatedUser,
} from './user.actions';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

export interface userModelState {
  data: userModel[];
  authienticatedUser?: Partial<userModel>;
}
@State<string[]>({
  name: 'userState',
  defaults: [],
})
@Injectable()
export class UsersState {
  userList: userModel[] = [];
  constructor(
    private userService: UsersService,
    private toaster: ToastrService,
    private router: Router,
    private ngZone: NgZone
  ) {}

  @Selector()
  static authienticatedUser(state: userModelState) {
    return state.authienticatedUser;
  }
  @Selector()
  static usersState(state: userModelState) {
    return state.data;
  }

  @Action(LoginAction)
  loginAction(
    { setState, dispatch, patchState }: StateContext<userModelState>,
    { credentials }: LoginAction
  ) {
    return this.userService.getAllUsers().pipe(
      tap((response: any) => {
        this.userList = response;
        const loggedInUser = response.find(
          (user: userModel) => user.email === credentials.email
        );
        if (loggedInUser) {
          const authenticatedUser = loggedInUser;
          if (authenticatedUser.id === 1) {
            authenticatedUser.role = 'admin';
          } else {
            authenticatedUser.role = 'user';
          }
          patchState({ authienticatedUser: authenticatedUser });
          patchState({ data: this.userList });
          this.navigateBasedOnRole(authenticatedUser.role);
          localStorage.setItem("role",authenticatedUser.role)
        } else {
          this.toaster.error(
            'Service error',
            `${credentials.email} is not found`,
            { timeOut: 3000 }
          );
          patchState({authienticatedUser:{name:''}})
        }
      }),
      catchError((error) => {
        this.toaster.error('Client error', error.error.error, {
          timeOut: 3000,
        });
        return error;
      })
    );
  }

  @Action(EditAuthintcatedUser)
  editAuthintcatedUser(
    { getState, patchState }: StateContext<userModelState>,
    { user }: EditAuthintcatedUser
  ) {
    return this.userService.editUser(user).pipe(
      tap((response: any) => {
        const state = getState().data;
        const authedUserstate = getState().authienticatedUser;
        const updatedUserIndex = state.findIndex(
          (user: userModel) => user.id == user.id
        );
        if (updatedUserIndex != -1) {
          state[updatedUserIndex] = user;
        }
        if(authedUserstate?.id==user.id){
          patchState({authienticatedUser:user})
        }
        patchState({ data: state });
        this.toaster.success('sucess', 'user updated sucessfully', {
          timeOut: 3000,
        });
      }),
      catchError((error) => {
        this.toaster.error('Client error', error.error.error, {
          timeOut: 3000,
        });
        return error;
      })
    );
  }

  @Action(DeleteAuthintcatedUser)
  deleteAuthintcatedUser(
    { getState, patchState }: StateContext<userModelState>,
    { userId }: DeleteAuthintcatedUser
  ) {
    return this.userService.deleteUser(userId).pipe(
      tap((response: any) => {
        const state = getState().data;
        const filteredUsers = state.filter(
          (user: userModel) => user.id != userId
        );
        patchState({ data: filteredUsers });
        this.toaster.success('sucess', 'user deleted sucessfully', {
          timeOut: 3000,
        });
      }),
      catchError((error) => {
        this.toaster.error('Client error', error.error.error, {
          timeOut: 3000,
        });
        return error;
      })
    );
  }

  private navigateBasedOnRole(role: string): void {
    this.ngZone.run(() => {
      if (role === 'admin') {
        this.router.navigateByUrl('/dashboard');
      } else {
        this.router.navigateByUrl('/profile');
      }
    });
    // if (role === 'admin') {
    //   this.router.navigateByUrl('/dashboard');
    // } else {
    //   this.router.navigateByUrl('/profile');
    // }
  }
}
