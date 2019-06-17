import { Component,AfterViewInit } from '@angular/core';
import {AuthService} from './auth.service'
declare var jquery: any; declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  AfterViewInit{
  title = 'ngApp';
  constructor(private auth:AuthService){}
  ngAfterViewInit() {
    $.getScript("/assets/bundles/libscripts.bundle.js", function (data, textStatus, jqxhr) {
      console.log( textStatus );
    });
    console.log("ok1");
    $.getScript("/assets/bundles/vendorscripts.bundle.js", function (data, textStatus, jqxhr) {
      console.log( textStatus );
    });
    console.log("ok1");
   }
}
