import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Program} from '../program';
import {APIContext, APITeacher} from '../APIContext';
import {Class} from '../entity/class';
import {ActivatedRoute} from '@angular/router';
import {Timetable} from '../timetable';
import {Attendance} from '../attendance';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-take-attendance',
  templateUrl: './take-attendance.component.html',
  styleUrls: ['./take-attendance.component.css']
})
export class TakeAttendanceComponent implements OnInit {
  apiContext = new APIContext();
  apiTeacher = new APITeacher();
  currentClassId: string;
  timetableList: Timetable[];
  attendanceList: Attendance[] = [];
  selectedTimeTable: Timetable;

  constructor(private http: HttpClient, private route: ActivatedRoute, private modalService: NgbModal) {
  }

  ngOnInit() {
    this.currentClassId = this.route.snapshot.paramMap.get('cId');
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
    this.attendanceList[i].IsPresent = b;
  }

  openAttendaanceForm(longContent) {
    this.modalService.open(longContent, {scrollable: true, size: 'xl'});
  }
}
