import {Injectable} from '@angular/core';
import {CanActivate, Router, CanActivateChild} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardGuard implements CanActivate, CanActivateChild {
  constructor(private _authservice: AuthService,
              private router: Router) {

  }

  canActivate(): boolean {
    if (!this._authservice.logedIn()) {
      this.router.navigate(['/login']);
      return false;
    } else if (!this._authservice.adminLogedIn()) {
      this.router.navigate(['/access-denied']);
      return false;
    }
    return true;
  }

  canActivateChild(): boolean {
    if (!this._authservice.logedIn()) {
      this.router.navigate(['/login']);
      return false;
    } else if (!this._authservice.adminLogedIn()) {
      this.router.navigate(['/events']);
      return false;
    }
    return true;
  }
}
