import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import {HttpClient, HttpParams} from '@angular/common/http';
import {OfficalStudent} from '../entity/offical-student';
import {APIContext, APITraining} from '../APIContext';
import {Class} from '../entity/class';
import {ToastrService} from 'ngx-toastr';
import {Timetable} from '../timetable';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Teacher} from '../teacher';
import {Room} from '../room';
import {DatePipe} from '@angular/common';
import {Slot} from '../slot';
import {Building} from '../building';
import {AdmissionForm} from '../admission-form';

@Component({
  selector: 'app-list-student-of-class',
  templateUrl: './list-student-of-class.component.html',
  styleUrls: ['./list-student-of-class.component.css'
    , '../../assets/plugins/bootstrap/css/bootstrap.min.css'
    , '../../assets/css/main.css'
    , '../../assets/css/themes/all-themes.css']
})
export class ListStudentOfClassComponent implements OnInit, AfterViewInit {
  private updatingTtb: Timetable;
  private errorMsgTeacher = '-';
  private errorMsgRoom = '-';
  private errorMsgSlot = '-';
  private errorMsgDay = '-';
  private selectedBuildingId = -1;

  constructor(private _router: Router, private http: HttpClient, private route: ActivatedRoute, private toastr: ToastrService, private modalService: NgbModal, private datepipe: DatePipe) {
  }

  apiContext = new APIContext();
  apiTraining = new APITraining();
  centerId: number;

  ClassId;
  ListStudent: OfficalStudent[];
  currentClass: Class;
  isLoading = true;
  listTimetable: Timetable[];
  listTeachers: Teacher[];
  listRoom: Room[];
  listBuilding: Building[];
  listSlot: Slot[];

  newTeacherId: number;
  newRoomId: number;
  newLearningDay: string;
  newSlotId: number;

  ngOnInit() {
    this.ClassId = this.route.snapshot.paramMap.get('cId');
    const urlGetCenterId = this.apiContext.host + this.apiTraining.getCenter;
    this.http.get(urlGetCenterId).toPromise().then(data => {
      this.centerId = data['Id'];
      this.loadClassInfo();
      this.loadStudent();
      this.loadTimetable();
    });
  }

  ngAfterViewInit(): void {
    this.triggerEnterForm('formAdd', 'btnAdd');
    this.isLoading = false;
  }

  triggerEnterForm(formId: string, btnId: string) {
    const signInForm = document.getElementById(formId);
    signInForm.addEventListener('keyup', function(event) {
      if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById(btnId).click();
      }
    });
  }

  loadStudent() {
    this.isLoading = true;
    const url = this.apiContext.host + this.apiTraining.getClassById;
    const param = new HttpParams()
      .set('centerId', this.centerId + '')
      .set('classId', this.ClassId);
    this.http.get<OfficalStudent[]>(url, {params: param}).toPromise().then(data => {
        console.log(data);
        this.ListStudent = data;
        this.ListStudent.forEach(item => {
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
        // this.showMessage(false);
      });
  }

  loadClassInfo() {
    this.isLoading = true;
    const url = this.apiContext.host + this.apiTraining.getDetailClassById;
    const param = new HttpParams()
      .set('centerId', this.centerId + '')
      .set('classId', this.ClassId);
    this.http.get<Class>(url, {params: param}).toPromise().then(data => {
        console.log(data);
        this.currentClass = data;
        this.getTeachersBySid(this.currentClass);
        // this.getRoomByCid(this.currentClass);
        this.getSlots();
        this.getBuildings();
        this.getRoomsByBuildingId(-1);
        this.isLoading = false;
      },
      error => {
        console.log(error);
        this.isLoading = false;
        this.toastr.info('Something is not working right. Please try again soon.');
        // this.showMessage(false);
      });
  }

  loadTimetable() {
    this.isLoading = true;
    const url = this.apiContext.host + this.apiTraining.getTimeTableOfParticularClass;
    const param = new HttpParams()
      .set('centerId', this.centerId + '')
      .set('classId', this.ClassId);
    this.http.get<Timetable[]>(url, {params: param}).toPromise().then(data => {
        console.log(data);
        this.listTimetable = data;
        this.listTimetable.forEach(function(item) {
          const splitted = item.LearningDay.substring(0, 10).split('-', 3);
          console.log(splitted);
          item.displayDay = splitted[2] + '/' + splitted[1] + '/' + splitted[0];
        });
        this.isLoading = false;
      },
      error => {
        console.log(error);
        this.isLoading = false;
        this.toastr.info('Something is not working right. Please try again soon.');
        // this.showMessage(false);
      });
  }

  openAttendanceForm(longContent, ttb: Timetable) {
    this.updatingTtb = ttb;
    if (ttb.teacher == null) {
      this.newTeacherId = -1;
    } else {
      this.newTeacherId = ttb.teacher.Id;
    }
    if (ttb.Room == null) {
      this.newRoomId = -1;
    } else {
      this.newRoomId = ttb.Room.Id;
    }
    if (ttb.slot == null) {
      this.newSlotId = -1;
    } else {
      this.newSlotId = ttb.slot.ID;
    }
    if (ttb.LearningDay == null) {
      this.newLearningDay = '';
    } else {
      this.newLearningDay = ttb.LearningDay.substring(0, 10);
    }
    console.log(this.modalService);
    this.modalService.open(longContent, {size: 'lg'});
  }

  getTeachersBySid(param: Class) {
    this.isLoading = true;
    const body = new HttpParams()
      .set('centerId', this.centerId + '')
      .set('subjectId', param.SubjectId + '');

    const configUrl = this.apiContext.host + this.apiTraining.getTeacherBySubject;
    this.http.get<Teacher[]>(configUrl, {params: body}).toPromise().then(res => {
        console.log('hic');
        this.listTeachers = res;
        this.updateListTeacherDisplay(this.listTeachers);
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
        this.listRoom = res;
        this.isLoading = false;
      },
      error => {
        console.log(error);
        this.isLoading = false;
        this.toastr.info('Something is not working right. Please try again soon.');
      });
  }

  getSlots() {
    this.isLoading = true;
    const body = new HttpParams()
      .set('centerId', this.centerId + '');

    const configUrl = this.apiContext.host + this.apiTraining.getAllSlot;
    this.http.get<Slot[]>(configUrl, {params: body}).toPromise().then(res => {
        console.log('hic');
        this.listSlot = res;
        this.updateListSlopDisplay(this.listSlot);
        this.isLoading = false;
      },
      error => {
        console.log(error);
        this.isLoading = false;
        this.toastr.info('Something is not working right. Please try again soon.');
      });
  }

  getBuildings() {
    this.isLoading = true;
    const body = new HttpParams()
      .set('centerId', this.centerId + '')
      .set('name', '')
      .set('address', '');

    const configUrl = this.apiContext.host + this.apiTraining.searchBuilding;
    this.http.get<Building[]>(configUrl, {params: body}).toPromise().then(res => {
        console.log(res);
        this.listBuilding = res;
        console.log(this.listBuilding);
        this.isLoading = false;
      },
      error => {
        console.log(error);
        this.isLoading = false;
        this.toastr.info('Something is not working right. Please try again soon.');
      });
  }


  getRoomsByBuildingId(bId: number) {
    this.isLoading = true;
    const body = new HttpParams()
      .set('centerId', this.centerId + '')
      .set('roomNumber', '')
      .set('buildingId', bId + '');

    const configUrl = this.apiContext.host + this.apiTraining.searchRoom;
    this.http.get<Room[]>(configUrl, {params: body}).toPromise().then(res => {
        console.log(res);
        this.listRoom = res;
        console.log(this.listRoom);
        this.isLoading = false;
      },
      error => {
        console.log(error);
        this.isLoading = false;
        this.toastr.info('Something is not working right. Please try again soon.');
      });
  }

  changBuilding() {
    this.newRoomId = null;
    this.clearBuilding();
  }

  clearBuilding() {
    this.isLoading = true;
    if (this.selectedBuildingId != null && this.selectedBuildingId != undefined) {
      this.getRoomsByBuildingId(this.selectedBuildingId);
    } else {
      this.getRoomsByBuildingId(-1);
    }
  }

  updateSession() {
    this.isLoading = true;
    const date = new Date(this.newLearningDay);
    const dateString = this.datepipe.transform(date, 'MM-dd-yyyy');
    const url = this.apiContext.host + this.apiTraining.updateTimeTable;
    const param = new HttpParams()
      .set('TimeTableId', this.updatingTtb.Id + '')
      .set('TeacherId', this.newTeacherId + '')
      .set('RoomId', this.newRoomId + '')
      .set('LearningDay', dateString)
      .set('SlotId', this.newSlotId + '')
      .set('centerId', this.centerId + '');
    this.http.post(url, param).toPromise().then(data => {
        console.log(data);
        this.isLoading = false;
        this.toastr.success('Update session ' + this.updatingTtb.SessionNumber + ' successfully.', 'Success!');
        this.loadTimetable();
      },
      error => {
        console.log(error);
        this.isLoading = false;
        this.toastr.error('Something goes wrong. Please try again.', 'Oops!');
      });
  }

  checkValidDate() {
    if (this.newLearningDay == null || this.newLearningDay === '') {
      this.errorMsgDay = 'Learning day is required.';
      return false;
    } else {
      this.errorMsgDay = '';
      return true;
    }
  }

  checkValidTeacher() {
    if (this.newTeacherId == null || this.newTeacherId < 0) {
      this.errorMsgTeacher = 'Teacher is required.';
      return false;
    } else {
      this.errorMsgTeacher = '';
      return true;
    }
  }

  checkValidRoom() {
    if (this.newRoomId == null || this.newRoomId < 0) {
      this.errorMsgRoom = 'Room is required.';
      return false;
    } else {
      this.errorMsgRoom = '';
      return true;
    }
  }

  checkValidSlot() {
    if (this.newSlotId == null || this.newSlotId < 0) {
      this.errorMsgSlot = 'Slot is required.';
      return false;
    } else {
      this.errorMsgSlot = '';
      return true;
    }
  }


  checkValidFields() {
    this.checkValidDate();
    this.checkValidSlot();
    this.checkValidTeacher();
    this.checkValidRoom();
    if (this.checkValidDate() && this.checkValidSlot() && this.checkValidTeacher() && this.checkValidRoom()) {
      this.updateSession();
      const btnClose: HTMLElement = document.getElementById('btnClose') as HTMLElement;
      btnClose.click();
    } else {
      this.toastr.warning('Something is missing.', 'Alert!');
    }
  }

  // formatText(s: string) {
  //   return s.trim().replace(/\s\s+/g, ' ');
  // }

  formatText(s: string) {
    console.log('before: ' + s);
    s = s.trim().replace(/\s\s+/g, ' ');
    console.log('after: ' + s);
    return s;
  }

  private updateListSlopDisplay(listSlot: Slot[]) {
    listSlot.forEach(function(item) {
      item.displayText = item.From + ' - ' + item.To;
    });
  }

  private updateListTeacherDisplay(listTeacher: Teacher[]) {
    listTeacher.forEach(function(item) {
      item.tempName = item.User.Full_Name;
    });
  }
}
