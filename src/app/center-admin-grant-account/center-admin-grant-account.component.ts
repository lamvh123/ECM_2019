import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Course } from '../course';
import { AdmissionForm } from '../admission-form';
import { Student } from '../entity/student';
import { ItemsList } from '@ng-select/ng-select/ng-select/items-list';

@Component({
  selector: 'app-center-admin-grant-account',
  templateUrl: './center-admin-grant-account.component.html',
  styleUrls: ['./center-admin-grant-account.component.css'
    , '../../assets/css/main.css'
    , '../../assets/css/themes/all-themes.css']
})
export class CenterAdminGrantAccountComponent implements OnInit {

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
  listPage: any[];
  listPageSize = [5, 10, 20, 50];
  msg = "";
  ngOnInit() {
    this.getInitData();
    console.log("complete")
  }

  getInitData() {
    var url = "https://educationcentermanagementapi-dev-as.azurewebsites.net/api/CenterManagement/GetCenter";
    this.http.get(url).toPromise().then(data => {
      this.centerId = data['Id'];
      var getCourseUrl = "https://educationcentermanagementapi-dev-as.azurewebsites.net/api/CenterManagement/GetAllCourse";
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
    var url = "https://educationcentermanagementapi-dev-as.azurewebsites.net/api/CenterManagement/GetAllAdmissionForm";
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
      var url = "https://educationcentermanagementapi-dev-as.azurewebsites.net/api/CenterManagement/GetAllAdmissionForm";
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

  pagination(totalData: number) {
    this.listPage = new Array();
    if (totalData % this.pageSize == 0) {
      for (var i = 1; i <= totalData / this.pageSize; i++) {
        this.listPage.push({ value: i, text: 'Page ' + i });
      }
    }
    else {
      for (var i = 1; i <= Math.floor(totalData / this.pageSize) + 1; i++) {
        this.listPage.push({ value: i, text: 'Page ' + i });
      }
    }
  }

  UnselectAllItem() {
    this.listStudent.forEach(item => {
      item.selected = false;
    })
  }
  loadStudentData() {
    var paramToGetTotal = new HttpParams().set("admissionFormId", this.selectedFormId == null ? "-1" : this.selectedFormId)
      .set("studentName", this.studentName).set("phoneNumber", this.phoneNumber).set("courseId", this.selectedCourseId == null ? "-1" : this.selectedCourseId)
      .set("centerId", this.centerId);
    var getTotalurl = "https://educationcentermanagementapi-dev-as.azurewebsites.net/api/CenterManagement/GetTotalRegisteredStudent";
    this.http.get<number>(getTotalurl, { params: paramToGetTotal }).toPromise().then(data => {
      this.totalData = data;
      console.log(data);
      if (this.totalData == 0) {
        this.empty = true;
      }
      if (this.totalData != 0) {
        this.pagination(this.totalData);
        this.empty = false;
        var param = new HttpParams().set("admissionFormId", this.selectedFormId == null ? "-1" : this.selectedFormId)
          .set("studentName", this.studentName).set("phoneNumber", this.phoneNumber)
          .set("courseId", this.selectedCourseId == null ? "-1" : this.selectedCourseId)
          .set("centerId", this.centerId)
          .set("pageSize", this.pageSize + "")
          .set("currentPage", this.currentPage + "")
        var url = "https://educationcentermanagementapi-dev-as.azurewebsites.net/api/CenterManagement/SearchRegisteredStudent";
        this.http.get<Student[]>(url, { params: param }).toPromise().then(data => {
          this.listStudent = data;
          console.log(this.listStudent);
          this.UnselectAllItem();
          this.listStudent.forEach(item => {
            if (item.Dob != null && item.Dob != undefined && item.Dob.length >= 10) {
              item.Dob = item.Dob.substr(0, 10);
            }
            if (item.sex == true) {
              item.realSex = "Male"
            }
            else {
              item.realSex = "Female"
            }
          })
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

  changePageSize() {
    this.currentPage = 1;
    this.loadStudentData();
  }
  searchStudent() {
    this.currentPage = 1;
    this.loadStudentData();
  }
  changePage() {
    this.loadStudentData();
  }

  grantAccountForOne(Student:Student){
    var centerId = this.centerId;
    var url = "https://educationcentermanagementapi-dev-as.azurewebsites.net/api/CenterManagement/GrantAccountForStudent";
    var param = new Array().push({RegisteredCandidateId:Student.Id,CenterId:centerId});
    this.http.post(url,param).toPromise().then(data=>{
      console.log(data);
      this.msg = "success"
    },
    error=>{
      console.log(error);
      this.msg = "error"
    })
  }

  grantAccountForMany(){
    var centerId = this.centerId;
    var url = "https://educationcentermanagementapi-dev-as.azurewebsites.net/api/CenterManagement/GrantAccountForStudent";
    var param = new Array();
    var listSelectedStudent = this.listStudent.filter(item=>item.selected==true&&item.IsPayment==true
      &&item.IsGrantedAccount==false);
      listSelectedStudent.forEach(item=>{
        param.push({RegisteredCandidateId:item.Id,CenterId:centerId});
      })
      this.http.post(url,param).toPromise().then(data=>{
        console.log(data);
        this.msg = "success";
        this.loadStudentData();
      },
      error=>{
        console.log(error);
        this.msg = "error"
      })
  }

}
