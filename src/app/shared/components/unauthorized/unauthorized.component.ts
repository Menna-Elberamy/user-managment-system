import { Component } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.scss']
})
export class UnauthorizedComponent {
  constructor(private _location: Location) 
  {}

  backClicked() {
    this._location.back();
  }
}
