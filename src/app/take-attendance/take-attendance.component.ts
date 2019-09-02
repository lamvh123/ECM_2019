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
import {ToastrService} from 'ngx-toastr';

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
  todayStr: string;
  isTaking: boolean;

  constructor(private modalService: NgbModal, private http: HttpClient, private route: ActivatedRoute, private toastr: ToastrService) {
  }

  ngOnInit() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    this.todayStr = yyyy + '-' + mm + '-' + dd;
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
        this.timetableList.forEach(function(item) {
          const splitted = item.LearningDay.substring(0, 10).split('-', 3);
          console.log(splitted);
          item.displayDay = splitted[2] + '/' + splitted[1] + '/' + splitted[0];
        });
        this.updateStatus(this.timetableList);
        this.isLoading = false;
      },
      error => {
        console.log(error);
        this.isLoading = false;
        this.toastr.error('Something goes wrong. Please try again.', 'Oops!');
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
        this.toastr.error('Something goes wrong. Please try again.', 'Oops!');
      });
  }

  setradio(i: number, b: boolean) {
    if (this.isTaking) {
      console.log(b);
      this.attendanceList[i].IsPresent = b;
    }
  }

  openAttendanceForm(longContent, isTaking: boolean) {
    this.isTaking = isTaking;
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
        this.toastr.success('Take attendance for session ' + this.selectedTimeTable.SessionNumber + ' successfully.', 'Success!');
      },
      error => {
        console.log(error);
        this.isLoading = false;
        this.toastr.error('Something goes wrong. Please try again.', 'Oops!');
      });

  }

  // isPending(dateSession: string): boolean {
  //   const today = Date.parse(this.todayStr);
  //   const sessionDay = Date.parse(dateSession.substring(0, 10));
  //   console.log('today: ' + this.todayStr + ' - sess: ' + dateSession.substring(0, 10) + ' - ' + (today < sessionDay));
  //   if (today < sessionDay) {
  //     return false;
  //   }
  //   return true;
  // }

  private updateStatus(timetableList: Timetable[]) {
    const today = Date.parse(this.todayStr);
    timetableList.forEach(function(item) {
      const sessionDay = Date.parse(item.LearningDay.substring(0, 10));
      // console.log('today: ' + this.todayStr + ' - sess: ' + item.LearningDay.substring(0, 10) + ' - ' + (today < sessionDay));
      if (today < sessionDay) {
        item.status = 1;
      } else if (today > sessionDay) {
        item.status = -1;
      } else {
        item.status = 0;
      }
    });
  }
}
