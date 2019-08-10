import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import {HttpClient, HttpParams} from '@angular/common/http';
import {OfficalStudent} from '../entity/offical-student';
import {APIContext, APITraining} from '../APIContext';
import {Class} from '../entity/class';

@Component({
  selector: 'app-list-student-of-class',
  templateUrl: './list-student-of-class.component.html',
  styleUrls: ['./list-student-of-class.component.css']
})
export class ListStudentOfClassComponent implements OnInit {

  constructor(private _router: Router, private http: HttpClient, private route: ActivatedRoute) {
  }

  apiContext = new APIContext();
  apiTraining = new APITraining();
  ClassId;
  ListStudent: OfficalStudent[];
  currentClass: Class;

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.ClassId = params.get('id');
    });
    this.loadClassInfo();
    this.loadStudent();
  }

  loadStudent() {
    const url = this.apiContext.host + this.apiTraining.getClassById;
    const param = new HttpParams()
      .set('centerId', this.apiContext.centerId + '')
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
    });
  }

  loadClassInfo() {
    const url = this.apiContext.host + this.apiTraining.getDetailClassById;
    const param = new HttpParams()
      .set('centerId', this.apiContext.centerId + '')
      .set('classId', this.ClassId);
    this.http.get<Class>(url, {params: param}).toPromise().then(data => {
      console.log(data);
      this.currentClass = data;
    });
  }

}
