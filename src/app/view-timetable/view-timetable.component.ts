import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpParams} from '@angular/common/http';
import {LearningSession} from '../entity/learning-session';
import {APIContext, APIStudent} from '../APIContext';
import {Class} from '../entity/class';

@Component({
  selector: 'app-view-timetable',
  templateUrl: './view-timetable.component.html',
  styleUrls: ['./view-timetable.component.css']
})
export class ViewTimetableComponent implements OnInit {

  constructor(private _router: Router, private http: HttpClient, private route: ActivatedRoute) {
  }

  apiContext = new APIContext();
  apiStudent = new APIStudent();
  listSession: LearningSession[];
  centerId;
  listClass: Class[];
  selectedClass;

  ngOnInit() {
    this.loadInitData();
  }

  loadInitData() {
    this.selectedClass = this.route.snapshot.paramMap.get('id');
    this.loadTimetable();
    // const getCenterUrl = this.apiContext.host+ this.apiStudent.getCenter;
    // this.http.get(getCenterUrl).toPromise().then(data=>{
    //   this.centerId = data['Id'];
    //   this.loadClassList();
    // });
  }

  loadClassList() {
    const url = this.apiContext.host + this.apiStudent.getClassList;
    const param = new HttpParams().set('centerId', this.centerId);
    this.http.get<Class[]>(url, {params: param}).toPromise().then(data => {
        this.listClass = data;
        console.log(this.listClass);
        if (this.listClass.length > 0) {
          this.selectedClass = this.listClass[0].Id;
          console.log(this.selectedClass);
          this.loadTimetable();
        }
      },
      error => {
        console.log(error);
      });
  }

  loadTimetable() {
    const url = this.apiContext.host + this.apiStudent.getTimeTableOfStudent;
    const param = new HttpParams().set('centerId', this.apiContext.centerId + '').set('classId', this.selectedClass);
    this.http.get<LearningSession[]>(url, {params: param}).toPromise().then(data => {
        console.log(data);
        this.listSession = data;
        console.log(this.listSession);
      },
      error => {
        console.log(error);
      });
  }

}
