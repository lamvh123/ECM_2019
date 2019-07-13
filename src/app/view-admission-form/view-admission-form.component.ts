import { Component, OnInit } from '@angular/core';
import { Center } from '../center';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Course } from '../course';
import { async } from '@angular/core/testing';
import { AdmissionForm } from '../admission-form';

@Component({
  selector: 'app-view-admission-form',
  templateUrl: './view-admission-form.component.html',
  styleUrls: ['./view-admission-form.component.css', '../../assets/css/main.css',
    '../../assets/css/themes/all-themes.css']
})
export class ViewAdmissionFormComponent implements OnInit {
  center:Center;
  listCourse: Course[];
  courseId ;
  isClosed = -1;
  listForm: AdmissionForm[];
  isClose;
  startDate;
  boolArr:string[] = ['true','false'];
  constructor(private http: HttpClient, private router: Router) { }

   ngOnInit() {
     this.center = new Center();
     this.getInitData();
  }
  getInitData() {
    const url = 'https://educationcentermanagementapi-dev-as.azurewebsites.net/api/AdmissionManagement/GetCenter';
    this.http.get(url).toPromise().then((data) => {
      this.center.Id = data['Id'];
      const getAllCourseUrl = 'https://educationcentermanagementapi-dev-as.azurewebsites.net/api/AdmissionManagement/GetAllCourse';
      var para = new HttpParams().set('centerId', this.center.Id + '');
      this.http.get<Course[]>(getAllCourseUrl, { params: para }).toPromise().then(data => {
        this.listCourse = data;
        console.log(this.listCourse);
        this.getAdmissionForm();
      },
        error => {
          console.log(error);
        }
      )
    },
      error => {
        console.log(error);
      });
  }
  getAdmissionForm() {
    if(this.isClose==null){
      this.isClosed = -1;
    }
    else{
      if(this.isClose=='false'){
        this.isClosed = 0;
      }
      else if(this.isClose=='true'){
        this.isClosed = 1;
      }
    }
    var parameters = new HttpParams().set('courseId', this.courseId==null?'-1' : this.courseId+'').set('centerId', this.center.Id + '')
      .set('isClosed', this.isClosed + '');
    const url = 'https://educationcentermanagementapi-dev-as.azurewebsites.net/api/AdmissionManagement/SearchAdmissionForm';
    this.http.get<AdmissionForm[]>(url, { params: parameters }).toPromise().then((data) => {
      console.log(data);
      this.listForm = data;
    },
      error => {
        console.log(error);
      }
    )
  }
  navigateToAdmissionFormDetail(form){
    this.router.navigate(['/Admission-staff/form-detail', form.Id]);
  }
}
