import {AfterContentInit, AfterViewInit, Component, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Teacher} from '../teacher';
import {APIContext, APITraining} from '../APIContext';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-view-teacher',
  templateUrl: './view-teacher.component.html',
  styleUrls: ['./view-teacher.component.css'
    , '../../assets/plugins/bootstrap/css/bootstrap.min.css'
    , '../../assets/css/main.css'
    , '../../assets/css/themes/all-themes.css']
})
export class ViewTeacherComponent implements OnInit, AfterViewInit {
  isLoading = true;
  apiContext = new APIContext();
  apiTraining = new APITraining();
  centerId: number;

  teacherList: Teacher[];
  listPage: any[];
  pageSize = 8;
  currentPage = 1;
  listPageDisplay: number[];
  totalTeacher = 0;

  teacherName = '';
  teacherEmail = '';

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) {
  }

  ngOnInit() {
    const urlGetCenterId = this.apiContext.host + this.apiTraining.getCenter;
    this.http.get(urlGetCenterId).toPromise().then(data => {
      this.centerId = data['Id'];
      this.getTeachers();
    });
  }

  ngAfterViewInit(): void {
    this.isLoading = false;
  }

  getTeachers() {
    this.isLoading = true;

    const bodyTotal = new HttpParams()
      .set('teacherName', this.teacherName)
      .set('teacherEmail', this.teacherEmail)
      .set('subjectId', '-1')
      .set('centerId', this.centerId + '');

    const configTotal = this.apiContext.host + this.apiTraining.getTotalTeacher;
    this.http.get<number>(configTotal, {params: bodyTotal}).toPromise().then(resTotal => {
        if (resTotal == null || resTotal <= 0) {
          this.totalTeacher = 0;
          this.isLoading = false;
        } else {
          this.totalTeacher = resTotal;
          this.pagination(this.totalTeacher);
          this.updateListPageDisplay();
          const body = new HttpParams()
            .set('teacherName', this.teacherName)
            .set('teacherEmail', this.teacherEmail)
            .set('subjectId', '-1')
            .set('centerId', this.centerId + '')
            .set('currentPage', this.currentPage + '')
            .set('pageSize', this.pageSize + '');

          const configUrl = this.apiContext.host + this.apiTraining.searchTeacher;
          this.http.get<Teacher[]>(configUrl, {params: body}).toPromise().then(res => {
              console.log(res);
              this.teacherList = res;
              console.log(this.teacherList);
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

  getSubjects(index: number) {
    let subjects = '';
    this.teacherList[index].Subjects.forEach(function(subModel) {
      subjects += subModel.Name + ',';
    });
    return subjects;
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

  changePage(cPage: number) {
    this.currentPage = cPage;
    console.log('current page = ' + this.currentPage);
    // this.updateListPageDisplay();
    this.getTeachers();
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
