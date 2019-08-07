import {Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ProfileComponent} from '../profile/profile.component';
import * as $ from 'jquery';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css', '../../assets/plugins/bootstrap/css/bootstrap.min.css',
    '../../assets/plugins/dropzone/dropzone.css', '../../assets/plugins/bootstrap-material-datetimepicker/css/bootstrap-material-datetimepicker.css',
    '../../assets/plugins/waitme/waitMe.css',
    '../../assets/plugins/bootstrap-select/css/bootstrap-select.css',
    '../../assets/css/main.css',
    '../../assets/css/themes/all-themes.css']
})
export class MenuBarComponent implements OnInit, AfterViewInit {
  constructor(private _router: Router, private route: ActivatedRoute) {
  }

  urlName;
  programName = '';

  receiveMsg($event) {
    this.urlName = this.className();
    console.log(this.urlName);
  }

  ngOnInit() {
    // this.urlName = this.className();
    // console.log(this.urlName);
  }

  className(): string {
    if (this._router.url.includes('profile')) {
      return '/Training-staff/profile';
    }

    if (this._router.url.includes('view-program')) {
      return '/Training-staff/view-program';
    }
    if (this._router.url.includes('program-detail')) {
      return '/Training-staff/view-program';
    }
    if (this._router.url.includes('add-program')) {
      return '/Training-staff/add-program';
    }

    if (this._router.url.includes('view-course')) {
      return '/Training-staff/view-course';
    }
    if (this._router.url.includes('course-detail')) {
      return '/Training-staff/view-course';
    }
    if (this._router.url.includes('add-course')) {
      return '/Training-staff/add-course';
    }

    // if (this._router.url.includes('/Training-staff/syllabus')) {
    //   return '/Training-staff/program';
    // }
    if (this._router.url.includes('/Training-staff/view-building')) {
      return '/Training-staff/view-building';
    }
    if (this._router.url.includes('/Training-staff/add-building')) {
      return '/Training-staff/add-building';
    }

    if (this._router.url.includes('/Training-staff/view-room')) {
      return '/Training-staff/view-room';
    }
    if (this._router.url.includes('/Training-staff/add-room')) {
      return '/Training-staff/add-room';
    }

    if (this._router.url.includes('/Training-staff/view-slot')) {
      return '/Training-staff/view-slot';
    }
    if (this._router.url.includes('/Training-staff/add-slot')) {
      return '/Training-staff/add-slot';
    }

    if (this._router.url.includes('/Training-staff/view-subject')) {
      return '/Training-staff/view-subject';
    }
    if (this._router.url.includes('/Training-staff/add-subject')) {
      return '/Training-staff/add-subject';
    }
    if (this._router.url.includes('/Training-staff/GenerateClass')) {
      return '/Training-staff/GenerateClass';
    }
    if (this._router.url.includes('/Training-staff/ListClasses')) {
      return '/Training-staff/ListClasses';
    }
    if (this._router.url.includes('/Training-staff/GenerateTimetable')) {
      return '/Training-staff/GenerateTimetable';
    }
    if(this._router.url.includes('/Training-staff/Report')){
      return '/Training-staff/Report';
    }

    if (this._router.url.includes('/Training-staff/view-teacher')) {
      return '/Training-staff/view-teacher';
    }
    if (this._router.url.includes('/Training-staff/add-teacher')) {
      return '/Training-staff/add-teacher';
    }
    if (this._router.url.includes('/Training-staff/assign-teacher')) {
      return '/Training-staff/assign-teacher';
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
    // $.getScript('../../assets/bundles/libscripts.bundle.js');
    // $.getScript('../../assets/bundles/vendorscripts.bundle.js');
    // $.getScript('../../assets/bundles/morphingsearchscripts.bundle.js');
    // $.getScript('../../assets/plugins/bootstrap-notify/bootstrap-notify.js');
    // $.getScript('../../assets/js/pages/ui/notifications.js');
    // $.getScript('../../assets/bundles/mainscripts.bundle.js');
    // $.getScript('../../assets/plugins/momentjs/moment.js');
    // $.getScript('../../assets/testJS.js');

    // this.loadScript('/assets/bundles/libscripts.bundle.js');
    // this.loadScript('/assets/bundles/vendorscripts.bundle.js');
    // this.loadScript('/assets/bundles/mainscripts.bundle.js');
    // this.loadScript('/assets/plugins/momentjs/moment.js');

    this.loadScript('../../assets/bundles/libscripts.bundle.js');
    this.loadScript('../../assets/bundles/vendorscripts.bundle.js');
    this.loadScript('../../assets/bundles/mainscripts.bundle.js');
    this.loadScript('../../assets/plugins/momentjs/moment.js');


    //   $(document).ready(function() {
    //     alert('ok');
    //     // $() will work as an alias for jQuery() inside of this function
    //     $.getScript("/assets/bundles/libscripts.bundle.js", function (data, textStatus, jqxhr) {
    //       console.log( textStatus );
    //     });
    //     console.log("ok1");
    //     $.getScript("/assets/bundles/vendorscripts.bundle.js", function (data, textStatus, jqxhr) {
    //       console.log( textStatus );
    //     });
    //     console.log("ok1");
    //     $.getScript("/assets/bundles/mainscripts.bundle.js", function (data, textStatus, jqxhr) {
    //       console.log( textStatus );
    //     });
    //     console.log("ok1");
    //      $('.dtp-content').hide();

    // });

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
