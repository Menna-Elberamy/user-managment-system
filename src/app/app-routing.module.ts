import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { LoginComponent } from './authientication/login/login.component';
import { ProfileComponent } from './profile/profile/profile.component';
import { LayoutComponent } from './shared/components/layout/layout.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path:'login',loadChildren: () => import('./authientication/authientication.module').then(m => m.AuthienticationModule)},
  {path:'dashboard',component:LayoutComponent,loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule)},
  {path:'profile',component:LayoutComponent,loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
