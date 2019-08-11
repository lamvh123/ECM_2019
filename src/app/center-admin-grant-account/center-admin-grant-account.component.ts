import {AfterContentInit, AfterViewInit, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Course} from '../course';
import {AdmissionForm} from '../admission-form';
import {Student} from '../entity/student';
import {ItemsList} from '@ng-select/ng-select/ng-select/items-list';
import {APICenter, APIContext, APITraining} from '../APIContext';

@Component({
  selector: 'app-center-admin-grant-account',
  templateUrl: './center-admin-grant-account.component.html',
  styleUrls: ['./center-admin-grant-account.component.css'
    , '../../assets/css/main.css'
    , '../../assets/css/themes/all-themes.css']
})
export class CenterAdminGrantAccountComponent implements OnInit, AfterViewInit {

  constructor(private router: Router, private http: HttpClient) {
  }

  apiContext = new APIContext();
  apiCenter = new APICenter();
  centerId: number;

  listCourse: Course[];
  listForm: AdmissionForm[];
  selectedCourseId;
  selectedFormId;
  studentName = '';
  phoneNumber = '';
  pageSize = 20;
  currentPage = 1;
  listStudent: Student[];
  totalData = 0;
  empty = true;
  listPage: any[];
  listPageSize = [5, 10, 20, 50];
  msg = '';
  isLoading = true;


  ngOnInit() {
    const urlGetCenterId = this.apiContext.host + this.apiCenter.getCenter;
    this.http.get(urlGetCenterId).toPromise().then(data => {
      this.centerId = data['Id'];
      this.getInitData();
    });
    console.log('complete');
  }

  ngAfterViewInit(): void {
    this.isLoading = false;
  }

  getInitData() {
    this.isLoading = true;
    const getCourseUrl = this.apiContext.host + this.apiCenter.getAllCourse;
    const param = new HttpParams()
      .set('centerId', this.centerId + '');
    this.http.get<Course[]>(getCourseUrl, {params: param}).toPromise().then(data => {
        console.log(data);
        this.listCourse = data;
        this.getAllForm();
        this.isLoading = false;
      },
      error => {
        console.log(error);
        this.isLoading = false;
      });
    this.loadStudentData();

  }

  getAllForm() {
    this.isLoading = true;
    const param = new HttpParams()
      .set('centerId', this.centerId + '');
    const url = this.apiContext.host + this.apiCenter.getAllAdmissionForm;
    this.http.get<AdmissionForm[]>(url, {params: param}).toPromise().then(data => {
        this.listForm = data;
        console.log(data);
        this.isLoading = false;
      },
      error => {
        console.log(error);
        this.isLoading = false;
      });
  }

  ReLoadForm() {
    this.isLoading = true;
    this.selectedFormId = null;
    if (this.selectedCourseId != null && this.selectedCourseId != undefined) {
      const param = new HttpParams()
        .set('courseId', this.selectedCourseId)
        .set('centerId', this.centerId + '');
      const url = this.apiContext.host + this.apiCenter.getAllAdmissionFormByCid;
      this.http.get<AdmissionForm[]>(url, {params: param}).toPromise().then(data => {
          this.listForm = data;
          console.log(data);
          this.isLoading = false;
        },
        error => {
          console.log(error);
          this.isLoading = false;
        });
    } else {
      this.getAllForm();
    }
  }

  pagination(totalData: number) {
    this.listPage = new Array();
    if (totalData % this.pageSize == 0) {
      for (let i = 1; i <= totalData / this.pageSize; i++) {
        this.listPage.push({value: i, text: 'Page ' + i});
      }
    } else {
      for (let i = 1; i <= Math.floor(totalData / this.pageSize) + 1; i++) {
        this.listPage.push({value: i, text: 'Page ' + i});
      }
    }
  }

  UnselectAllItem() {
    this.listStudent.forEach(item => {
      item.selected = false;
    });
  }

  loadStudentData() {
    this.isLoading = true;
    const paramToGetTotal = new HttpParams()
      .set('admissionFormId', this.selectedFormId == null ? '-1' : this.selectedFormId)
      .set('studentName', this.studentName)
      .set('phoneNumber', this.phoneNumber)
      .set('courseId', this.selectedCourseId == null ? '-1' : this.selectedCourseId)
      .set('centerId', this.centerId + '');
    const getTotalurl = this.apiContext.host + this.apiCenter.getTotalRegisteredStudent;
    this.http.get<number>(getTotalurl, {params: paramToGetTotal}).toPromise().then(data => {
        this.totalData = data;
        console.log(data);
        if (this.totalData == 0) {
          this.empty = true;
          this.isLoading = false;
        }
        if (this.totalData != 0) {
          this.pagination(this.totalData);
          this.empty = false;
          const param = new HttpParams()
            .set('admissionFormId', this.selectedFormId == null ? '-1' : this.selectedFormId)
            .set('studentName', this.studentName)
            .set('phoneNumber', this.phoneNumber)
            .set('courseId', this.selectedCourseId == null ? '-1' : this.selectedCourseId)
            .set('centerId', this.centerId + '')
            .set('pageSize', this.pageSize + '')
            .set('currentPage', this.currentPage + '');
          const url = this.apiContext.host + this.apiCenter.searchRegisteredStudent;
          this.http.get<Student[]>(url, {params: param}).toPromise().then(data2 => {
              this.listStudent = data2;
              console.log(this.listStudent);
              this.UnselectAllItem();
              this.listStudent.forEach(item => {
                if (item.Dob != null && item.Dob != undefined && item.Dob.length >= 10) {
                  item.Dob = item.Dob.substr(0, 10);
                }
                if (item.Sex) {
                  item.realSex = 'Male';
                } else {
                  item.realSex = 'Female';
                }
              });
              this.isLoading = false;
            },
            error => {
              console.log(error);
              this.isLoading = false;
            });
        }
      },
      error => {
        console.log(error);
        this.isLoading = false;
      });

  }

  changePageSize() {
    this.currentPage = 1;
    this.loadStudentData();
  }

  searchStudent() {
    this.currentPage = 1;
    this.loadStudentData();
  }

  changePage() {
    this.loadStudentData();
  }

  grantAccountForOne(student: Student) {
    this.isLoading = true;
    const url = this.apiContext.host + this.apiCenter.grantAccountForStudent;
    const param = new Array();
    param.push({RegisteredCandidateId: student.Id, CenterId: this.centerId});
    this.http.post(url, param).toPromise().then(data => {
        console.log(data);
        this.msg = 'success';
        this.loadStudentData();
        this.isLoading = false;
      },
      error => {
        console.log(error);
        this.msg = 'error';
        this.isLoading = false;
      });
  }

  grantAccountForMany() {
    this.isLoading = true;
    const url = this.apiContext.host + this.apiCenter.grantAccountForStudent;
    const param = new Array();
    const listSelectedStudent = this.listStudent.filter(item => item.selected && item.IsPayment && !item.IsGrantedAccount);
    listSelectedStudent.forEach(item => {
      param.push({RegisteredCandidateId: item.Id, CenterId: this.centerId});
    });
    this.http.post(url, param).toPromise().then(data => {
        console.log(data);
        this.msg = 'success';
        this.loadStudentData();
        this.isLoading = false;
      },
      error => {
        console.log(error);
        this.msg = 'error';
        this.isLoading = false;
      });
  }

  removeMessage() {
    this.msg = '';
  }
}
