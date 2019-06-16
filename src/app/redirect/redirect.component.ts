import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router} from '@angular/router';
@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.css']
})
export class RedirectComponent implements OnInit {

  constructor(private auth:AuthService,private _router: Router) { }

  ngOnInit() {
     if(!this.auth.logedIn){
       this._router.navigate(['/login']);
     }
     else{
       if(this.auth.adminLogedIn){
        this._router.navigate(['/Admin-menu/profile']);
       }
     }
  }

}
