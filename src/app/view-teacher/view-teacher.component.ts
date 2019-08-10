import {AfterContentInit, Component, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Teacher} from '../teacher';
import {APIContext, APITraining} from '../APIContext';
import {Router} from '@angular/router';

@Component({
  selector: 'app-view-teacher',
  templateUrl: './view-teacher.component.html',
  styleUrls: ['./view-teacher.component.css'
    , '../../assets/plugins/bootstrap/css/bootstrap.min.css'
    , '../../assets/css/main.css'
    , '../../assets/css/themes/all-themes.css']
})
export class ViewTeacherComponent implements OnInit, AfterContentInit {
  isLoading = true;
  apiContext = new APIContext();
  apiTraining = new APITraining();
  teacherList: Teacher[];

  teacherName = '';
  teacherEmail = '';

  constructor(private http: HttpClient, private router: Router) {
  }

  ngOnInit() {
    this.getTeachers();
  }

  ngAfterContentInit(): void {
    this.isLoading = false;
  }

  getTeachers() {
    this.isLoading = true;
    const body = new HttpParams()
      .set('teacherName', this.teacherName)
      .set('teacherEmail', this.teacherEmail)
      .set('subjectId', '-1')
      .set('centerId', this.apiContext.centerId + '')
      .set('currentPage', '1')
      .set('pageSize', '1000');

    const configUrl = this.apiContext.host + this.apiTraining.searchTeacher;
    this.http.get<Teacher[]>(configUrl, {params: body}).toPromise().then(res => {
        console.log(res);
        this.teacherList = res;
        console.log(this.teacherList);
        this.isLoading = false;
      },
      error => {
        console.log(error);
        this.isLoading = false;
      });
  }

  getSubjects(index: number) {
    let subjects = '';
    this.teacherList[index].Subjects.forEach(function(subModel) {
      subjects += subModel.Name + ',';
    });
    return subjects;
  }
}
