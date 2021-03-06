import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {UrlCenter} from '../SiteUrlContext';

@Component({
  selector: 'app-center-admin-menubar',
  templateUrl: './center-admin-menubar.component.html',
  styleUrls: ['./center-admin-menubar.component.css', '../../assets/plugins/bootstrap/css/bootstrap.min.css',
    '../../assets/plugins/dropzone/dropzone.css', '../../assets/plugins/bootstrap-material-datetimepicker/css/bootstrap-material-datetimepicker.css',
    '../../assets/plugins/waitme/waitMe.css',
    '../../assets/plugins/bootstrap-select/css/bootstrap-select.css',
    '../../assets/css/main.css',
    '../../assets/css/themes/all-themes.css']
})
export class CenterAdminMenubarComponent implements OnInit, AfterViewInit {

  urlName;
  userAvatar = '';
  userName = '';
  urlCenter = new UrlCenter();
  currentUrl = this._router.url;

  constructor(private _router: Router, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.urlName = this.className();
    console.log(this.urlName);
  }

  ngAfterViewInit(): void {
    this.userAvatar = localStorage.getItem('userAvatar');
    this.userName = localStorage.getItem('userName');
  }

  className(): String {
    if (this._router.url == '/CenterAdmin/profile') {
      return '/CenterAdmin/profile';
    }
    if (this._router.url == '/CenterAdmin/GrantAccount') {
      return '/CenterAdmin/GrantAccount';
    }
    if (this._router.url == '/CenterAdmin/view-staff') {
      return '/CenterAdmin/view-staff';
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
  redirectToUrl(url: string) {
    this.currentUrl = url;
    this._router.navigateByUrl(url);
  }
}
