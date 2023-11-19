import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { userModel } from '../../models/users.model';
import { UsersState } from '../../state/user.state';
import { LoginAction } from '../../state/user.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  
  @Select(UsersState.authienticatedUser)
  loginState$!: Observable<userModel>;

  username:string='';
  userRole:string='';


  constructor(private router: Router,private store:Store) {}


  ngOnInit(): void {
    this.loginState$.subscribe((response:any) => {
      if (response  && Object.keys(response).length > 0) {
        const userDetail=response
        this.username=userDetail?.name;
        this.userRole=userDetail?.role!;
      }
      else{
        this.router.navigateByUrl('/login')
      }
    })
  }

  logout() {
    this.router.navigateByUrl('/login');
  }

  goProfile(){
    this.router.navigateByUrl('/profile');
  }
}
