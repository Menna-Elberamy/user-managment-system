import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { LoginComponent } from './authientication/login/login.component';
import { roleGuard } from './shared/guards/role.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component:LoginComponent},
  {path:'dashboard',
    component:LayoutComponent,loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule),
    canActivate:[roleGuard]
    },
  {path:'profile',component:LayoutComponent,loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)},

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
