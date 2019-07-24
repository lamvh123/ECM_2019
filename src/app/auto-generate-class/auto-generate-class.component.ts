import { Component, OnInit } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../course';
import { AdmissionForm } from '../admission-form';

@Component({
  selector: 'app-auto-generate-class',
  templateUrl: './auto-generate-class.component.html',
  styleUrls: ['./auto-generate-class.component.css', '../css/assets/css/main.css',
    '../css/assets/css/themes/all-themes.css']
})
export class AutoGenerateClassComponent implements OnInit {

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }
  centerId;
  ListOfCourse: Course[];
  ListOfForm: AdmissionForm[];
  selectedCourseId = -1;
  listSelectedFormId:any[];
  msg = "";
  ngOnInit() {
    this.loadInitData();
  }

  loadInitData() {
    const url = 'https://educationcentermanagementapi-dev-as.azurewebsites.net/api/TrainingDept/GetCenter';
    this.http.get(url).toPromise().then((data) => {
      this.centerId = data['Id'];
      this.getAllCourse();
      this.loadForm();
    },
      error => {
        console.log(error);
      });
  }

  getAllCourse() {

    const body = new HttpParams()
      .set('centerId', this.centerId + '');
    const configUrl = 'https://educationcentermanagementapi-dev-as.azurewebsites.net/api/TrainingDept/ViewAllCourse';
    this.http.get<Course[]>(configUrl, { params: body }).toPromise().then(res => {
      this.ListOfCourse = res;
      console.log(this.ListOfCourse);
    },
      error => {
        console.log(error);
      });
  }

  loadForm() {
    const param = new HttpParams().set('courseId', this.selectedCourseId + "")
      .set("centerId", this.centerId + "").set("isClosed", "1")
      .set("isCreatedClass", "0")
      .set("pageSize", "1000").set("currentPage", "1");
    var url = "https://educationcentermanagementapi-dev-as.azurewebsites.net/api/TrainingDept/SearchAdmissionForm";
    this.http.get<AdmissionForm[]>(url, { params: param }).toPromise().then(data => {
      this.ListOfForm = data;
      console.log(this.ListOfForm);
    },
      error => {
        console.log(error);
      })
  }

  GenerateClass() {
    let centerId = this.centerId;
    let url = "https://educationcentermanagementapi-dev-as.azurewebsites.net/api/TrainingDept/GenerateClass";
    let param = new Array();
    this.listSelectedFormId.forEach(item => {
      param.push({ AdmissionFormId: item, CenterId: centerId });
    })
    this.http.post(url, param).toPromise().then(data => {
      console.log(data);
      this.msg = "success";
      this.loadForm();
      this.listSelectedFormId = [];
    },
      error => {
        console.log(error);
        this.msg = "error";
      })
  }

  removeMessage() {
    this.msg = "";
  }

}
