import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { ProfileModule } from './profile/profile.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { AuthienticationModule } from './authientication/authientication.module';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { UsersState } from './shared/state/user.state';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ProfileModule,
    DashboardModule,
    AuthienticationModule,
    HttpClientModule,
    // ToastrModule.forRoot(),
    // BrowserAnimationsModule,
    NgxsModule.forRoot([UsersState])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
