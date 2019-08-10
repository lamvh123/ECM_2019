import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Subject} from '../subject';
import * as $ from 'jquery';
import {AmazingTimePickerService} from 'amazing-time-picker';
import {Slot} from '../slot';
import {Center} from '../center';
import {APIContext, APITraining} from '../APIContext';

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

  apiContext = new APIContext();
  apiTraining = new APITraining();

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
    const configUrl = this.apiContext.host + this.apiTraining.addOneSlot;
    const body = new HttpParams()
      .set('Name', this.Name)
      .set('From', this.From + ':00')
      .set('To', this.To + ':00')
      .set('CenterId', this.apiContext.centerId + '');
    console.log(body);
    this.http.post<any>(configUrl, body).toPromise().then(
      res => {
        console.log(res);
        // this.showMessage(true);
        this.redirectToAllSlot();
      },
      err => {
        console.log(err);
        // this.showMessage(false);
      }
    );

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


  redirectToAllSlot() {
    this._router.navigateByUrl('/Training-staff/view-slot');
  }

  redirectToAddSlot() {
    this._router.navigateByUrl('/Training-staff/add-slot');
  }

  // private showMessage(status: boolean) {
  //   let messageConfirm;
  //   if (status) {
  //     messageConfirm = 'A slot was added successfully.' +
  //       '\nDo you want to add more slots?';
  //   } else {
  //     messageConfirm = 'Something go wrong.' +
  //       '\nDo you want to try again?';
  //   }
  //   const r = confirm(messageConfirm);
  //   if (r === true) {
  //     this.redirectToAddSlot();
  //   } else {
  //     this.redirectToAllSlot();
  //   }
  // }
}
