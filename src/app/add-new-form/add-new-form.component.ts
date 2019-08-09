import {Component, OnInit, Output, EventEmitter} from '@angular/core';
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
export class AddNewFormComponent implements OnInit {
  apiContext = new APIContext();
  apiAdmission = new APIAdmission();
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


  constructor(private http: HttpClient, private router: Router, private datepipe: DatePipe, private route: ActivatedRoute) {

  }

  sendUrl() {
    this.messageEvent.emit(this.route.url + '');
  }

  ngOnInit() {
    this.form = new AdmissionForm();
    this.getInitData();

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
        // this.showMessage(false);
      });
  }

  getInitData() {
    const getAllCourseUrl = this.apiContext.host + this.apiAdmission.getAllCourse;
    const para = new HttpParams().set('centerId', this.apiContext.centerId + '');
    this.http.get<Course[]>(getAllCourseUrl, {params: para}).toPromise().then(data => {
        this.listCourse = data;
        console.log(this.listCourse);
      },
      error => {
        console.log(error);
      }
    );
    this.getAllBuilding();
    this.getAllSlot();

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
        // this.showMessage(false);
      });
  }

  CreateForm() {
    const date = new Date(this.form.StartDate);
    const dateString = this.datepipe.transform(date, 'MM-dd-yyyy');
    let para = new HttpParams()
      .set('CourseId', this.courseId + '')
      .set('StartDate', dateString)
      .set('Name', this.form.Name)
      .set('BuildingId', this.selectedBuilding + '')
      .set('CenterId', this.apiContext.centerId + '')
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
        this.redirectToAllAdmissionForm();
      },
      error => {
        console.log(error);
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
      this.form.Name = this.formatText(this.form.Name+'');
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
      this.form.StartDate = this.formatText(this.form.StartDate+'');
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
      this.errorMsgDay = '';
      return true;
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
    this.checkValidSlot( );
    if (this.checkValidCourse() && this.checkValidName() && this.checkValidDate() && this.checkValidBuilding() && this.checkValidDay() && this.checkValidSlot()) {
      this.CreateForm();
    }
  }
}
