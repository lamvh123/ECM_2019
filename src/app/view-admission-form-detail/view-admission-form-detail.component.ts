import {Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {HttpClient, HttpParams} from '@angular/common/http';
import {AdmissionForm} from '../admission-form';
import {Building} from '../building';
import {DatePipe} from '@angular/common';
import {Select2OptionData} from 'ng-Select2';
import {NgSelectModule, NgOption} from '@ng-select/ng-select';
import {FormControl, FormGroup, ReactiveFormsModule, FormsModule} from '@angular/forms';
import {Observable} from 'rxjs';
import {Slot} from '../slot';
import {forEach} from '@angular/router/src/utils/collection';
import {APIAdmission, APIContext} from '../APIContext';

@Component({
  selector: 'app-view-admission-form-detail',
  templateUrl: './view-admission-form-detail.component.html',
  styleUrls: ['./view-admission-form-detail.component.css'
    , '../../assets/css/main.css',
    '../../assets/css/themes/all-themes.css']
})
export class ViewAdmissionFormDetailComponent implements OnInit, AfterViewInit {
  @ViewChild('myselect') myselect;
  apiContext = new APIContext();
  apiAdmission = new APIAdmission();
  formId;
  form: AdmissionForm;
  listBuilding: Observable<Building[]>;
  listOfSlot: Slot[];
  isClose = 'true';
  startDate;
  selectedSlot = '';
  boolArr: string[] = ['true', 'false'];
  selectedDayArr;
  dayArr: any[] = [{dayNumber: 1, dayString: 'Monday'}, {dayNumber: 2, dayString: 'Tuesday'},
    {dayNumber: 3, dayString: 'Wednesday'}, {dayNumber: 4, dayString: 'Thursday'},
    {dayNumber: 5, dayString: 'Friday'}, {dayNumber: 6, dayString: 'Saturday'}, {dayNumber: 0, dayString: 'Sunday'}];
  selectedBuilding = '';


  errorMsgName = '';
  errorMsgDate = '';
  errorMsgBuilding = '';
  errorMsgDay = '';
  errorMsgSlot = '';

  constructor(private _router: Router, private http: HttpClient, private route: ActivatedRoute, private datepipe: DatePipe) {
  }

  ngOnInit() {

    this.formId = this.route.snapshot.paramMap.get('id');
    this.form = new AdmissionForm();
    this.getInitData();
  }

  addSelectedDay(item) {
    this.selectedDayArr.push(item.dayNumber);
    this.dayArr = this.dayArr.filter(obj => obj.dayNumber != item.dayNumber);
  }

  getInitData() {
    const getAllCourseUrl = this.apiContext.host + this.apiAdmission.getAdmissionFormById;
    const para = new HttpParams()
      .set('centerId', this.apiContext.centerId + '')
      .set('admissionFormId', this.formId);
    this.http.get<AdmissionForm>(getAllCourseUrl, {params: para}).toPromise().then(data => {
        this.form = data;
        this.form.StartDate = this.form.StartDate.substr(0, 10);
        this.selectedBuilding = this.form.Building.Id + '';
        this.isClose = this.form.IsClosed + '';
        if (data['Slot'] != null && data['Slot'] != undefined) {
          this.selectedSlot = data['Slot'].ID + '';
        }

        if (data['Weeks'] != null && data['Weeks'] != undefined) {
          const dayarr = Object.keys(data['Weeks']).map(i => data['Weeks'][i]);
          const arr = new Array<number>();
          console.log(dayarr);
          dayarr.forEach(function(item: any) {
            arr.push(item.DayOfWeek);
          });
          this.selectedDayArr = arr;
        }
        console.log(this.form);
        this.getAllBuilding();
      },
      error => {
        console.log(error);
      }
    );
    this.getAllSlot();
  }

  getAllBuilding() {
    const url = this.apiContext.host + this.apiAdmission.getAllBuilding;
    const para = new HttpParams().set('centerId', this.apiContext.centerId + '');
    this.http.get<Observable<Building[]>>(url, {params: para}).toPromise().then(data => {
        this.listBuilding = data;
        console.log(this.listBuilding);
      },
      error => {
        console.log(error);
      });
  }

  getAllSlot() {
    const url = this.apiContext.host + this.apiAdmission.getAllSlot;
    const para = new HttpParams().set('centerId', this.apiContext.centerId + '');
    this.http.get<Slot[]>(url, {params: para}).toPromise().then(data => {
        this.listOfSlot = data;
        this.listOfSlot.forEach(function(item) {
          item.displayText = item.Name + ': ' + item.From + '-' + item.To;
        });
        console.log(this.listOfSlot);
      },
      error => {
        console.log(error);
      });
  }

  updateForm() {
    const date = new Date(this.form.StartDate);
    const dateString = this.datepipe.transform(date, 'MM-dd-yyyy');
    let para = new HttpParams().set('AdmissionFormId', this.formId)
      .set('CourseId', this.form.Course.Id + '').set('StartDate', dateString).set('Name', this.form.Name)
      .set('SlotId', this.selectedSlot + '')
      .set('BuildingId', this.selectedBuilding + '')
      .set('IsClosed', false + '').set('CenterId', this.apiContext.centerId + '');
    this.selectedDayArr.forEach(item => {
      para = para.append('DaysPerWeek', item + '');
    });
    const url = this.apiContext.host + this.apiAdmission.updateAdmissionForm;
    console.log(para);
    this.http.post<any>(url, para).toPromise().then(data => {

        console.log(data);
        this.redirectToAllAdmissionForm();
      },
      error => {
        console.log(error);
      });
  }

  redirectToAllAdmissionForm() {
    this._router.navigateByUrl('/Admission-staff/admissionform');
  }

  ngAfterViewInit() {
  }


  checkValidName() {
    if (this.form.Name != null) {
      this.form.Name = this.formatText(this.form.Name);
    }
    if (this.form.Name == null || this.form.Name === '') {
      this.errorMsgName = 'Name is required.';
      return false;
    } else {
      this.errorMsgName = '';
      return true;
    }
  }

  checkValidDate() {
    if (this.form.StartDate == null || this.form.StartDate === '') {
      this.errorMsgDate = 'Start date is required.';
      return false;
    } else {
      this.errorMsgDate = '';
      return true;
    }
  }

  checkValidBuilding() {
    if (this.selectedBuilding == null || this.selectedBuilding === '') {
      this.errorMsgBuilding = 'Building is required.';
      return false;
    } else {
      this.errorMsgBuilding = '';
      return true;
    }
  }

  checkValidSlot() {
    if (this.selectedSlot == null || this.selectedSlot === '') {
      this.errorMsgSlot = 'Slot is required.';
      return false;
    } else {
      this.errorMsgSlot = '';
      return true;
    }
  }

  checkValidDay() {
    if (this.selectedDayArr == null || this.selectedDayArr.length < 1) {
      this.errorMsgDay = 'Day of week is required.';
      return false;
    } else {
      this.errorMsgDay = '';
      return true;
    }
  }


  checkValidFields() {
    this.checkValidName();
    this.checkValidDate();
    this.checkValidBuilding();
    this.checkValidDay();
    this.checkValidSlot();
    if (this.checkValidName() && this.checkValidDate() && this.checkValidBuilding() && this.checkValidDay() && this.checkValidSlot()) {
      this.updateForm();
    }
  }

  // formatText(s: string) {
  //   return s.trim().replace(/\s\s+/g, ' ');
  // }

  formatText(s: string) {
    console.log('before: ' + s);
    s = s.trim().replace(/\s\s+/g, ' ');
    console.log('after: ' + s);
    return s;
  }

}
