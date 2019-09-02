import { Component, OnInit } from '@angular/core';
import { APIContext, APITraining } from '../APIContext';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { OfficalStudent } from '../entity/offical-student';
import { SchedulePerDay } from '../schedule-per-day';

@Component({
  selector: 'app-training-staff-view-student-detail',
  templateUrl: './training-staff-view-student-detail.component.html',
  styleUrls: ['./training-staff-view-student-detail.component.css']
})
export class TrainingStaffViewStudentDetailComponent implements OnInit {

  constructor(private _router: Router, private http: HttpClient, private route: ActivatedRoute,
    private toastr: ToastrService, private modalService: NgbModal, private datepipe: DatePipe) { }
  apiContext = new APIContext();
  apiTraining = new APITraining();
  studentId;
  studentData : OfficalStudent;
  Classes;
  schedule : SchedulePerDay[]
  ngOnInit() {
    this.studentId = this.route.snapshot.paramMap.get('id');
    this.studentData = new OfficalStudent()
    this.initData();
  }
  centerId;
  selectedClass;
  initData(){
    const urlGetCenterId = this.apiContext.host + this.apiTraining.getCenter;
    this.http.get(urlGetCenterId).toPromise().then(data => {
      this.centerId = data['Id'];
      this.loadAllClass();
    });
  }

  loadAllClass(){
    const url = this.apiContext.host  + "api/TrainingDept/GetDetailOfParticularStudent"
    const param = new HttpParams().set('userId', this.studentId)
    .set('centerId', this.centerId);
    this.http.get<OfficalStudent>(url,{params:param}).toPromise().then(data=>{
      this.studentData = data;
      if(this.studentData.Classes!=null&&this.studentData.Classes.length>0){
        this.selectedClass = this.studentData.Classes[0].Id;
        this.loadTimetable();
      }
    },
    error=>console.log(error))
  }

  loadTimetable(){
    const url = this.apiContext.host  + "api/TrainingDept/GetTimeTableAndAttendanceOfParticularStudentInParticularClass"
    const param = new HttpParams().set('userId', this.studentId)
    .set('centerId', this.centerId)
    .set('classId',this.selectedClass);
    this.http.get<SchedulePerDay[]>(url,{params:param}).toPromise().then(data=>{
      this.schedule = data;
     
    },
    error=>console.log(error))
  }

}
