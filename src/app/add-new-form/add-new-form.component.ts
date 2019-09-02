import {Component, OnInit, Output, EventEmitter, AfterViewInit} from '@angular/core';
import {Course} from '../course';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Router, ActivatedRoute} from '@angular/router';
import {Center} from '../center';
import {Building} from '../building';
import {Observable} from 'rxjs';
import {AdmissionForm} from '../admission-form';
import {DatePipe} from '@angular/common';
import {Slot} from '../slot';
import {APIAdmission, APIContext} from '../APIContext';

@Component({
  selector: 'app-add-new-form',
  templateUrl: './add-new-form.component.html',
  styleUrls: ['./add-new-form.component.css'
    , '../../assets/css/main.css'
    , '../../assets/css/themes/all-themes.css']
})
export class AddNewFormComponent implements OnInit, AfterViewInit {
  apiContext = new APIContext();
  apiAdmission = new APIAdmission();
  centerId: number;

  listCourse: Course[];
  courseId: string;
  isClosed = -1;
  isClose;
  boolArr: string[] = ['true', 'false'];
  selectedBuilding: string;
  listBuilding: Observable<Building[]>;
  form: AdmissionForm;
  selectedDayArr: any[];
  dayArr: any[] = [{dayNumber: 1, dayString: 'Monday'}, {dayNumber: 2, dayString: 'Tuesday'},
    {dayNumber: 3, dayString: 'Wednesday'}, {dayNumber: 4, dayString: 'Thursday'},
    {dayNumber: 5, dayString: 'Friday'}, {dayNumber: 6, dayString: 'Saturday'}, {dayNumber: 0, dayString: 'Sunday'}];
  listOfSlot: Slot[];
  selectedSlot: string;

  errorMsgCourse = '-';
  errorMsgName = '-';
  errorMsgDate = '-';
  errorMsgBuilding = '-';
  errorMsgDay = '-';
  errorMsgSlot = '-';
  @Output() messageEvent = new EventEmitter<string>();
  isLoading = true;


  constructor(private http: HttpClient, private router: Router, private datepipe: DatePipe, private route: ActivatedRoute) {

  }

  sendUrl() {
    this.messageEvent.emit(this.route.url + '');
  }

  ngOnInit() {
    this.form = new AdmissionForm();
    const urlGetCenterId = this.apiContext.host + this.apiAdmission.getCenter;
    this.http.get(urlGetCenterId).toPromise().then(data => {
      this.centerId = data['Id'];
      this.getInitData();
    });

  }

  ngAfterViewInit(): void {
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

  getAllBuilding() {
    this.isLoading = true;
    const url = this.apiContext.host + this.apiAdmission.getAllBuilding;
    const para = new HttpParams().set('centerId', this.centerId + '');
    this.http.get<Observable<Building[]>>(url, {params: para}).toPromise().then(data => {
        this.listBuilding = data;
        console.log(this.listBuilding);
        this.isLoading = false;
      },
      error => {
        console.log(error);
        this.isLoading = false;
        // this.showMessage(false);
      });
  }

  getInitData() {
    this.isLoading = true;
    const getAllCourseUrl = this.apiContext.host + this.apiAdmission.getAllCourse;
    const para = new HttpParams().set('centerId', this.centerId + '');
    this.http.get<Course[]>(getAllCourseUrl, {params: para}).toPromise().then(data => {
        this.listCourse = data;
        console.log(this.listCourse);
        this.isLoading = false;
      },
      error => {
        console.log(error);
        this.isLoading = false;
      }
    );
    this.getAllBuilding();
    this.getAllSlot();

  }

  getAllSlot() {
    this.isLoading = true;
    const url = this.apiContext.host + this.apiAdmission.getAllSlot;
    const para = new HttpParams().set('centerId', this.centerId + '');
    this.http.get<Slot[]>(url, {params: para}).toPromise().then(data => {
        this.listOfSlot = data;
        this.listOfSlot.forEach(function(item) {
          item.displayText = item.Name + ': ' + item.From + '-' + item.To;
        });
        console.log(this.listOfSlot);
        this.isLoading = false;
      },
      error => {
        console.log(error);
        this.isLoading = false;
        // this.showMessage(false);
      });
  }

  CreateForm() {
    this.isLoading = true;
    const date = new Date(this.form.StartDate);
    const dateString = this.datepipe.transform(date, 'MM-dd-yyyy');
    let para = new HttpParams()
      .set('CourseId', this.courseId + '')
      .set('StartDate', dateString)
      .set('Name', this.form.Name)
      .set('BuildingId', this.selectedBuilding + '')
      .set('CenterId', this.centerId + '')
      .set('SlotId', this.selectedSlot);
    this.selectedDayArr.forEach(item => {
      para = para.append('DaysPerWeek', item + '');
    });
    const url = this.apiContext.host + this.apiAdmission.createAdmissionForm;
    console.log(para);
    this.http.post<any>(url, para).toPromise().then(data => {
        console.log(data);
        if (data['Id'] != null && data['Id'] != 0) {
          // this.router.navigate(['/redirect', '/Admission-staff/form-detail', data['Id']]);
        }
        // this.showMessage(true);
        this.isLoading = false;
        this.redirectToAllAdmissionForm();
      },
      error => {
        console.log(error);
        this.isLoading = false;
        // this.showMessage(false);
      });
  }


  redirectToAllAdmissionForm() {
    this.router.navigateByUrl('/Admission-staff/admissionform');
  }

  redirectToAddAdmissionForm() {
    this.router.navigateByUrl('/Admission-staff/addForm');
  }

  // private showMessage(status: boolean) {
  //   let messageConfirm;
  //   if (status) {
  //     messageConfirm = 'An admission form was added successfully.' +
  //       '\nDo you want to add more admission forms?';
  //   } else {
  //     messageConfirm = 'Something go wrong.' +
  //       '\nDo you want to try again?';
  //   }
  //   const r = confirm(messageConfirm);
  //   if (r === true) {
  //     this.redirectToAddAdmissionForm();
  //   } else {
  //     this.redirectToAllAdmissionForm();
  //   }
  // }


  checkValidCourse() {
    // if (this.courseId != null) {
    //   this.courseId = this.formatText(this.courseId+'');
    // }
    if (this.courseId == null || this.courseId === '') {
      this.errorMsgCourse = 'Course is required.';
      return false;
    } else {
      this.errorMsgCourse = '';
      return true;
    }
  }

  checkValidName() {
    if (this.form.Name != null) {
      this.form.Name = this.formatText(this.form.Name + '');
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
    if (this.form.StartDate != null) {
      this.form.StartDate = this.formatText(this.form.StartDate + '');
    }
    if (this.form.StartDate == null || this.form.StartDate === '') {
      this.errorMsgDate = 'Start date is required.';
      return false;
    } else {
      this.errorMsgDate = '';
      return true;
    }
  }

  checkValidBuilding() {
    // if (this.selectedBuilding != null) {
    //   this.selectedBuilding = this.formatText(this.selectedBuilding+'');
    // }
    if (this.selectedBuilding == null || this.selectedBuilding === '') {
      this.errorMsgBuilding = 'Building is required.';
      return false;
    } else {
      this.errorMsgBuilding = '';
      return true;
    }
  }

  checkValidSlot() {
    // if (this.selectedSlot != null) {
    //   this.selectedSlot = this.formatText(this.selectedSlot+'');
    // }
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
      const date = new Date(this.form.StartDate);
      const weekday = new Array(7);
      weekday[0] = 'Sunday';
      weekday[1] = 'Monday';
      weekday[2] = 'Tuesday';
      weekday[3] = 'Wednesday';
      weekday[4] = 'Thursday';
      weekday[5] = 'Friday';
      weekday[6] = 'Saturday';
      if (this.selectedDayArr.indexOf(date.getDay()) < 0) {
        this.errorMsgDay = 'Day-of-week list must contains day-of-week of start date (' + weekday[date.getDay()] + ')';
        return false;
      } else {
        this.errorMsgDay = '';
        return true;
      }
    }
  }

  formatText(s: string) {
    return s.trim().replace(/\s\s+/g, ' ');
  }

  checkValidFields() {
    this.checkValidName();
    this.checkValidCourse();
    this.checkValidDate();
    this.checkValidBuilding();
    this.checkValidDay();
    this.checkValidSlot();
    if (this.checkValidCourse() && this.checkValidName() && this.checkValidDate() && this.checkValidBuilding() && this.checkValidDay() && this.checkValidSlot()) {
      this.CreateForm();
    }
  }
}
