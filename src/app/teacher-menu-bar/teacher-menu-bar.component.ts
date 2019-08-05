import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-teacher-menu-bar',
  templateUrl: './teacher-menu-bar.component.html',
  styleUrls: ['./teacher-menu-bar.component.css', '../../assets/css/main.css',
    '../../assets/css/themes/all-themes.css']
})
export class TeacherMenuBarComponent implements OnInit {

  constructor(private _router: Router, private route: ActivatedRoute) { }
  urlName;
  ngOnInit() {
  }

  className(): String {
    if (this._router.url == '/Teacher/profile') {
      return '/Teacher/profile';
    }
    if (this._router.url == '/Teacher/ViewTimetable') {
      return '/Teacher/ViewTimetable';
    }
    return '';
  }

  receiveMsg($event) {
    // this.urlName = $event;
    this.urlName = this.className();
    console.log(this.urlName);
  }

  ngAfterViewInit() {
    this.loadScript('/assets/bundles/libscripts.bundle.js');
    this.loadScript('/assets/bundles/vendorscripts.bundle.js');
    this.loadScript('/assets/bundles/mainscripts.bundle.js');
    this.loadScript('/assets/plugins/momentjs/moment.js');
  }

  public loadScript(url: string) {
    const body = <HTMLDivElement>document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
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
