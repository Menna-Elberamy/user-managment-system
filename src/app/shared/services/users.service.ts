import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { userModel } from '../models/users.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  baseUrl=environment.baseApiUrl

  constructor(private http: HttpClient,private toastr:ToastrService) { }

  getAllUsers(): Observable<userModel> {
    return this.http.get<userModel>(this.baseUrl+'/users')
      .pipe(
        catchError(this.handleError)
      );
  }
  deleteUser(id:number): Observable<any> {
    return this.http.delete(this.baseUrl+`/users/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }
  editUser(userModel:userModel): Observable<userModel> {
    return this.http.put<userModel>(this.baseUrl+`/users/${userModel.id}`,userModel)
      .pipe(
        catchError(this.handleError)
      );
  }
  

  private handleError(error: HttpErrorResponse) {
    
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client error: ${error.error.message}`;
      this.toastr.error('Client error', errorMessage,{timeOut: 3000});

    } else {
      errorMessage = `Server error: ${error.status}, ${error.error.message}`;
      this.toastr.error('Client error', errorMessage,{timeOut: 3000});
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
