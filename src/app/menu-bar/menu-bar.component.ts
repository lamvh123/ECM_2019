import { Component, OnInit,AfterViewInit } from '@angular/core';
declare var jquery: any; declare var $: any;
@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css','../css/assets/plugins/bootstrap/css/bootstrap.min.css',
  '../css/assets/plugins/dropzone/dropzone.css','../css/assets/plugins/bootstrap-material-datetimepicker/css/bootstrap-material-datetimepicker.css',
'../css/assets/plugins/waitme/waitMe.css',
'../css/assets/plugins/bootstrap-select/css/bootstrap-select.css',
'../css/assets/css/main.css',
'../css/assets/css/themes/all-themes.css']
})
export class MenuBarComponent implements OnInit,AfterViewInit {

  constructor() { }

  ngOnInit() {
  }
  
  ngAfterViewInit(){
      $(document).ready(function(){
        $('.dtp-content').hide();
        });
  }
}
