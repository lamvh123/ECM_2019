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

  ngOnInit() {
    this.urlName = this.className();
    console.log(this.urlName);
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

  className(): String {
    if (this._router.url == '/Training-staff/profile') {
      return '/Training-staff/profile';
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
    if (this._router.url == '/Training-staff/view-building') {
      return '/Training-staff/view-building';
    }
    if (this._router.url == '/Training-staff/add-building') {
      return '/Training-staff/add-building';
    }
    if (this._router.url == '/Training-staff/view-room') {
      return '/Training-staff/view-room';
    }
    if (this._router.url == '/Training-staff/add-room') {
      return '/Training-staff/add-room';
    }
    if (this._router.url === '/Training-staff/view-slot') {
      return '/Training-staff/view-slot';
    }
    if (this._router.url === '/Training-staff/add-slot') {
      return '/Training-staff/add-slot';
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
    // this.loadScript('/assets/bundles/libscripts.bundle.js');
    // this.loadScript('/assets/bundles/vendorscripts.bundle.js');
    // this.loadScript('/assets/bundles/mainscripts.bundle.js');
    // this.loadScript('/assets/plugins/momentjs/moment.js');




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
}
