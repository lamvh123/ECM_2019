import {Component, OnInit} from '@angular/core';
import {HttpParams, HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Program} from '../program';
import {Course} from '../course';
import {Class} from '../entity/class';
import {APIContext, APITraining} from '../APIContext';
import {TimetableStatus} from '../timetableStatus';
import {Teacher} from '../teacher';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-list-of-class',
  templateUrl: './list-of-class.component.html',
  styleUrls: ['./list-of-class.component.css'
    , '../../assets/plugins/bootstrap/css/bootstrap.min.css'
    , '../../assets/css/main.css'
    , '../../assets/css/themes/all-themes.css']
})
export class ListOfClassComponent implements OnInit {

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {
  }

  apiContext = new APIContext();
  apiTraining = new APITraining();
  listProgram: Program[];
  listCourse: Course[];
  listTimeTableStatus: TimetableStatus[] = [new TimetableStatus(0, 'False'), new TimetableStatus(1, 'True')];
  listClass: Class[];
  selectedProgramId: number;
  selectedCourseId: number;
  selectedTimeTable: number;
  currentPage = 1;
  pageSize = 20;
  totalData = 0;
  listPage;
  empty;

  ngOnInit() {
    this.loadInitData();
  }

  loadInitData() {
    this.loadProgram();
    this.loadCourse();
    this.loadClass();
    // this.getTeachersBySid(8);
  }

  loadProgram() {
    const url = this.apiContext.host + this.apiTraining.searchProgram;
    const param = new HttpParams()
      .set('programName', '')
      .set('centerId', this.apiContext.centerId + '');
    this.http.get<Program[]>(url, {params: param}).toPromise().then(data => {
        console.log(data);
        this.listProgram = data;
      },
      error => {
        console.log(error);
      });
  }

  loadCourse() {
    const url = this.apiContext.host + this.apiTraining.searchCourseByProgramId;
    const param = new HttpParams()
      .set('centerId', this.apiContext.centerId + '')
      .set('programId', this.selectedProgramId == null ? '-1' : this.selectedProgramId + '');
    this.http.get<Course[]>(url, {params: param}).toPromise().then(data => {
        console.log(data);
        this.listCourse = data;
      },
      error => {
        console.log(error);
      });
  }

  reloadCourse() {
    this.selectedCourseId = undefined;
    this.loadCourse();
  }

  loadClass() {
    const url = this.apiContext.host + this.apiTraining.searchClass;
    const param = new HttpParams()
      .set('courseId', this.selectedCourseId == undefined ? '-1' : this.selectedCourseId + '')
      .set('centerId', this.apiContext.centerId + '')
      .set('programId', this.selectedProgramId == undefined ? '-1' : this.selectedProgramId + '')
      .set('IsCreatedTimeTable', this.selectedTimeTable == undefined ? '-1' : this.selectedTimeTable + '')
      .set('pageSize', this.pageSize + '')
      .set('currentPage', this.currentPage + '');
    this.http.get<Class[]>(url, {params: param}).toPromise().then(data => {
        console.log(data);
        this.listClass = data;
        this.unselectAll();
      },
      error => {
        console.log(error);
      });
    this.getTotalClassAndPagi();
  }

  unselectAll() {
    this.listClass.forEach(item => {
      item.selected = false;
      console.log(item.SubjectId);
      this.getTeachersBySid(item);
    });
  }

  getTotalClassAndPagi() {
    const url = this.apiContext.host + this.apiTraining.searchClass;
    const param = new HttpParams()
      .set('programId', this.selectedProgramId == undefined ? '-1' : this.selectedProgramId + '')
      .set('courseId', this.selectedCourseId == undefined ? '-1' : this.selectedCourseId + '')
      .set('centerId', this.apiContext.centerId + '')
      .set('IsCreatedTimeTable', this.selectedTimeTable == undefined ? '-1' : this.selectedTimeTable + '')
      .set('pageSize', '1000')
      .set('currentPage', '1');
    this.http.get<any[]>(url, {params: param}).toPromise().then(data => {
        console.log(data);
        this.totalData = data.length;
        this.pagination(this.totalData);
      },
      error => {
        console.log(error);
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

  navigateToListStudent(item: Class) {
    this.router.navigate(['/Training-staff/ListStudentOfClass', {id: item.ClassId}]);
  }

  resetProgram() {
    this.selectedProgramId = undefined;
  }

  resetTimeTableStatus() {
    this.selectedTimeTable = undefined;
  }

  getTeachersBySid(param: Class) {
    const body = new HttpParams()
      .set('centerId', this.apiContext.centerId + '')
      .set('subjectId', param.SubjectId + '');

    const configUrl = this.apiContext.host + this.apiTraining.getTeacherBySubject;
    this.http.get<Teacher[]>(configUrl, {params: body}).toPromise().then(res => {
        console.log('hic');
        param.TeacherList = res;
      },
      error => {
        console.log(error);
      });
  }

  assignTeacher(value: any, cId: string) {
    const url = this.apiContext.host + this.apiTraining.assignTeacherToClass;
    const param = new HttpParams()
      .set('TeacherId', value == undefined ? '-1' : value + '')
      .set('ClassId', cId == undefined ? '-1' : cId + '')
      .set('centerId', this.apiContext.centerId + '');
    this.http.post(url, param).toPromise().then(data => {
        console.log(data);
      },
      error => {
        console.log(error);
      });
  }
}
