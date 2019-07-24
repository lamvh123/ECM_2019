import { Component, OnInit } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Program } from '../program';
import { Course } from '../course';
import { Class } from '../entity/class';

@Component({
  selector: 'app-auto-generate-timetable',
  templateUrl: './auto-generate-timetable.component.html',
  styleUrls: ['./auto-generate-timetable.component.css', '../css/assets/css/main.css',
    '../css/assets/css/themes/all-themes.css']
})
export class AutoGenerateTimetableComponent implements OnInit {

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }
  centerId;
  listProgram: Program[];
  listCourse: Course[];
  listClass: Class[];
  selectedProgramId = -1;
  selectedCourseId = -1;
  currentPage = 1;
  pageSize = 20;
  totalData = 0;
  listPage;
  empty;
  msg = "";
  ngOnInit() {
    this.loadInitData();
  }

  loadInitData() {
    const url = 'https://educationcentermanagementapi-dev-as.azurewebsites.net/api/TrainingDept/GetCenter';
    this.http.get(url).toPromise().then((data) => {
      this.centerId = data['Id'];
      this.loadProgram();
      this.loadCourse();
      this.loadClass();
    },
      error => {
        console.log(error);
      });
  }

  loadProgram() {
    const url = 'https://educationcentermanagementapi-dev-as.azurewebsites.net/api/TrainingDept/SearchProgram';
    var param = new HttpParams().set("programName", "").set("centerId", this.centerId);
    this.http.get<Program[]>(url, { params: param }).toPromise().then(data => {
      console.log(data);
      this.listProgram = data;
    },
      error => {
        console.log(error);
      })
  }

  loadCourse() {
    const url = 'https://educationcentermanagementapi-dev-as.azurewebsites.net/api/TrainingDept/SearchCourseByProgram';
    var param = new HttpParams().set("centerId", this.centerId)
      .set("programId", this.selectedProgramId == null ? "-1" : this.selectedProgramId + "");
    this.http.get<Course[]>(url, { params: param }).toPromise().then(data => {
      console.log(data);
      this.listCourse = data;
    },
      error => {
        console.log(error);
      })
  }

  reloadCourse() {
    this.selectedCourseId = -1;
    this.loadCourse();
  }

  loadClass() {
    const url = 'https://educationcentermanagementapi-dev-as.azurewebsites.net/api/TrainingDept/SearchClass';
    var param = new HttpParams().set("courseId", this.selectedCourseId == null ? "-1" : this.selectedCourseId + "").set("centerId", this.centerId)
      .set("programId", this.selectedProgramId == null ? "-1" : this.selectedProgramId + "")
      .set("IsCreatedTimeTable", "0").set("pageSize", this.pageSize + "")
      .set("currentPage", this.currentPage + "");
    this.http.get<Class[]>(url, { params: param }).toPromise().then(data => {
      console.log(data);
      this.listClass = data;
      this.unselectAll();
    },
      error => {
        console.log(error);
      });
    this.getTotalClassAndPagi();
  }

  unselectAll() {
    this.listClass.forEach(item => {
      item.selected = false;
    })
  }
  getTotalClassAndPagi() {
    const url = 'https://educationcentermanagementapi-dev-as.azurewebsites.net/api/TrainingDept/SearchClass';
    var param = new HttpParams().set("programId", this.selectedProgramId == null ? "-1" : this.selectedProgramId + "").
      set("courseId", this.selectedCourseId == null ? "-1" : this.selectedCourseId + "").set("centerId", this.centerId)
      .set("IsCreatedTimeTable", "0").set("pageSize", "1000")
      .set("currentPage", "1");
    this.http.get<any[]>(url, { params: param }).toPromise().then(data => {
      console.log(data);
      this.totalData = data.length;
      this.pagination(this.totalData);
    },
      error => {
        console.log(error);
      })
  }

  pagination(totalData: number) {
    if (totalData == 0) {
      this.empty = true;
    }
    else {
      this.empty = false;
    }
    this.listPage = new Array();
    if (totalData % this.pageSize == 0) {
      for (var i = 1; i <= totalData / this.pageSize; i++) {
        this.listPage.push({ value: i, text: 'Page ' + i });
      }
    } else {
      for (var i = 1; i <= Math.floor(totalData / this.pageSize) + 1; i++) {
        this.listPage.push({ value: i, text: 'Page ' + i });
      }
    }
    console.log(this.listPage)
  }

  searchClass() {
    this.currentPage = 1;
    this.loadClass();
  }

  changePageSize() {
    this.currentPage = 1;
    this.loadClass();
  }

  changePage() {
    this.loadClass();
  }

  generateTimetable(){
    var centerId = this.centerId;
    var listSelectedClass:Class[];
    listSelectedClass = this.listClass.filter(item=>item.selected==true);
    var param = new Array();
    listSelectedClass.forEach(item=>{
      param.push({ClassId:item.ClassId,CenterId:centerId})
    })
    const url = "https://educationcentermanagementapi-dev-as.azurewebsites.net/api/TrainingDept/GenerateTimeTable"
    this.http.post(url,param).toPromise().then(data=>{
      console.log(data);
      this.msg= "success"
      this.loadClass();
    },
    error=>{
      console.log(error);
      this.msg="error";
    })
  }

  removeMessage() {
    this.msg = "";
  }

}
