import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.css']
})
export class RedirectComponent implements OnInit {
  param;
  url;
  constructor(private auth: AuthService, private _router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.url = this.route.snapshot.paramMap.get('url');
    this.param = this.route.snapshot.paramMap.get('param');
    if (!this.auth.logedIn) {
      this._router.navigate(['/login']);
    } else {
      this._router.navigate([this.url, this.param]);
    }
  }

}
