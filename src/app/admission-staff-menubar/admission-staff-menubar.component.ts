import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admission-staff-menubar',
  templateUrl: './admission-staff-menubar.component.html',
  styleUrls: ['./admission-staff-menubar.component.css', '../../assets/plugins/bootstrap/css/bootstrap.min.css',
  '../../assets/plugins/dropzone/dropzone.css', '../css/assets/plugins/bootstrap-material-datetimepicker/css/bootstrap-material-datetimepicker.css',
  '../../assets/plugins/waitme/waitMe.css',
  '../../assets/plugins/bootstrap-select/css/bootstrap-select.css',
  '../../assets/css/main.css',
  '../../assets/css/themes/all-themes.css']
})
export class AdmissionStaffMenubarComponent implements OnInit,AfterViewInit {
  urlName;
  constructor(private _router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.urlName = this.className();
    console.log(this.urlName);
  }

  className(): String {
    if (this._router.url == '/Admission-staff/profile') {
      return '/Admission-staff/profile';
    }
    if (this._router.url == '/Training-staff/view-program') {
      return '/Training-staff/program';
    }
    if (this._router.url.includes('/Training-staff/program-detail')) {
      return '/Training-staff/program';
    }
    if (this._router.url.includes('/Training-staff/view-course')) {
      return '/Training-staff/program';
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
    this.loadScript('/assets/bundles/libscripts.bundle.js');
    this.loadScript('/assets/bundles/vendorscripts.bundle.js');
    this.loadScript('/assets/bundles/mainscripts.bundle.js');
    this.loadScript('/assets/plugins/momentjs/moment.js');
  }

}
