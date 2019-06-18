import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProfileComponent } from '../profile/profile.component';
import * as $ from 'jquery'; 
@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css', '../css/assets/plugins/bootstrap/css/bootstrap.min.css',
    '../css/assets/plugins/dropzone/dropzone.css', '../css/assets/plugins/bootstrap-material-datetimepicker/css/bootstrap-material-datetimepicker.css',
    '../css/assets/plugins/waitme/waitMe.css',
    '../css/assets/plugins/bootstrap-select/css/bootstrap-select.css',
    '../css/assets/css/main.css',
    '../css/assets/css/themes/all-themes.css']
})
export class MenuBarComponent implements OnInit, AfterViewInit {
  constructor(private _router: Router, private route: ActivatedRoute) { }
  urlName;
  programName = '';
  ngOnInit() {
    this.urlName = this.className();   
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
  className():String{
    return this._router.url;
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
    //  this.loadScript('/assets/bundles/vendorscripts.bundle.js');
    //  this.loadScript('/assets/bundles/mainscripts.bundle.js');
     
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
