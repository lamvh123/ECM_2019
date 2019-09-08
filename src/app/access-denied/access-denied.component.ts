import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UrlNotLogin} from '../SiteUrlContext';
import * as $ from 'jquery';

@Component({
  selector: 'app-access-denied',
  templateUrl: './access-denied.component.html',
  styleUrls: ['./access-denied.component.css'
    , '../../assets/plugins/bootstrap/css/bootstrap.min.css'
    , '../../assets/css/main.css'
    , '../../assets/css/themes/all-themes.css'
    , '../../assets/css/login.css']
})
export class AccessDeniedComponent implements OnInit, AfterViewInit {

  urlNotLogin = new UrlNotLogin();
  constructor(private _router: Router) {
  }

  ngOnInit() {
  }
  ngAfterViewInit(): void {
    $.getScript('../../assets/bundles/libscripts.bundle.js');
    $.getScript('../../assets/bundles/vendorscripts.bundle.js');
    $.getScript('../../assets/bundles/morphingsearchscripts.bundle.js');
    $.getScript('../../assets/plugins/bootstrap-notify/bootstrap-notify.js');
    $.getScript('../../assets/js/pages/ui/notifications.js');
    $.getScript('../../assets/bundles/mainscripts.bundle.js');
  }

  redirectToUrl(url: string) {
    localStorage.clear();
    this._router.navigateByUrl(url);
  }
}
