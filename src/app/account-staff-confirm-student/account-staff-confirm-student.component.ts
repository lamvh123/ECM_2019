import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Course } from '../course';
import { AdmissionForm } from '../admission-form';
import { Student } from '../entity/student';

@Component({
  selector: 'app-account-staff-confirm-student',
  templateUrl: './account-staff-confirm-student.component.html',
  styleUrls: ['./account-staff-confirm-student.component.css'
    , '../../assets/css/main.css'
    , '../../assets/css/themes/all-themes.css']
})
export class AccountStaffConfirmStudentComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient) { }
  centerId;
  listCourse: Course[];
  listForm: AdmissionForm[];
  selectedCourseId;
  selectedFormId;
  studentName = "";
  phoneNumber = "";
  pageSize = 20;
  currentPage = 1;
  listStudent: Student[];
  totalData = 0;
  empty = true;
  listPage:any[];
  ngOnInit() {
    this.getInitData();
  }

  getInitData() {
    var url = "https://educationcentermanagementapi-dev-as.azurewebsites.net/api/AccoungtingDept/GetCenter";
    this.http.get(url).toPromise().then(data => {
      this.centerId = data['Id'];
      var getCourseUrl = "https://educationcentermanagementapi-dev-as.azurewebsites.net/api/AccoungtingDept/GetAllCourse";
      var param = new HttpParams().set("centerId", this.centerId)
      this.http.get<Course[]>(getCourseUrl, { params: param }).toPromise().then(data => {
        console.log(data);
        this.listCourse = data;
        this.getAllForm();
      },
        error => {
          console.log(error);
        });
      this.loadStudentData();
    },
      error => {
        console.log(error);
      })
  }

  getAllForm() {
    var param = new HttpParams().set("centerId", this.centerId);
    var url = "https://educationcentermanagementapi-dev-as.azurewebsites.net/api/AccoungtingDept/GetAllAdmissionForm";
    this.http.get<AdmissionForm[]>(url, { params: param }).toPromise().then(data => {
      this.listForm = data;
      console.log(data)
    },
      error => {
        console.log(error);
      });
  }

  ReLoadForm() {
    this.selectedFormId = null;
    if (this.selectedCourseId != null && this.selectedCourseId != undefined) {
      var param = new HttpParams().set("courseId", this.selectedCourseId).set("centerId", this.centerId);
      var url = "https://educationcentermanagementapi-dev-as.azurewebsites.net/api/AccoungtingDept/GetAllAdmissionForm";
      this.http.get<AdmissionForm[]>(url, { params: param }).toPromise().then(data => {
        this.listForm = data;
        console.log(data)
      },
        error => {
          console.log(error);
        })
    }
    else {
      this.getAllForm();
    }
  }

  pagination(totalData:number){
    this.listPage = new Array();
    if(totalData%this.pageSize==0){
      for(var i = 1;i<=totalData/this.pageSize;i++){
        this.listPage.push({value:i,text:'Page '+i+'/'+totalData/this.pageSize});
      }
    }
    else{
      for(var i = 1;i<=Math.floor(totalData/this.pageSize)+1;i++){
        this.listPage.push({value:i,text:'Page '+i+'/'+Math.floor(totalData/this.pageSize)+1});
      }
    }
  }

  loadStudentData() {
    var paramToGetTotal = new HttpParams().set("admissionFormId", this.selectedFormId == null ? "-1" : this.selectedFormId)
      .set("studentName", this.studentName).set("phoneNumber", this.phoneNumber).set("courseId",this.selectedCourseId==null?"-1":this.selectedCourseId)
      .set("centerId", this.centerId);
    var getTotalurl = "https://educationcentermanagementapi-dev-as.azurewebsites.net/api/AccoungtingDept/GetTotalRegisteredStudent";
    this.http.get<number>(getTotalurl, { params: paramToGetTotal }).toPromise().then(data => {
      this.totalData = data;
      console.log(data);
      if(this.totalData == 0){
        this.empty = true;
      }
      if (this.totalData != 0) {
        this.pagination(this.totalData);
        this.empty = false;
        var param = new HttpParams().set("admissionFormId", this.selectedFormId == null ? "-1" : this.selectedFormId)
          .set("studentName", this.studentName).set("phoneNumber", this.phoneNumber)
          .set("courseId",this.selectedCourseId==null?"-1":this.selectedCourseId)
          .set("centerId", this.centerId)
          .set("pageSize", this.pageSize + "")
          .set("currentPage", this.currentPage + "")
        var url = "https://educationcentermanagementapi-dev-as.azurewebsites.net/api/AccoungtingDept/SearchRegisteredStudent";
        this.http.get<Student[]>(url, { params: param }).toPromise().then(data => {
          this.listStudent = data;
          console.log(this.listStudent);
        },
          error => {
            console.log(error);
          })
      }
    },
      error => {
        console.log(error);
      })

  }

}
