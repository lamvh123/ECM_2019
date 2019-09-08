import {Component, OnInit, AfterViewInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {UrlSystem} from '../SiteUrlContext';

@Component({
  selector: 'app-system-admin-menu-bar',
  templateUrl: './system-admin-menu-bar.component.html',
  styleUrls: ['./system-admin-menu-bar.component.css', '../../assets/css/main.css',
    '../../assets/css/themes/all-themes.css']
})
export class SystemAdminMenuBarComponent implements OnInit, AfterViewInit {

  urlName;
  urlSystem = new UrlSystem();
  currentUrl = this._router.url;
  userAvatar = '';
  userName = '';

  constructor(private _router: Router, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.urlName = this.className();
    console.log(this.urlName);
  }

  className(): String {
    if (this._router.url == '/SystemAdmin/profile') {
      return '/SystemAdmin/profile';
    }
    if (this._router.url == '/SystemAdmin/GrantAccount') {
      return '/SystemAdmin/GrantAccount';
    }
    if (this._router.url == '/SystemAdmin/AllCenter') {
      return '/SystemAdmin/AllCenter';
    }
    if (this._router.url == '/SystemAdmin/AddCenter') {
      return '/SystemAdmin/AddCenter';
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

  public loadScript(url: string) {
    const body = <HTMLDivElement> document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }

  ngAfterViewInit() {
    this.userAvatar = localStorage.getItem('userAvatar');
    this.userName = localStorage.getItem('userName');
    this.loadScript('/assets/bundles/libscripts.bundle.js');
    this.loadScript('/assets/bundles/vendorscripts.bundle.js');
    this.loadScript('/assets/bundles/mainscripts.bundle.js');
    this.loadScript('/assets/plugins/momentjs/moment.js');
  }

  redirectToUrl(url: string) {
    this.currentUrl = url;
    this._router.navigateByUrl(url);
  }
}
