import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Center} from '../center';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';
import {Course} from '../course';
import {async} from '@angular/core/testing';
import {AdmissionForm} from '../admission-form';
import {Program} from '../program';
import {Slot} from '../slot';
import {APIAdmission, APIContext} from '../APIContext';

@Component({
  selector: 'app-view-admission-form',
  templateUrl: './view-admission-form.component.html',
  styleUrls: ['./view-admission-form.component.css', '../../assets/css/main.css',
    '../../assets/css/themes/all-themes.css']
})
export class ViewAdmissionFormComponent implements OnInit, AfterViewInit {
  apiContext = new APIContext();
  apiAdmission = new APIAdmission();
  centerId: number;

  listCourse: Course[];
  courseId;
  isClosed = -1;
  listForm: AdmissionForm[];
  isClose;
  startDate;
  boolArr: string[] = ['true', 'false'];
  availbleCourses: Course[] = [];
  availbleSlots: Slot[] = [];
  isLoading = false;

  constructor(private http: HttpClient, private router: Router) {
  }

  ngOnInit() {
    const urlGetCenterId = this.apiContext.host + this.apiAdmission.getCenter;
    this.http.get(urlGetCenterId).toPromise().then(data => {
      this.centerId = data['Id'];
      this.getInitData();
    });
    // this.getAvailbleCourses();
    // this.getAvailbleSlots();
  }

  ngAfterViewInit(): void {
    this.isLoading = false;
  }

  getInitData() {
    this.isLoading = true;
    const getAllCourseUrl = this.apiContext.host + this.apiAdmission.getAllCourse;
    const para = new HttpParams()
      .set('centerId', this.centerId + '');
    this.http.get<Course[]>(getAllCourseUrl, {params: para}).toPromise().then(data => {
        this.listCourse = data;
        console.log(this.listCourse);
        this.getAdmissionForm();
        this.isLoading = false;
      },
      error => {
        console.log(error);
        this.isLoading = false;
      }
    );
  }

  getAdmissionForm() {
    this.isLoading = true;
    if (this.isClose == null) {
      this.isClosed = -1;
    } else {
      if (this.isClose == 'false') {
        this.isClosed = 0;
      } else if (this.isClose == 'true') {
        this.isClosed = 1;
      }
    }
    const parameters = new HttpParams()
      .set('courseId', this.courseId == null ? '-1' : this.courseId + '')
      .set('centerId', this.centerId + '')
      .set('isClosed', this.isClosed + '');
    const url = this.apiContext.host + this.apiAdmission.searchAdmissionForm;
    this.http.get<AdmissionForm[]>(url, {params: parameters}).toPromise().then((data) => {
        console.log(data);
        this.listForm = data;
        this.isLoading = false;
      },
      error => {
        console.log(error);
        this.isLoading = false;
      }
    );
  }

  navigateToAdmissionFormDetail(form) {
    this.router.navigate(['/Admission-staff/form-detail', form.Id]);
  }

  dateToString(date: string) {
    const splitted = date.substring(0, 10).split('-', 3);
    console.log(splitted);
    const displayDay = splitted[2] + '/' + splitted[1] + '/' + splitted[0];
    return displayDay;
  }

  closeForm(form: AdmissionForm) {
    this.isLoading = true;
    const body = new HttpParams()
      .set('CenterId', '1')
      .set('AdmissionFormId', form.Id + '');

    const configUrl = this.apiContext.host + this.apiAdmission.closeAdmissionForm;
    this.http.post(configUrl, body).toPromise().then(res => {
        console.log(res);
        form.IsClosed = true;
        this.isLoading = false;
      },
      error => {
        console.log(error);
        this.isLoading = false;
      });
  }

}
