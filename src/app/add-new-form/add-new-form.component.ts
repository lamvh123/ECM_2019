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
import {APIContext} from '../APIContext';

@Component({
  selector: 'app-add-new-form',
  templateUrl: './add-new-form.component.html',
  styleUrls: ['./add-new-form.component.css'
    , '../../assets/css/main.css'
    , '../../assets/css/themes/all-themes.css']
})
export class AddNewFormComponent implements OnInit {
  apiContext = new APIContext();
  listCourse: Course[];
  courseId;
  isClosed = -1;
  isClose;
  boolArr: string[] = ['true', 'false'];
  selectedBuilding;
  listBuilding: Observable<Building[]>;
  form: AdmissionForm;
  selectedDayArr: any[];
  dayArr: any[] = [{dayNumber: 1, dayString: 'Monday'}, {dayNumber: 2, dayString: 'Tuesday'},
    {dayNumber: 3, dayString: 'Wednesday'}, {dayNumber: 4, dayString: 'Thursday'},
    {dayNumber: 5, dayString: 'Friday'}, {dayNumber: 6, dayString: 'Saturday'}, {dayNumber: 0, dayString: 'Sunday'}];
  listOfSlot: Slot[];
  selectedSlot;

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
    const url = this.apiContext.host + 'api/AdmissionManagement/GetAllBuilding';
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
    const getAllCourseUrl = this.apiContext.host + 'api/AdmissionManagement/GetAllCourse';
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
    const url = this.apiContext.host + 'api/AdmissionManagement/GetAllSlot';
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
    const url = this.apiContext.host + 'api/AdmissionManagement/CreateAdmissionForm';
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
    if (this.courseId != null) {
      this.courseId = this.courseId.trim();
    }
    if (this.courseId == null || this.courseId === '') {
      this.errorMsgCourse = 'Course is required.';
    } else {
      this.errorMsgCourse = '';
    }
  }

  checkValidName() {
    if (this.form.Name != null) {
      this.form.Name = this.form.Name.trim();
    }
    if (this.form.Name == null || this.form.Name === '') {
      this.errorMsgName = 'Name is required.';
    } else {
      this.errorMsgName = '';
    }
  }

  checkValidDate() {
    if (this.form.StartDate != null) {
      this.form.StartDate = this.form.StartDate.trim();
    }
    if (this.form.StartDate == null || this.form.StartDate === '') {
      this.errorMsgDate = 'Start date is required.';
    } else {
      this.errorMsgDate = '';
    }
  }

  checkValidBuilding() {
    if (this.selectedBuilding != null) {
      this.selectedBuilding = this.selectedBuilding.trim();
    }
    if (this.selectedBuilding == null || this.selectedBuilding === '') {
      this.errorMsgBuilding = 'Building is required.';
    } else {
      this.errorMsgBuilding = '';
    }
  }

  checkValidSlot() {
    if (this.selectedSlot != null) {
      this.selectedSlot = this.selectedSlot.trim();
    }
    if (this.selectedSlot == null || this.selectedSlot === '') {
      this.errorMsgSlot = 'Slot is required.';
    } else {
      this.errorMsgSlot = '';
    }
  }

  checkValidDay() {
    if (this.selectedDayArr == null || this.selectedDayArr.length < 1) {
      this.errorMsgDay = 'Day of week is required.';
    } else {
      this.errorMsgDay = '';
    }
  }

  checkValidFields() {
    if (this.errorMsgCourse.length !== 0 || this.errorMsgName.length !== 0 || this.errorMsgDate.length !== 0
      || this.errorMsgBuilding.length !== 0 || this.errorMsgDay.length !== 0 || this.errorMsgSlot.length !== 0) {
      return false;
    }
    return true;
  }

  verifyAllFields() {
    this.checkValidName();
    this.checkValidCourse();
    this.checkValidDate();
    this.checkValidBuilding();
    this.checkValidDay();
    this.checkValidSlot();
  }
}
