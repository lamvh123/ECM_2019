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
  centerId: number;

  currentClassId: string;
  timetableList: Timetable[];
  attendanceList: Attendance[] = [];
  selectedTimeTable: Timetable;
  isLoading = true;

  constructor(private modalService: NgbModal, private http: HttpClient, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.currentClassId = this.route.snapshot.paramMap.get('cId');
    const urlGetCenterId = this.apiContext.host + this.apiTeacher.getCenter;
    this.http.get(urlGetCenterId).toPromise().then(data => {
      this.centerId = data['Id'];
      this.getTimeTable();
    });
  }

  ngAfterViewInit(): void {
    this.isLoading = false;
  }


  getTimeTable() {
    this.isLoading = true;
    const body = new HttpParams()
      .set('classId', this.currentClassId + '')
      .set('centerId', this.centerId + '');

    const configUrl = this.apiContext.host + this.apiTeacher.getTimeTableOfParticularClass;
    this.http.get<Timetable[]>(configUrl, {params: body}).toPromise().then(res => {
        console.log(res);
        this.timetableList = res;
        this.isLoading = false;
      },
      error => {
        console.log(error);
        this.isLoading = false;
      });
  }


  getAttendance(ttlIndex: number, timetableId: string) {
    this.isLoading = true;
    this.attendanceList = [];
    this.selectedTimeTable = this.timetableList[ttlIndex];
    const body = new HttpParams()
      .set('timetableId', timetableId)
      .set('centerId', this.centerId + '');

    const configUrl = this.apiContext.host + this.apiTeacher.getAttendanceStudentOfParticularClass;
    this.http.get<Attendance[]>(configUrl, {params: body}).toPromise().then(res => {
        console.log(res);
        this.attendanceList = res;
        this.isLoading = false;
      },
      error => {
        console.log(error);
        this.isLoading = false;
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
    this.isLoading = true;
    const param = new Array();
    this.attendanceList.forEach(item => {
      param.push(
        {
          Id: item.Id,
          TimeTableId: item.TimeTableId,
          StudentId: item.StudentId,
          IsPresent: item.IsPresent,
          CenterId: this.centerId
        }
      );
    });
    const url = this.apiContext.host + this.apiTeacher.updateAttendanceStudentOfParticularClass;
    this.http.post(url, param).toPromise().then(data => {
        console.log(data);
        this.getTimeTable();
        this.isLoading = false;
      },
      error => {
        console.log(error);
        this.isLoading = false;
      });

  }
}
