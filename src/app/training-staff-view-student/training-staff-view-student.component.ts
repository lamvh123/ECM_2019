import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DatePipe} from '@angular/common';
import {APIContext, APITraining} from '../APIContext';
import {OfficalStudent} from '../entity/offical-student';
import {Teacher} from '../teacher';

@Component({
  selector: 'app-training-staff-view-student',
  templateUrl: './training-staff-view-student.component.html',
  styleUrls: ['./training-staff-view-student.component.css'
    , '../../assets/plugins/bootstrap/css/bootstrap.min.css'
    , '../../assets/plugins/dropzone/dropzone.css'
    , '../../assets/plugins/bootstrap-material-datetimepicker/css/bootstrap-material-datetimepicker.css'
    , '../../assets/plugins/waitme/waitMe.css'
    , '../../assets/plugins/bootstrap-select/css/bootstrap-select.css'
    , '../../assets/css/main.css'
    , '../../assets/css/themes/all-themes.css']
})
export class TrainingStaffViewStudentComponent implements OnInit, AfterViewInit {

  constructor(private _router: Router, private http: HttpClient, private route: ActivatedRoute,
              private toastr: ToastrService, private modalService: NgbModal, private datepipe: DatePipe) {
  }

  centerId;
  pageSize = 12;
  currentPage = 1;
  apiContext = new APIContext();
  apiTraining = new APITraining();
  searchName = '';
  searchEmail = '';
  ListStudent: OfficalStudent[];
  listPage;
  listpagesize = [{val: 10, label: 10}, {val: 20, label: 20}, {val: 50, label: 50}, {val: 100, label: 100}];

  listPageDisplay: number[];
  isLoading = true;
  totalTeacher: number;

  ngOnInit() {
    this.initData();
  }

  ngAfterViewInit(): void {
    this.isLoading = false;
  }

  initData() {
    const urlGetCenterId = this.apiContext.host + this.apiTraining.getCenter;
    this.http.get(urlGetCenterId).toPromise().then(data => {
      this.centerId = data['Id'];
      this.getTeachers();

    });
  }

  // loadStudent() {
  //   this.isLoading = true;
  //   const urlGetTotalStudent = this.apiContext.host + this.apiTraining.searchStudent;
  //   const param = new HttpParams()
  //     .set('email', this.searchEmail + '')
  //     .set('name', this.searchName)
  //     .set('centerId', this.centerId)
  //     .set('pageSize', this.pageSize + '')
  //     .set('currentPage', this.currentPage + '');
  //   this.http.get<OfficalStudent[]>(urlGetTotalStudent, {params: param}).toPromise().then(data => {
  //     this.ListStudent = data;
  //     console.log(data);
  //     this.isLoading = false;
  //   });
  //
  // }

  // searchStudent() {
  //   this.getTotalPage();
  //   //this.loadStudent();
  // }

  // changePage() {
  //   this.loadStudent();
  // }
  changePage(cPage: number) {
    this.currentPage = cPage;
    console.log('current page = ' + this.currentPage);
    // this.updateListPageDisplay();
    this.getTeachers();
  }

  // changePagesize() {
  //   this.getTotalPage();
  //   //this.loadStudent();
  // }
  //
  // getTotalPage() {
  //   this.isLoading = true;
  //   const url = this.apiContext.host + this.apiTraining.getTotalStudent;
  //   const param = new HttpParams()
  //     .set('email', this.searchEmail + '')
  //     .set('name', this.searchName)
  //     .set('centerId', this.centerId);
  //   this.http.get<any>(url, {params: param}).toPromise().then(data => {
  //     console.log(data);
  //     this.totalTeacher = data;
  //     // if (this.totalTeacher != 0) {
  //     //   this.currentPage = 1;
  //     //   this.listPage = new Array;
  //     //   var totalPage = 0;
  //     //   if (data % this.pageSize == 0) {
  //     //     totalPage = data / this.pageSize;
  //     //   } else {
  //     //     // totalPage = parseInt( (data / this.pageSize).toFixed() )+ 1;
  //     //     totalPage = Math.floor(data / this.pageSize) + 1;
  //     //   }
  //     //   for (var i = 1; i <= totalPage; i++) {
  //     //     this.listPage = [...this.listPage, {label: 'Page ' + i + '/' + totalPage, value: i}];
  //     //   }
  //     // }
  //     if (this.totalTeacher != null && this.totalTeacher != 0) {
  //       this.pagination(this.totalTeacher);
  //       this.updateListPageDisplay();
  //       this.loadStudent();
  //     }
  //     this.isLoading = false;
  //   });
  // }


  getTeachers() {
    this.isLoading = true;

    const bodyTotal = new HttpParams()
      .set('email', this.searchEmail + '')
      .set('name', this.searchName)
      .set('centerId', this.centerId+'');

    const configTotal = this.apiContext.host + this.apiTraining.getTotalStudent;
    this.http.get<number>(configTotal, {params: bodyTotal}).toPromise().then(resTotal => {
        if (resTotal == null || resTotal <= 0) {
          this.totalTeacher = 0;
          this.isLoading = false;
        } else {
          this.totalTeacher = resTotal;
          this.pagination(this.totalTeacher);
          this.updateListPageDisplay();
          const body = new HttpParams()
            .set('email', this.searchEmail + '')
            .set('name', this.searchName)
            .set('centerId', this.centerId)
            .set('pageSize', this.pageSize + '')
            .set('currentPage', this.currentPage + '');

          const configUrl = this.apiContext.host + this.apiTraining.searchStudent;
          this.http.get<OfficalStudent[]>(configUrl, {params: body}).toPromise().then(res => {
              console.log(res);
              this.ListStudent = res;
              console.log(this.ListStudent);
              this.isLoading = false;
            },
            error => {
              console.log(error);
              this.isLoading = false;
              this.toastr.info('Something is not working right. Please try again soon.');
            });
        }

      },
      err => {
        console.log(err);
        this.isLoading = false;
        this.toastr.info('Something is not working right. Please try again soon.');
      });


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

}
