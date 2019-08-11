import {Component, OnInit} from '@angular/core';
import {HttpParams, HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Program} from '../program';
import {Course} from '../course';
import {Class} from '../entity/class';
import {APIContext, APITraining} from '../APIContext';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-auto-generate-timetable',
  templateUrl: './auto-generate-timetable.component.html',
  styleUrls: ['./auto-generate-timetable.component.css', '../../assets/css/main.css',
    '../../assets/css/themes/all-themes.css']
})
export class AutoGenerateTimetableComponent implements OnInit {

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, private toastr: ToastrService) {
  }

  apiContext = new APIContext();
  apiTraining = new APITraining();
  centerId: number;

  listProgram: Program[];
  listCourse: Course[];
  listClass: Class[];
  selectedProgramId = -1;
  selectedCourseId = -1;
  currentPage = 1;
  pageSize = 20;
  totalData = 0;
  listPage;
  empty;
  msg = '';

  ngOnInit() {
    const urlGetCenterId = this.apiContext.host + this.apiTraining.getCenter;
    this.http.get(urlGetCenterId).toPromise().then(data => {
      this.centerId = data['Id'];
      this.loadInitData();
    });
  }

  loadInitData() {
    this.loadProgram();
    this.loadCourse();
    this.loadClass();
  }

  loadProgram() {
    const url = this.apiContext.host + this.apiTraining.searchProgram;
    var param = new HttpParams()
      .set('programName', '')
      .set('centerId', this.centerId + '');
    this.http.get<Program[]>(url, {params: param}).toPromise().then(data => {
        console.log(data);
        this.listProgram = data;
      },
      error => {
        console.log(error);
        this.toastr.info('Something is not working right. Please try again soon.');
      });
  }

  loadCourse() {
    const url = this.apiContext.host + this.apiTraining.searchCourseByProgramId;
    var param = new HttpParams()
      .set('centerId', this.centerId + '')
      .set('programId', this.selectedProgramId == null ? '-1' : this.selectedProgramId + '');
    this.http.get<Course[]>(url, {params: param}).toPromise().then(data => {
        console.log(data);
        this.listCourse = data;
      },
      error => {
        console.log(error);
        this.toastr.info('Something is not working right. Please try again soon.');
      });
  }

  reloadCourse() {
    this.selectedCourseId = -1;
    this.loadCourse();
  }

  loadClass() {
    const url = this.apiContext.host + this.apiTraining.searchClass;
    const param = new HttpParams()
      .set('courseId', this.selectedCourseId == null ? '-1' : this.selectedCourseId + '')
      .set('centerId', this.centerId + '')
      .set('programId', this.selectedProgramId == null ? '-1' : this.selectedProgramId + '')
      .set('IsCreatedTimeTable', '0')
      .set('pageSize', this.pageSize + '')
      .set('currentPage', this.currentPage + '');
    this.http.get<Class[]>(url, {params: param}).toPromise().then(data => {
        console.log(data);
        this.listClass = data;
        this.unselectAll();
      },
      error => {
        console.log(error);
        this.toastr.info('Something is not working right. Please try again soon.');
      });
    this.getTotalClassAndPagi();
  }

  unselectAll() {
    this.listClass.forEach(item => {
      item.selected = false;
    });
  }

  getTotalClassAndPagi() {
    const url = this.apiContext.host + this.apiTraining.searchClass;
    const param = new HttpParams()
      .set('programId', this.selectedProgramId == null ? '-1' : this.selectedProgramId + '')
      .set('courseId', this.selectedCourseId == null ? '-1' : this.selectedCourseId + '')
      .set('centerId', this.centerId + '')
      .set('IsCreatedTimeTable', '0').set('pageSize', '1000')
      .set('currentPage', '1');
    this.http.get<any[]>(url, {params: param}).toPromise().then(data => {
        console.log(data);
        this.totalData = data.length;
        this.pagination(this.totalData);
      },
      error => {
        console.log(error);
        this.toastr.info('Something is not working right. Please try again soon.');
      });
  }

  pagination(totalData: number) {
    if (totalData == 0) {
      this.empty = true;
    } else {
      this.empty = false;
    }
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
    console.log(this.listPage);
  }

  searchClass() {
    this.currentPage = 1;
    this.loadClass();
  }

  changePageSize() {
    this.currentPage = 1;
    this.loadClass();
  }

  changePage() {
    this.loadClass();
  }

  generateTimetable() {
    let listSelectedClass: Class[];
    listSelectedClass = this.listClass.filter(item => item.selected);
    let param = new Array();
    listSelectedClass.forEach(item => {
      param.push({ClassId: item.ClassId, CenterId: this.centerId});
    });
    const url = this.apiContext.host + this.apiTraining.generateTimeTable;
    this.http.post(url, param).toPromise().then(data => {
        console.log(data);
        this.toastr.success('Time table of ' + listSelectedClass.length + ' class(es) was generated successfully.', 'Success!');
        this.loadClass();
      },
      error => {
        console.log(error);
        this.toastr.error('Something goes wrong. Please try again.', 'Oops!');
      });
  }

}
