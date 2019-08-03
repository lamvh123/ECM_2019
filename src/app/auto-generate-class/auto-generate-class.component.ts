import {Component, OnInit} from '@angular/core';
import {HttpParams, HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Course} from '../course';
import {AdmissionForm} from '../admission-form';
import {APIContext, APITraining} from '../APIContext';

@Component({
  selector: 'app-auto-generate-class',
  templateUrl: './auto-generate-class.component.html',
  styleUrls: ['./auto-generate-class.component.css', '../../assets/css/main.css',
    '../../assets/css/themes/all-themes.css']
})
export class AutoGenerateClassComponent implements OnInit {

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {
  }

  apiContext = new APIContext();
  apiTraining = new APITraining();

  ListOfCourse: Course[];
  ListOfForm: AdmissionForm[];
  selectedCourseId = -1;
  listSelectedFormId: any[];
  msg = '';

  ngOnInit() {
    this.loadInitData();
  }

  loadInitData() {
    this.getAllCourse();
    this.loadForm();
  }

  getAllCourse() {

    const body = new HttpParams()
      .set('centerId', this.apiContext.centerId + '');
    const configUrl = this.apiContext.host + this.apiTraining.viewAllCourse;
    this.http.get<Course[]>(configUrl, {params: body}).toPromise().then(res => {
        this.ListOfCourse = res;
        console.log(this.ListOfCourse);
      },
      error => {
        console.log(error);
      });
  }

  loadForm() {
    const param = new HttpParams()
      .set('courseId', this.selectedCourseId + '')
      .set('centerId', this.apiContext.centerId + '')
      .set('isClosed', '1')
      .set('isCreatedClass', '0')
      .set('pageSize', '1000')
      .set('currentPage', '1');
    const url = this.apiContext.host + this.apiTraining.searchAdmissionForm;
    this.http.get<AdmissionForm[]>(url, {params: param}).toPromise().then(data => {
        this.ListOfForm = data;
        console.log(this.ListOfForm);
      },
      error => {
        console.log(error);
      });
  }

  GenerateClass() {
    const url = this.apiContext.host + this.apiTraining.generateClass;
    const param = new Array();
    this.listSelectedFormId.forEach(item => {
      param.push({AdmissionFormId: item, CenterId: this.apiContext.centerId});
    });
    this.http.post(url, param).toPromise().then(data => {
        console.log(data);
        this.msg = 'success';
        this.loadForm();
        this.listSelectedFormId = [];
      },
      error => {
        console.log(error);
        this.msg = 'error';
      });
  }

  removeMessage() {
    this.msg = '';
  }

}
