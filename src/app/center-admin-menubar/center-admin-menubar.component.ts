import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-center-admin-menubar',
  templateUrl: './center-admin-menubar.component.html',
  styleUrls: ['./center-admin-menubar.component.css', '../../assets/plugins/bootstrap/css/bootstrap.min.css',
    '../../assets/plugins/dropzone/dropzone.css', '../css/assets/plugins/bootstrap-material-datetimepicker/css/bootstrap-material-datetimepicker.css',
    '../../assets/plugins/waitme/waitMe.css',
    '../../assets/plugins/bootstrap-select/css/bootstrap-select.css',
    '../../assets/css/main.css',
    '../../assets/css/themes/all-themes.css']
})
export class CenterAdminMenubarComponent implements OnInit {

  urlName;

  constructor(private _router: Router, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.urlName = this.className();
    console.log(this.urlName);
  }

  className(): String {
    if (this._router.url == '/CenterAdmin/profile') {
      return '/CenterAdmin/profile';
    }
    if (this._router.url == '/CenterAdmin/GrantAccount') {
      return '/CenterAdmin/GrantAccount';
    }
    return '';
  }

  logout() {
    const r = confirm('Do you really want to logout?');
    if (r === true) {
      localStorage.clear();
      this.redirectToLogin();
    }
  }

  redirectToLogin() {
    this._router.navigateByUrl('/login');
  }
}
