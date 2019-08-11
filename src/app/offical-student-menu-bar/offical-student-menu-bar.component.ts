import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Class} from '../entity/class';
import {APIContext, APIStudent} from '../APIContext';

@Component({
  selector: 'app-offical-student-menu-bar',
  templateUrl: './offical-student-menu-bar.component.html',
  styleUrls: ['./offical-student-menu-bar.component.css', '../../assets/css/main.css',
    '../../assets/css/themes/all-themes.css']
})
export class OfficalStudentMenuBarComponent implements OnInit, AfterViewInit {

  apiContext = new APIContext();
  apiStudent = new APIStudent();
  centerId: number;

  listClass: Class[];

  constructor(private _router: Router, private http: HttpClient, private route: ActivatedRoute) {
  }

  urlName;
  userAvatar = '';
  userName = '';

  ngOnInit() {
    const urlGetCenterId = this.apiContext.host + this.apiStudent.getCenter;
    this.http.get(urlGetCenterId).toPromise().then(data => {
      this.centerId = data['Id'];
      this.loadClassList();
    });
  }

  className(): String {
    if (this._router.url == '/Student/profile') {
      return '/Student/profile';
    }
    if (this._router.url.includes('/Student/ViewTimetable')) {
      return this._router.url;
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
    this.userAvatar = localStorage.getItem('userAvatar');
    this.userName = localStorage.getItem('userName');
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


  loadClassList() {
    const url = this.apiContext.host + this.apiStudent.getClassList;
    const param = new HttpParams()
      .set('centerId', this.centerId + '');
    this.http.get<Class[]>(url, {params: param}).toPromise().then(data => {
        this.listClass = data;
        console.log(this.listClass);
      },
      error => {
        console.log(error);
      });
  }
}
