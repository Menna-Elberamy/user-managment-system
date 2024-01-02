import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { userModel } from '../models/users.model';
import { UsersState } from '../state/user.state';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class roleGuard implements CanActivate {
  @Select(UsersState.authienticatedUser)
  authenticatedUser$!: Observable<userModel>;
  authenticatedUser!:userModel;
  role=localStorage.getItem("role");


  constructor(private router: Router, private toaster:ToastrService) { 
    this.authenticatedUser$.subscribe((response:any) => {
      if (response) {
        this.authenticatedUser=response
      }
    });
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    return this.checkRole();
  }

  private checkRole(): boolean {
    if (this.authenticatedUser?.role=='admin' || this.role=='admin') {
      return true;
    } else {
      this.router.navigate(['401-unauthorized']);
      this.toaster.error('Client error', "you don't have permission to access",{timeOut: 3000});
      return false;
    }
  }
}