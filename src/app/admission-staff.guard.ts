import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdmissionStaffGuard implements CanActivate {
  constructor(private _authservice: AuthService,
    private router: Router) {
  }

  canActivate(): boolean {
    if (!this._authservice.logedIn()) {
      this.router.navigate(['/login']);
      return false;
    } else if (!this._authservice.admissionStaffLogedIn()) {
      this.router.navigate(['/access-denied']);
      return false;
    }
    return true;
  }


}
