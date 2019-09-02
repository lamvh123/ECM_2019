import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Subject} from '../subject';
import * as $ from 'jquery';
import {AmazingTimePickerService} from 'amazing-time-picker';
import {Slot} from '../slot';
import {Center} from '../center';
import {APIContext, APITraining} from '../APIContext';
import {ToastrService} from 'ngx-toastr';
import {UrlTraining} from '../SiteUrlContext';
import {MenuBarComponent} from '../menu-bar/menu-bar.component';

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
  centerId: number;
  urlTraining = new UrlTraining();

  constructor(private atp: AmazingTimePickerService, private _router: Router, private http: HttpClient, private route: ActivatedRoute, private toastr: ToastrService) {
  }

  Name: string;
  From = '00:00';
  To = '00:00';
  isLoading = true;

  errorMsgName = '-';
  errorMsgFrom = '-';
  errorMsgTo = '-';

  ngOnInit() {
    const urlGetCenterId = this.apiContext.host + this.apiTraining.getCenter;
    this.http.get(urlGetCenterId).toPromise().then(data => {
      this.centerId = data['Id'];
    });
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
    this.triggerEnterForm('formAdd', 'btnAdd');
    this.isLoading = false;
  }

  triggerEnterForm(formId: string, btnId: string) {
    const signInForm = document.getElementById(formId);
    signInForm.addEventListener('keyup', function(event) {
      if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById(btnId).click();
      }
    });
  }

  addSlot() {
    this.isLoading = true;
    const configUrl = this.apiContext.host + this.apiTraining.addOneSlot;
    const body = new HttpParams()
      .set('Name', this.Name)
      .set('From', this.From + ':00')
      .set('To', this.To + ':00')
      .set('CenterId', this.centerId + '');
    console.log(body);
    this.http.post<any>(configUrl, body).toPromise().then(
      res => {
        console.log(res);
        // this.showMessage(true);
        this.isLoading = false;
        this.toastr.success('Slot ' + this.Name + ' was added successfully.', 'Success!');
        this.redirectToAllSlot();
      },
      err => {
        console.log(err);
        this.isLoading = false;
        this.toastr.error('Something goes wrong. Please try again.', 'Oops!');
        // this.showMessage(false);
      }
    );

  }


  redirectToAllSlot() {
    MenuBarComponent.currentUrl = this.urlTraining.viewSlot;
    this._router.navigateByUrl(this.urlTraining.viewSlot);
  }

  checkValidName() {
    if (this.Name != null) {
      this.Name = this.formatText(this.Name);
    }
    if (this.Name == null || this.Name === '') {
      this.errorMsgName = 'Name is required.';
      return false;
    } else {
      this.errorMsgName = '';
      return true;
    }
  }

  checkValidFrom() {
    if (!this.checkValidTime(this.From)) {
      this.errorMsgFrom = 'Start time is required.';
      return false;
    } else {
      this.errorMsgFrom = '';
      return true;
    }
  }

  checkValidTo() {
    if (!this.checkValidTime(this.To)) {
      this.errorMsgTo = 'End time is required.';
      return false;
    } else {
      const arrFrom = this.From.split(':');
      const arrTo = this.To.split(':');
      if ((+arrFrom[0] < +arrTo[0]) || ((+arrFrom[0] === +arrTo[0]) && (+arrFrom[1] < +arrTo[1]))) {
        this.errorMsgTo = '';
        return true;
      } else {
        this.errorMsgTo = 'End time must be greater than start time.';
        return false;
      }
    }
  }

  checkValidTime(timeCheck: string) {
    if (timeCheck == null || timeCheck === '') {
      return false;
    } else {
      timeCheck = this.formatText(timeCheck);
      const arr = timeCheck.split(':');
      arr.forEach(function(item) {
        if (item == null || item === '') {
          return false;
        }
      });
      return true;
    }
  }

  checkValidFields() {
    this.checkValidName();
    this.checkValidFrom();
    this.checkValidTo();
    if (this.checkValidName() && this.checkValidFrom() && this.checkValidTo()) {
      this.addSlot();
    } else {
      this.toastr.warning('Something is missing.', 'Alert!');
    }
  }

  formatText(s: string) {
    return s.trim().replace(/\s\s+/g, ' ');
  }
}
