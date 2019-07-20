import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Subject} from '../subject';
import * as $ from 'jquery';
import {AmazingTimePickerService} from 'amazing-time-picker';
import {Slot} from '../slot';
import {Center} from '../center';

@Component({
  selector: 'app-add-slot',
  templateUrl: './add-slot.component.html',
  styleUrls: ['./add-slot.component.css'
    , '../../assets/plugins/bootstrap/css/bootstrap.min.css'
    , '../../assets/plugins/dropzone/dropzone.css'
    , '../../assets/plugins/bootstrap-material-datetimepicker/css/bootstrap-material-datetimepicker.css'
    , '../../assets/plugins/waitme/waitMe.css'
    , '../../assets/plugins/bootstrap-select/css/bootstrap-select.css'
    , '../../assets/css/main.css'
    , '../../assets/css/themes/all-themes.css']
})
export class AddSlotComponent implements OnInit, AfterViewInit {

  constructor(private atp: AmazingTimePickerService, private _router: Router, private http: HttpClient, private route: ActivatedRoute) {
  }

  Name: string;
  From = '00:00';
  To = '00:00';

  ngOnInit() {
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
    // this.loadScript('/assets/js/TrainingDept/addcourse.js');
  }

  addSlot() {
    const configUrl = 'https://educationcentermanagementapi-dev-as.azurewebsites.net/api/TrainingDept/AddSlot';
    const url = 'https://educationcentermanagementapi-dev-as.azurewebsites.net/api/TrainingDept/GetCenter';
    this.http.get(url).toPromise().then(data => {
        const body = new HttpParams()
          .set('Name', this.Name)
          .set('From', this.From + ':00')
          .set('To', this.To + ':00')
          .set('CenterId', data['Id']);
        console.log(body);
        this.http.post<any>(configUrl, body).toPromise().then(
          res => {
            console.log(res);
          },
          err => {
            console.log(err);
          }
        );
      },
      error => {
        console.log(error);
      });
    this.redirectToViewSlot();
  }

  redirectToViewSlot() {
    this._router.navigate(['/Training-staff/view-slot']);
  }

  chooseTimeFrom() {
    const amazingTimePicker = this.atp.open();
    amazingTimePicker.afterClose().subscribe(time => {
      console.log(time);
      this.From = time;
    });
  }

  chooseTimeTo() {
    const amazingTimePicker = this.atp.open();
    amazingTimePicker.afterClose().subscribe(time => {
      console.log(time);
      this.To = time;
    });
  }
}
