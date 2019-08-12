import {AfterContentInit, AfterViewInit, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Course} from '../course';
import {AdmissionForm} from '../admission-form';
import {Student} from '../entity/student';
import {APIAccounting, APIContext} from '../APIContext';
import * as $ from 'jquery';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-account-staff-confirm-student',
  templateUrl: './account-staff-confirm-student.component.html',
  styleUrls: ['./account-staff-confirm-student.component.css'
    , '../../assets/css/main.css'
    , '../../assets/css/themes/all-themes.css'
    , '../../assets/css/login.css'
    , '../../assets/plugins/sweetalert/sweetalert.css']
})
export class AccountStaffConfirmStudentComponent implements OnInit, AfterViewInit {

  constructor(private router: Router, private http: HttpClient, private toastr: ToastrService) {
  }

  apiContext = new APIContext();
  apiAccounting = new APIAccounting();
  centerId: number;

  listCourse: Course[];
  listForm: AdmissionForm[];
  selectedCourseId;
  selectedFormId;
  studentName = '';
  phoneNumber = '';
  pageSize = 15;
  currentPage = 1;
  listStudent: Student[];
  totalData = 0;
  empty = true;
  listPage: any[];
  listPageSize = [5, 10, 20, 50];
  loading: boolean;
  isLoading = true;
  listPageDisplay: number[];
  isSelectedAll = false;


  ngOnInit() {
    const urlGetCenterId = this.apiContext.host + this.apiAccounting.getCenter;
    this.http.get(urlGetCenterId).toPromise().then(data => {
      this.centerId = data['Id'];
      this.getInitData();
    });
  }

  ngAfterViewInit(): void {
    this.isLoading = false;
  }

  getInitData() {
    this.isLoading = true;
    this.loading = true;
    const getCourseUrl = this.apiContext.host + this.apiAccounting.getAllCourse;
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
        this.toastr.info('Something is not working right. Please try again soon.');
      });
    this.loadStudentData();
    this.loading = false;


  }

  getAllForm() {
    this.isLoading = true;
    const param = new HttpParams()
      .set('centerId', this.centerId + '');
    const url = this.apiContext.host + this.apiAccounting.getAllAdmissionForm;
    this.http.get<AdmissionForm[]>(url, {params: param}).toPromise().then(data => {
        this.listForm = data;
        console.log(data);
        this.isLoading = false;
      },
      error => {
        console.log(error);
        this.isLoading = false;
        this.toastr.info('Something is not working right. Please try again soon.');
      });
  }

  ReLoadForm() {
    this.isLoading = true;
    this.selectedFormId = null;
    if (this.selectedCourseId != null && this.selectedCourseId != undefined) {
      const param = new HttpParams()
        .set('courseId', this.selectedCourseId)
        .set('centerId', this.centerId + '');
      const url = this.apiContext.host + this.apiAccounting.getAllAdmissionFormByCid;
      this.http.get<AdmissionForm[]>(url, {params: param}).toPromise().then(data => {
          this.listForm = data;
          console.log(data);
          this.isLoading = false;
        },
        error => {
          console.log(error);
          this.isLoading = false;
          this.toastr.info('Something is not working right. Please try again soon.');
        });
    } else {
      this.getAllForm();
    }
  }

  pagination(totalData: number) {
    this.listPage = new Array();
    if (totalData % this.pageSize == 0) {
      for (let i = 1; i <= totalData / this.pageSize; i++) {
        this.listPage.push(i);
      }
    } else {
      for (let i = 1; i <= Math.floor(totalData / this.pageSize) + 1; i++) {
        this.listPage.push(i);
      }
    }
  }

  UnselectAllItem() {
    this.listStudent.forEach(item => {
      item.selected = false;
    });
  }

  loadStudentData() {
    this.isSelectedAll = false;
    this.isLoading = true;
    const paramToGetTotal = new HttpParams()
      .set('admissionFormId', this.selectedFormId == null ? '-1' : this.selectedFormId)
      .set('studentName', this.studentName)
      .set('phoneNumber', this.phoneNumber)
      .set('courseId', this.selectedCourseId == null ? '-1' : this.selectedCourseId)
      .set('centerId', this.centerId + '');
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
          this.updateListPageDisplay();
          this.empty = false;
          const param = new HttpParams()
            .set('admissionFormId', this.selectedFormId == null ? '-1' : this.selectedFormId)
            .set('studentName', this.studentName)
            .set('phoneNumber', this.phoneNumber)
            .set('courseId', this.selectedCourseId == null ? '-1' : this.selectedCourseId)
            .set('centerId', this.centerId + '')
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
              this.toastr.info('Something is not working right. Please try again soon.');
            });
        }
      },
      error => {
        console.log(error);
        this.isLoading = false;
        this.toastr.info('Something is not working right. Please try again soon.');
      });

  }

  updateListPageDisplay() {
    this.listPageDisplay = [];
    if (this.listPage != null && this.listPage.length > 0) {
      switch (this.listPage.length) {
        case 1: {
          this.listPageDisplay.push(1);
          break;
        }
        case 2: {
          this.listPageDisplay.push(1);
          this.listPageDisplay.push(2);
          break;
        }
        default: {
          switch (this.currentPage) {
            case 1: {
              this.listPageDisplay.push(1);
              this.listPageDisplay.push(2);
              this.listPageDisplay.push(3);
              break;
            }
            case this.listPage.length: {
              this.listPageDisplay.push(this.listPage.length - 2);
              this.listPageDisplay.push(this.listPage.length - 1);
              this.listPageDisplay.push(this.listPage.length);
              break;
            }
            default: {
              this.listPageDisplay.push(this.currentPage - 1);
              this.listPageDisplay.push(this.currentPage);
              this.listPageDisplay.push(this.currentPage + 1);
              break;
            }
          }
          break;
        }
      }
    }
    console.log('this.listPage = ');
    console.log(this.listPage);
    console.log('this.listPageDisplay = ');
    console.log(this.listPageDisplay);
  }

  changePageSize() {
    this.currentPage = 1;
    this.loadStudentData();
  }

  searchStudent() {
    this.currentPage = 1;
    this.loadStudentData();
  }

  changePage(cPage: number) {
    this.currentPage = cPage;
    console.log('current page = ' + this.currentPage);
    // this.updateListPageDisplay();
    this.loadStudentData();
  }

  ConfirmFee(item: Student, index) {
    this.isLoading = true;
    if (item.IsPayment == false) {
      const param = new HttpParams()
        .set('StudentId', item.Id + '')
        .set('CenterId', this.centerId + '')
        .set('IsPayment', 'true');
      const url = this.apiContext.host + this.apiAccounting.setPaymentForOneStudent;
      this.http.post(url, param).toPromise().then(data => {
          console.log(data);
          this.listStudent[index].IsPayment = true;
          this.isLoading = false;
          this.toastr.success('Confirm fee of student ' + item.Name + ' successfully.', 'Success!');
          this.updateStatus();
        },
        error => {
          console.log(error);
          this.isLoading = false;
          this.toastr.error('Something goes wrong. Please try again.', 'Oops!');
        });
    }
  }

  RejectFee(item: Student, index) {
    this.isLoading = true;
    if (item.IsPayment == true) {
      const param = new HttpParams()
        .set('StudentId', item.Id + '')
        .set('CenterId', this.centerId + '')
        .set('IsPayment', 'false');
      const url = this.apiContext.host + this.apiAccounting.setPaymentForOneStudent;
      this.http.post(url, param).toPromise().then(data => {
          console.log(data);
          this.listStudent[index].IsPayment = false;
          this.isLoading = false;
          this.toastr.success('Reject fee of student ' + item.Name + ' successfully.', 'Success!');
          this.updateStatus();
        },
        error => {
          console.log(error);
          this.isLoading = false;
          this.toastr.error('Something goes wrong. Please try again.', 'Oops!');
        });
    }
  }

  ConfirmMultiple() {
    this.isLoading = true;
    const selectedItems = this.listStudent.filter(item => item.selected == true && item.IsPayment == false);
    if (selectedItems.length == 0) {
      this.toastr.info('All selected student(s) have been confirmed payment.');
    } else {
      const param = new Array();
      selectedItems.forEach(item => {
        param.push({StudentId: item.Id, CenterId: this.centerId, IsPayment: true});
      });
      const url = this.apiContext.host + this.apiAccounting.setPaymentForManyStudent;
      this.http.post(url, param).toPromise().then(data => {
          console.log(data);
          this.loadStudentData();
          this.isLoading = false;
          this.toastr.success('Confirm fee of ' + selectedItems.length + ' student(s) successfully.', 'Success!');
        },
        error => {
          console.log(error);
          this.isLoading = false;
          this.toastr.error('Something goes wrong. Please try again.', 'Oops!');
        });
    }
  }

  RejectMultiple() {
    this.isLoading = true;
    const selectedItems = this.listStudent.filter(item => item.selected == true && item.IsPayment == true);
    if (selectedItems.length == 0) {
      this.toastr.info('All selected student(s) have been rejected payment.');
    } else {
      const param = new Array();
      selectedItems.forEach(item => {
        param.push({StudentId: item.Id, CenterId: this.centerId, IsPayment: false});
      });
      const url = this.apiContext.host + this.apiAccounting.setPaymentForManyStudent;
      this.http.post(url, param).toPromise().then(data => {
          console.log(data);
          this.loadStudentData();
          this.isLoading = false;
          this.toastr.success('Reject fee of ' + selectedItems.length + ' student(s) successfully.', 'Success!');
        },
        error => {
          console.log(error);
          this.isLoading = false;
          this.toastr.error('Something goes wrong. Please try again.', 'Oops!');
        });
    }
  }

  isInputNumber(evt) {
    const c = String.fromCharCode(evt.which);
    if (!(/[0-9]/.test(c))) {
      evt.preventDefault();
    }
  }

  selectAllFun() {
    this.isSelectedAll = !this.isSelectedAll;
    const checked = this.isSelectedAll;
    this.listStudent.forEach(function(item) {
      item.selected = checked;
    });
  }

  updateSelectAllStatus(student: Student) {
    student.selected = !student.selected;
    let selectAll = false;
    this.listStudent.forEach(function(item) {
      if (item.selected) {
        selectAll = true;
      }
    });
    this.isSelectedAll = selectAll;
  }

  updateStatus() {
    let selectAll = false;
    this.listStudent.forEach(function(item) {
      if (item.selected) {
        selectAll = true;
      }
    });
    this.isSelectedAll = selectAll;
  }
}
