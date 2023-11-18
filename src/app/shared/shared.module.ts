import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { LoaderComponent } from './components/loader/loader.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { LayoutComponent } from './components/layout/layout.component';
import { sharedRoutingModule } from './shared-routing.module';



@NgModule({
  declarations: [
    HeaderComponent,
    LoaderComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    ToastrModule.forRoot(),
    sharedRoutingModule
    
  ],
  exports:[
    HeaderComponent,
    LoaderComponent
  ]
})
export class SharedModule { }
