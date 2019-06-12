import { Injectable } from '@angular/core';
import { CanActivate,Router} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements  CanActivate{
   constructor(private _authservice:AuthService,
    private router: Router){

    }
    canActivate():boolean{
      if(this._authservice.logedIn()){
        
        return true;
      }
      else{
        this.router.navigate(['/login']);
        return false;
      }
    }
}
