import {AfterViewInit, Component, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {APIContext, APITeacher} from '../APIContext';
import {ActivatedRoute} from '@angular/router';
import {Timetable} from '../timetable';
import {Attendance} from '../attendance';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-take-attendance',
  templateUrl: './take-attendance.component.html',
  styleUrls: ['./take-attendance.component.css'
    , '../../assets/plugins/bootstrap/css/bootstrap.min.css'
    , '../../assets/plugins/jquery-datatable/dataTables.bootstrap4.min.css'
    , '../../assets/css/main.css'
    , '../../assets/css/themes/all-themes.css']
})
export class TakeAttendanceComponent implements OnInit, AfterViewInit {
  apiContext = new APIContext();
  apiTeacher = new APITeacher();
  currentClassId: string;
  timetableList: Timetable[];
  attendanceList: Attendance[] = [];
  selectedTimeTable: Timetable;

  constructor(private modalService: NgbModal, private http: HttpClient, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.currentClassId = this.route.snapshot.paramMap.get('cId');
  }

  ngAfterViewInit(): void {
    this.getTimeTable();
  }


  getTimeTable() {
    const body = new HttpParams()
      .set('classId', this.currentClassId + '')
      .set('centerId', this.apiContext.centerId + '');

    const configUrl = this.apiContext.host + this.apiTeacher.getTimeTableOfParticularClass;
    this.http.get<Timetable[]>(configUrl, {params: body}).toPromise().then(res => {
        console.log(res);
        this.timetableList = res;
      },
      error => {
        console.log(error);
      });
  }


  getAttendance(ttlIndex: number, timetableId: string) {
    this.attendanceList = [];
    this.selectedTimeTable = this.timetableList[ttlIndex];
    const body = new HttpParams()
      .set('timetableId', timetableId)
      .set('centerId', this.apiContext.centerId + '');

    const configUrl = this.apiContext.host + this.apiTeacher.getAttendanceStudentOfParticularClass;
    this.http.get<Attendance[]>(configUrl, {params: body}).toPromise().then(res => {
        console.log(res);
        this.attendanceList = res;
      },
      error => {
        console.log(error);
      });
  }

  setradio(i: number, b: boolean) {
    console.log(b);
    this.attendanceList[i].IsPresent = b;
  }

  openAttendanceForm(longContent) {
    console.log(this.modalService);
    this.modalService.open(longContent, {size: 'lg'});
  }

  saveAttendance() {
    const param = new Array();
    this.attendanceList.forEach(item => {
      param.push(
        {
          Id: item.Id,
          TimeTableId: item.TimeTableId,
          StudentId: item.StudentId,
          IsPresent: item.IsPresent,
          CenterId: this.apiContext.centerId
        }
      );
    });
    const url = this.apiContext.host + this.apiTeacher.updateAttendanceStudentOfParticularClass;
    this.http.post(url, param).toPromise().then(data => {
        console.log(data);
      },
      error => {
        console.log(error);
      });

  }
}
