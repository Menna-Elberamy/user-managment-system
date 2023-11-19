import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { userModel } from 'src/app/shared/models/users.model';
import { EditAuthintcatedUser } from 'src/app/shared/state/user.actions';
import { UsersState } from 'src/app/shared/state/user.state';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
  @Select(UsersState.authienticatedUser)
  authenticatedUser$!: Observable<userModel>;
  authenticatedUser!:userModel;
  profileForm!:FormGroup;
  editMode:boolean=false;

  constructor(private fb:FormBuilder,
              private store:Store){}

  
  ngOnInit(): void {
    this.setProfileForm();
    this.authenticatedUser$.subscribe((response:any) => {
      if (response) {
        this.authenticatedUser=response
       this.patchProfileForm(response)
        this.profileForm.disable(); 
      }

    })

  }
  editProfile(){
    this.profileForm.enable();
    this.editMode=true;
   
  }
  submit(){
    this.store.dispatch(new EditAuthintcatedUser(this.profileForm.value));
    this.profileForm.disable(); 
    this.editMode=false;

  }

  patchProfileForm(profileData:userModel){
    this.profileForm.setValue({
      id:profileData.id,
      name: profileData.name,
      email: profileData.email,
      phone: profileData.phone,
      role: profileData.role,
    });
  }

  setProfileForm(userModel?:userModel){
    this.profileForm=this.fb.group({
      id:[userModel?.id ?? ''],
      name: [userModel?.name ?? ''],
      email: [userModel?.email ?? '', [Validators.email]],
      phone: [userModel?.phone ?? ''],
      role:[{value:userModel?.role,disabled:true}],
    });
  }

}
