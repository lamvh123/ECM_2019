import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-accounting-menu-bar',
  templateUrl: './accounting-menu-bar.component.html',
  styleUrls: ['./accounting-menu-bar.component.css', '../../assets/plugins/bootstrap/css/bootstrap.min.css',
    '../../assets/plugins/dropzone/dropzone.css', '../../assets/plugins/bootstrap-material-datetimepicker/css/bootstrap-material-datetimepicker.css',
    '../../assets/plugins/waitme/waitMe.css',
    '../../assets/plugins/bootstrap-select/css/bootstrap-select.css',
    '../../assets/css/main.css',
    '../../assets/css/themes/all-themes.css']
})
export class AccountingMenuBarComponent implements OnInit, AfterViewInit {

  urlName;
  userAvatar = '';
  userName = '';

  constructor(private _router: Router, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.urlName = this.className();
    console.log(this.urlName);
  }

  className(): String {
    if (this._router.url == 'Account-staff/profile') {
      return 'Account-staff/profile';
    }
    if (this._router.url == '/Admission-staff/admissionform') {
      return '/Admission-staff/admissionform';
    }
    if (this._router.url.includes('/Admission-staff/form-detail')) {
      return '/Admission-staff/form-detail';
    }
    if (this._router.url.includes('/Admission-staff/addForm')) {
      return '/Admission-staff/addForm';
    }
    if (this._router.url.includes('/Training-staff/add-course')) {
      return '/Training-staff/program';
    }
    if (this._router.url.includes('/Training-staff/course-detail')) {
      return '/Training-staff/program';
    }
    if (this._router.url.includes('/Training-staff/syllabus')) {
      return '/Training-staff/program';
    }
    if (this._router.url == '/Training-staff/add-program') {
      return '/Training-staff/add-program';
    }
    return '';

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


