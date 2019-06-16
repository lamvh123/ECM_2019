import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProfileComponent } from '../profile/profile.component';
declare var jquery: any; declare var $: any;
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
  name;
  ngOnInit() {
    this.name = this.className();
  }
  className():String{
    return this._router.url;
  }

  ngAfterViewInit() {
    $.getScript("/assets/bundles/libscripts.bundle.js", function (data, textStatus, jqxhr) {
      console.log( textStatus );
    });
    console.log("ok1");
    $.getScript("/assets/bundles/vendorscripts.bundle.js", function (data, textStatus, jqxhr) {
      console.log( textStatus );
    });
    console.log("ok1");
    $.getScript("/assets/bundles/mainscripts.bundle.js", function (data, textStatus, jqxhr) {
      console.log( textStatus );
    });
    console.log("ok1");
     $('.dtp-content').hide();
    console.log('1' + this._router.url);
   }
}
