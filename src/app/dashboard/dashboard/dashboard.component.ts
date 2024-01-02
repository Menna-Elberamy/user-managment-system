import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { userModel } from 'src/app/shared/models/users.model';
import { DeleteAuthintcatedUser, EditAuthintcatedUser } from 'src/app/shared/state/user.actions';
import { UsersState } from 'src/app/shared/state/user.state';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  @ViewChild('closeModal') closeModal!: ElementRef;

  @Select(UsersState.usersState)
  userState$!: Observable<userModel[]>;
  editUserForm!:FormGroup;

  userList:any;

  constructor(private store:Store,private fb:FormBuilder){}

  ngOnInit(): void {
    this.userState$.subscribe((response:any) => {
      if (response) {
        this.userList=response;
        // this.router.navigate(['/users']);
      }
    });
    this.setForm();
  }
  deleteUser(id:number){
    this.store.dispatch(new DeleteAuthintcatedUser(id))
  }
  editUser(){
    if(this.editUserForm.value.id != 1){
      this.editUserForm.patchValue({'role':'user'})
    }
    this.store.dispatch(new EditAuthintcatedUser(this.editUserForm.value));
    this.closeModal.nativeElement.click();
  }
  openEditModal(userModel:userModel){
    this.setForm(userModel);
  }

  setForm(userModel?:userModel){
    this.editUserForm=this.fb.group({
      id:[userModel?.id ?? ''],
      name: [userModel?.name ?? ''],
      email: [userModel?.email ?? '', [Validators.email]],
      phone: [userModel?.phone ?? ''],   
      role:[userModel?.role ?? 'admin']   
    });
  }



  

}
