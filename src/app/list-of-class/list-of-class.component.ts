import {AfterViewInit, Component, OnInit} from '@angular/core';
import {HttpParams, HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Program} from '../program';
import {Course} from '../course';
import {Class} from '../entity/class';
import {APIContext, APITraining} from '../APIContext';
import {TimetableStatus} from '../timetableStatus';
import {Teacher} from '../teacher';
import {forEach} from '@angular/router/src/utils/collection';
import {Room} from '../room';
import {ToastrService} from 'ngx-toastr';
import {UrlTraining} from '../SiteUrlContext';
import {MenuBarComponent} from '../menu-bar/menu-bar.component';

@Component({
  selector: 'app-list-of-class',
  templateUrl: './list-of-class.component.html',
  styleUrls: ['./list-of-class.component.css'
    , '../../assets/plugins/bootstrap/css/bootstrap.min.css'
    , '../../assets/css/main.css'
    , '../../assets/css/themes/all-themes.css']
})
export class ListOfClassComponent implements OnInit, AfterViewInit {

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, private toastr: ToastrService) {
  }

  apiContext = new APIContext();
  apiTraining = new APITraining();
  centerId: number;
  urlTraining = new UrlTraining();

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
  isLoading = true;

  ngOnInit() {
    const urlGetCenterId = this.apiContext.host + this.apiTraining.getCenter;
    this.http.get(urlGetCenterId).toPromise().then(data => {
      this.centerId = data['Id'];
      this.loadInitData();
    });
  }

  ngAfterViewInit(): void {
    this.isLoading = false;
  }

  loadInitData() {
    this.loadProgram();
    this.loadCourse();
    this.loadClass();
    // this.getTeachersBySid(8);
  }

  loadProgram() {
    this.isLoading = true;
    const url = this.apiContext.host + this.apiTraining.searchProgram;
    const param = new HttpParams()
      .set('programName', '')
      .set('centerId', this.centerId + '');
    this.http.get<Program[]>(url, {params: param}).toPromise().then(data => {
        console.log(data);
        this.listProgram = data;
        this.isLoading = false;
      },
      error => {
        console.log(error);
        this.isLoading = false;
        this.toastr.info('Something is not working right. Please try again soon.');
      });
  }

  loadCourse() {
    const url = this.apiContext.host + this.apiTraining.searchCourseByProgramId;
    const param = new HttpParams()
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
    this.selectedCourseId = undefined;
    this.loadCourse();
  }

  loadClass() {
    this.isLoading = true;
    const url = this.apiContext.host + this.apiTraining.searchClass;
    const param = new HttpParams()
      .set('courseId', this.selectedCourseId == undefined ? '-1' : this.selectedCourseId + '')
      .set('centerId', this.centerId + '')
      .set('programId', this.selectedProgramId == undefined ? '-1' : this.selectedProgramId + '')
      .set('IsCreatedTimeTable', this.selectedTimeTable == undefined ? '-1' : this.selectedTimeTable + '')
      .set('pageSize', this.pageSize + '')
      .set('currentPage', this.currentPage + '');
    this.http.get<Class[]>(url, {params: param}).toPromise().then(data => {
        console.log(data);
        this.listClass = data;
        this.unselectAll();
        this.isLoading = false;
      },
      error => {
        console.log(error);
        this.isLoading = false;
        this.toastr.info('Something is not working right. Please try again soon.');
      });
    this.getTotalClassAndPagi();
  }

  unselectAll() {
    this.listClass.forEach(item => {
      item.selected = false;
      console.log(item.SubjectId);
      this.getTeachersBySid(item);
      this.getRoomByCid(item);
    });
  }

  getTotalClassAndPagi() {
    this.isLoading = true;
    const url = this.apiContext.host + this.apiTraining.searchClass;
    const param = new HttpParams()
      .set('programId', this.selectedProgramId == undefined ? '-1' : this.selectedProgramId + '')
      .set('courseId', this.selectedCourseId == undefined ? '-1' : this.selectedCourseId + '')
      .set('centerId', this.centerId + '')
      .set('IsCreatedTimeTable', this.selectedTimeTable == undefined ? '-1' : this.selectedTimeTable + '')
      .set('pageSize', '1000')
      .set('currentPage', '1');
    this.http.get<any[]>(url, {params: param}).toPromise().then(data => {
        console.log(data);
        this.totalData = data.length;
        this.pagination(this.totalData);
        this.isLoading = false;
      },
      error => {
        console.log(error);
        this.isLoading = false;
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

  navigateToListStudent(item: Class) {
    MenuBarComponent.currentUrl = this.urlTraining.listClass;
    this.router.navigateByUrl(this.urlTraining.listStudentOfClass + '/' + item.ClassId);
  }

  resetProgram() {
    this.selectedProgramId = undefined;
  }

  resetTimeTableStatus() {
    this.selectedTimeTable = undefined;
  }

  getTeachersBySid(param: Class) {
    this.isLoading = true;
    const body = new HttpParams()
      .set('centerId', this.centerId + '')
      .set('subjectId', param.SubjectId + '');

    const configUrl = this.apiContext.host + this.apiTraining.getTeacherBySubject;
    this.http.get<Teacher[]>(configUrl, {params: body}).toPromise().then(res => {
        console.log('hic');
        param.TeacherList = res;
        this.isLoading = false;
      },
      error => {
        console.log(error);
        this.isLoading = false;
        this.toastr.info('Something is not working right. Please try again soon.');
      });
  }

  getRoomByCid(classModel: Class) {
    this.isLoading = true;
    const body = new HttpParams()
      .set('centerId', this.centerId + '')
      .set('classId', classModel.ClassId + '');

    const configUrl = this.apiContext.host + this.apiTraining.getAllRoomAvailbleForClass;
    this.http.get<Room[]>(configUrl, {params: body}).toPromise().then(res => {
        console.log('hic');
        classModel.RoomList = res;
        this.isLoading = false;
      },
      error => {
        console.log(error);
        this.isLoading = false;
        this.toastr.info('Something is not working right. Please try again soon.');
      });
  }

  assignTeacher(value: any, cId: string, cName: string) {
    this.isLoading = true;
    const url = this.apiContext.host + this.apiTraining.assignTeacherToClass;
    const param = new HttpParams()
      .set('TeacherId', value == undefined ? '-1' : value + '')
      .set('ClassId', cId == undefined ? '-1' : cId + '')
      .set('centerId', this.centerId + '');
    this.http.post(url, param).toPromise().then(data => {
        console.log(data);
        this.isLoading = false;
        this.toastr.success('Assign new teacher for class ' + cName + ' successfully.', 'Success!');
      },
      error => {
        console.log(error);
        this.isLoading = false;
        this.toastr.error('Something goes wrong. Please try again.', 'Oops!');
      });
  }

  assignRoom(value: any, cId: string, cName: string) {
    this.isLoading = true;
    const url = this.apiContext.host + this.apiTraining.addRoomToClass;
    const param = new HttpParams()
      .set('RoomId', value == undefined ? '-1' : value + '')
      .set('ClassId', cId == undefined ? '-1' : cId + '')
      .set('CenterId', this.centerId + '');
    this.http.post(url, param).toPromise().then(data => {
        console.log(data);
        this.isLoading = false;
        this.toastr.success('Assign new room for class ' + cName + ' successfully.', 'Success!');
      },
      error => {
        console.log(error);
        this.isLoading = false;
        this.toastr.error('Something goes wrong. Please try again.', 'Oops!');
      });
  }

  closeClass(currentClass: Class) {
    this.isLoading = true;
    const url = this.apiContext.host + this.apiTraining.closeClass;
    const param = new HttpParams()
      .set('ClassId', currentClass.ClassId + '')
      .set('CenterId', this.centerId + '');
    this.http.post(url, param).toPromise().then(data => {
        console.log(data);
        this.isLoading = false;
        this.toastr.success('Class ' + currentClass.ClassName + ' was closed successfully.', 'Success!');
        currentClass.IsClosed = true;
      },
      error => {
        console.log(error);
        this.isLoading = false;
        this.toastr.error('Something goes wrong. Please try again.', 'Oops!');
      });
  }
}
