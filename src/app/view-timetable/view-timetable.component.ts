import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpParams} from '@angular/common/http';
import {LearningSession, TotalTimetable} from '../entity/learning-session';
import {APIContext, APIStudent} from '../APIContext';
import {Class} from '../entity/class';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-view-timetable',
  templateUrl: './view-timetable.component.html',
  styleUrls: ['./view-timetable.component.css']
})
export class ViewTimetableComponent implements OnInit, AfterViewInit {

  constructor(private _router: Router, private http: HttpClient, private route: ActivatedRoute, private toastr: ToastrService) {
  }

  apiContext = new APIContext();
  apiStudent = new APIStudent();
  centerId: number;
  listSession: LearningSession[];
  totalTimetable: TotalTimetable;
  listClass: Class[];
  selectedClass;
  isLoading = true;

  ngOnInit() {
    this.isLoading = true;
    const urlGetCenterId = this.apiContext.host + this.apiStudent.getCenter;
    this.http.get(urlGetCenterId).toPromise().then(data => {
      this.centerId = data['Id'];
      this.loadInitData();
      this.isLoading = false;
    });
  }

  ngAfterViewInit(): void {
    this.isLoading = false;
  }

  loadInitData() {
    this.selectedClass = this.route.snapshot.paramMap.get('id');
    // this.loadTimetable();
    this.getTimeTableAndAttendanceOfParticularClass();
  }

  loadClassList() {
    this.isLoading = true;
    const url = this.apiContext.host + this.apiStudent.getClassList;
    const param = new HttpParams().set('centerId', this.centerId + '');
    this.http.get<Class[]>(url, {params: param}).toPromise().then(data => {
        this.listClass = data;
        console.log(this.listClass);
        if (this.listClass.length > 0) {
          this.selectedClass = this.listClass[0].Id;
          console.log(this.selectedClass);
          this.loadTimetable();
        }
        this.isLoading = false;
      },
      error => {
        console.log(error);
        this.isLoading = false;
        this.toastr.info('Something is not working right. Please try again soon.');
      });
  }

  loadTimetable() {
    this.isLoading = true;
    const url = this.apiContext.host + this.apiStudent.getTimeTableOfParticularClass;
    const param = new HttpParams().set('centerId', this.centerId + '').set('classId', this.selectedClass);
    this.http.get<LearningSession[]>(url, {params: param}).toPromise().then(data => {
        console.log(data);
        this.listSession = data;
        console.log(this.listSession);
        this.isLoading = false;
      },
      error => {
        console.log(error);
        this.isLoading = false;
        this.toastr.info('Something is not working right. Please try again soon.');
      });
  }

  getTimeTableAndAttendanceOfParticularClass() {
    this.isLoading = true;
    const url = this.apiContext.host + this.apiStudent.getTimeTableAndAttendanceOfParticularClass;
    const param = new HttpParams().set('centerId', this.centerId + '').set('classId', this.selectedClass);
    this.http.get<TotalTimetable>(url, {params: param}).toPromise().then(data => {
        console.log(data);
        this.totalTimetable = data;
        if (this.totalTimetable != null) {
          if (this.totalTimetable.NextTimetable != null && this.totalTimetable.NextTimetable.LearningDay != null) {
            const splitted = this.totalTimetable.NextTimetable.LearningDay.substring(0, 10).split('-', 3);
            console.log(splitted);
            this.totalTimetable.NextTimetable.displayDate = splitted[2] + '/' + splitted[1] + '/' + splitted[0];
          }

          if (this.totalTimetable.LearntTimetableList != null && this.totalTimetable.LearntTimetableList.length > 0) {
            this.totalTimetable.LearntTimetableList.forEach(function(item) {
              const splitted2 = item.LearningDay.substring(0, 10).split('-', 3);
              console.log(splitted2);
              item.displayDate = splitted2[2] + '/' + splitted2[1] + '/' + splitted2[0];
            });
          }

          if (this.totalTimetable.PendingTimetableList != null && this.totalTimetable.PendingTimetableList.length > 0) {
            this.totalTimetable.PendingTimetableList.forEach(function(item) {
              const splitted3 = item.LearningDay.substring(0, 10).split('-', 3);
              console.log(splitted3);
              item.displayDate = splitted3[2] + '/' + splitted3[1] + '/' + splitted3[0];
            });
          }
        }
        this.isLoading = false;
      },
      error => {
        console.log(error);
        this.isLoading = false;
        this.toastr.info('Something is not working right. Please try again soon.');
      });
  }

}
