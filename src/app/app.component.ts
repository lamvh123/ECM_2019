import {Component, AfterViewInit} from '@angular/core';
import {AuthService} from './auth.service';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'ngApp';

  constructor(private auth: AuthService) {
  }

  ngAfterViewInit() {

  }


}
