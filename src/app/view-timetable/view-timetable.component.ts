import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { LearningSession } from '../entity/learning-session';

@Component({
  selector: 'app-view-timetable',
  templateUrl: './view-timetable.component.html',
  styleUrls: ['./view-timetable.component.css']
})
export class ViewTimetableComponent implements OnInit {

  constructor(private _router: Router, private http: HttpClient, private route: ActivatedRoute) { }
  centerId;
  listSession: LearningSession[];
  ngOnInit() {
    this.loadInitData();
  }

  loadInitData(){
    const url = 'https://educationcentermanagementapi-dev-as.azurewebsites.net/api/Student/GetCenter';
    this.http.get(url).toPromise().then((data) => {
        this.centerId = data['Id'];
        this.loadTimetable();
      },
      error => {
        console.log(error);
      });
  }

  loadTimetable(){
    const url = 'https://educationcentermanagementapi-dev-as.azurewebsites.net/api/Student/GetTimeTableOfStudent';
    var param = new HttpParams().set("centerId",this.centerId);
    this.http.get<LearningSession[]>(url,{params:param}).toPromise().then(data=>{
      console.log(data);
      this.listSession = data;
      console.log(this.listSession )
    },
    error=>{
      console.log(error);
    })
  }
}
