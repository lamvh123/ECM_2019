import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TeacherGuard implements CanActivate {
  constructor(private _authservice: AuthService,
    private router: Router) {

  }

  canActivate(): boolean {
    if (!this._authservice.logedIn()) {
      this.router.navigate(['/login']);
      return false;
    } else if (!this._authservice.TeacherLoggedIn()) {
      this.router.navigate(['/access-denied']);
      return false;
    }
    return true;
  }
}
