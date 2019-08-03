import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpParams} from '@angular/common/http';
import {LearningSession} from '../entity/learning-session';
import {APIContext, APIStudent} from '../APIContext';

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

  ngOnInit() {
    this.loadTimetable();
  }

  loadTimetable() {
    const url = this.apiContext.host + this.apiStudent.getTimeTableOfStudent;
    const param = new HttpParams().set('centerId', this.apiContext.centerId + '');
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
