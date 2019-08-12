import {Component, OnInit} from '@angular/core';
import {HttpParams, HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Course} from '../course';
import {AdmissionForm} from '../admission-form';
import {APIContext, APITraining} from '../APIContext';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-auto-generate-class',
  templateUrl: './auto-generate-class.component.html',
  styleUrls: ['./auto-generate-class.component.css', '../../assets/css/main.css',
    '../../assets/css/themes/all-themes.css']
})
export class AutoGenerateClassComponent implements OnInit {

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, private toastr: ToastrService) {
  }

  apiContext = new APIContext();
  apiTraining = new APITraining();
  centerId: number;

  ListOfCourse: Course[];
  ListOfForm: AdmissionForm[];
  selectedCourseId = -1;
  listSelectedFormId: any[];

  ngOnInit() {
    const urlGetCenterId = this.apiContext.host + this.apiTraining.getCenter;
    this.http.get(urlGetCenterId).toPromise().then(data => {
      this.centerId = data['Id'];
      this.loadInitData();
    });
  }

  loadInitData() {
    this.getAllCourse();
    this.loadForm();
  }

  getAllCourse() {

    const body = new HttpParams()
      .set('centerId', this.centerId + '');
    const configUrl = this.apiContext.host + this.apiTraining.viewAllCourse;
    this.http.get<Course[]>(configUrl, {params: body}).toPromise().then(res => {
        this.ListOfCourse = res;
        console.log(this.ListOfCourse);
      },
      error => {
        console.log(error);
        this.toastr.info('Something is not working right. Please try again soon.');
      });
  }

  clearCourseAndLoadForm() {
    this.selectedCourseId = -1;
    this.loadForm();
  }

  loadForm() {
    const param = new HttpParams()
      .set('courseId', this.selectedCourseId + '')
      .set('centerId', this.centerId + '')
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
        this.toastr.info('Something is not working right. Please try again soon.');
      });
  }

  GenerateClass() {
    const url = this.apiContext.host + this.apiTraining.generateClass;
    const param = new Array();
    this.listSelectedFormId.forEach(item => {
      param.push({AdmissionFormId: item, CenterId: this.centerId});
    });
    this.http.post(url, param).toPromise().then(data => {
        console.log(data);
        this.loadForm();
        this.listSelectedFormId = [];
        this.toastr.success(this.listSelectedFormId.length + ' class(es) was generated successfully.', 'Success!');
      },
      error => {
        console.log(error);
        this.toastr.error('Something goes wrong. Please try again.', 'Oops!');
      });
  }

}
