import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Class} from '../entity/class';
import {APIContext, APITeacher} from '../APIContext';

@Component({
  selector: 'app-teacher-menu-bar',
  templateUrl: './teacher-menu-bar.component.html',
  styleUrls: ['./teacher-menu-bar.component.css', '../../assets/css/main.css',
    '../../assets/css/themes/all-themes.css']
})
export class TeacherMenuBarComponent implements OnInit {
  apiContext = new APIContext();
  apiTeacher = new APITeacher();
  classList: Class[];

  constructor(private http: HttpClient, private _router: Router, private route: ActivatedRoute) {
  }

  urlName;

  ngOnInit() {
    this.getListClasses();
  }

  className(): String {
    if (this._router.url == '/Teacher/profile') {
      return '/Teacher/profile';
    }
    if (this._router.url == '/Teacher/ViewTimetable') {
      return '/Teacher/ViewTimetable';
    }
    if (this._router.url.includes('/Teacher/take-attendance')) {
      return '/Teacher/take-attendance';
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
    const body = <HTMLDivElement> document.body;
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

  getListClasses() {
    const body = new HttpParams()
      .set('centerId', this.apiContext.centerId + '');

    const configUrl = this.apiContext.host + this.apiTeacher.getListOfClassOfTeacher;
    this.http.get<Class[]>(configUrl, {params: body}).toPromise().then(res => {
        console.log(res);
        this.classList = res;
        console.log(this.classList);
      },
      error => {
        console.log(error);
      });
  }

}
