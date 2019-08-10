import {AfterContentInit, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Course} from '../course';
import {AdmissionForm} from '../admission-form';
import {Student} from '../entity/student';
import {SpinnerVisibilityService} from 'ng-http-loader';
import {APIAccounting, APIContext} from '../APIContext';

@Component({
  selector: 'app-account-staff-confirm-student',
  templateUrl: './account-staff-confirm-student.component.html',
  styleUrls: ['./account-staff-confirm-student.component.css'
    , '../../assets/css/main.css'
    , '../../assets/css/themes/all-themes.css', '../../assets/css/login.css']
})
export class AccountStaffConfirmStudentComponent implements OnInit, AfterContentInit {

  constructor(private router: Router, private http: HttpClient, private spinner: SpinnerVisibilityService) {
  }

  apiContext = new APIContext();
  apiAccounting = new APIAccounting();

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
  loading: boolean;
  isLoading = true;

  ngOnInit() {
    this.getInitData();
  }

  ngAfterContentInit(): void {
    this.isLoading = false;
  }

  getInitData() {
    this.isLoading = true;
    this.spinner.show();
    this.loading = true;
    const getCourseUrl = this.apiContext.host + this.apiAccounting.getAllCourse;
    const param = new HttpParams()
      .set('centerId', this.apiContext.centerId + '');
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
    this.loading = false;
    this.spinner.hide();


  }

  getAllForm() {
    this.isLoading = true;
    const param = new HttpParams()
      .set('centerId', this.apiContext.centerId + '');
    const url = this.apiContext.host + this.apiAccounting.getAllAdmissionForm;
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
    this.selectedFormId = null;
    if (this.selectedCourseId != null && this.selectedCourseId != undefined) {
      const param = new HttpParams()
        .set('courseId', this.selectedCourseId)
        .set('centerId', this.apiContext.centerId + '');
      const url = this.apiContext.host + this.apiAccounting.getAllAdmissionFormByCid;
      this.http.get<AdmissionForm[]>(url, {params: param}).toPromise().then(data => {
          this.listForm = data;
          console.log(data);
        },
        error => {
          console.log(error);
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
      .set('centerId', this.apiContext.centerId + '');
    const getTotalurl = this.apiContext.host + this.apiAccounting.getTotalRegisteredStudent;
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
            .set('centerId', this.apiContext.centerId + '')
            .set('pageSize', this.pageSize + '')
            .set('currentPage', this.currentPage + '');
          const url = this.apiContext.host + this.apiAccounting.searchRegisteredStudent;
          this.http.get<Student[]>(url, {params: param}).toPromise().then(data => {
              this.listStudent = data;
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

  ConfirmFee(item: Student, index) {
    this.isLoading = true;
    if (item.IsPayment == false) {
      const param = new HttpParams()
        .set('StudentId', item.Id + '')
        .set('CenterId', this.apiContext.centerId + '')
        .set('IsPayment', 'true');
      const url = this.apiContext.host + this.apiAccounting.setPaymentForOneStudent;
      this.http.post(url, param).toPromise().then(data => {
          console.log(data);
          this.listStudent[index].IsPayment = true;
          this.msg = 'success';
          this.isLoading = false;
        },
        error => {
          console.log(error);
          this.msg = 'error';
          this.isLoading = false;
        });
    }
  }

  RejectFee(item: Student, index) {
    this.isLoading = true;
    if (item.IsPayment == true) {
      const param = new HttpParams()
        .set('StudentId', item.Id + '')
        .set('CenterId', this.apiContext.centerId + '')
        .set('IsPayment', 'false');
      const url = this.apiContext.host + this.apiAccounting.setPaymentForOneStudent;
      this.http.post(url, param).toPromise().then(data => {
          console.log(data);
          this.listStudent[index].IsPayment = false;
          this.msg = 'success';
          this.isLoading = false;
        },
        error => {
          console.log(error);
          this.msg = 'error';
          this.isLoading = false;
        });
    }
  }

  ConfirmMultiple() {
    this.isLoading = true;
    const selectedItems = this.listStudent.filter(item => item.selected == true && item.IsPayment == false);
    const param = new Array();
    selectedItems.forEach(item => {
      param.push({StudentId: item.Id, CenterId: this.apiContext.centerId, IsPayment: true});
    });
    const url = this.apiContext.host + this.apiAccounting.setPaymentForManyStudent;
    this.http.post(url, param).toPromise().then(data => {
        console.log(data);
        this.loadStudentData();
        this.msg = 'success';
        this.isLoading = false;
      },
      error => {
        console.log(error);
        this.msg = 'error';
        this.isLoading = false;
      });

  }

  RejectMultiple() {
    this.isLoading = true;
    const selectedItems = this.listStudent.filter(item => item.selected == true && item.IsPayment == true);
    const param = new Array();
    selectedItems.forEach(item => {
      param.push({StudentId: item.Id, CenterId: this.apiContext.centerId, IsPayment: false});
    });
    const url = this.apiContext.host + this.apiAccounting.setPaymentForManyStudent;
    this.http.post(url, param).toPromise().then(data => {
        console.log(data);
        this.loadStudentData();
        this.msg = 'success';
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

  isInputNumber(evt) {
    const c = String.fromCharCode(evt.which);
    if (!(/[0-9]/.test(c))) {
      evt.preventDefault();
    }
  }

}
