import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { APIContext, APITraining } from '../APIContext';
import { OfficalStudent } from '../entity/offical-student';

@Component({
  selector: 'app-training-staff-view-student',
  templateUrl: './training-staff-view-student.component.html',
  styleUrls: ['./training-staff-view-student.component.css'
    , '../../assets/plugins/bootstrap/css/bootstrap.min.css'
    , '../../assets/plugins/dropzone/dropzone.css'
    , '../../assets/plugins/bootstrap-material-datetimepicker/css/bootstrap-material-datetimepicker.css'
    , '../../assets/plugins/waitme/waitMe.css'
    , '../../assets/plugins/bootstrap-select/css/bootstrap-select.css'
    , '../../assets/css/main.css'
    , '../../assets/css/themes/all-themes.css']
})
export class TrainingStaffViewStudentComponent implements OnInit {

  constructor(private _router: Router, private http: HttpClient, private route: ActivatedRoute,
    private toastr: ToastrService, private modalService: NgbModal, private datepipe: DatePipe) { }
  centerId;
  pageSize = 20;
  currentPage = 0;
  apiContext = new APIContext();
  apiTraining = new APITraining();
  searchName = '';
  searchEmail = '';
  ListStudent: OfficalStudent[];
  listPage;
  listpagesize = [{ val: 10, label: 10 }, { val: 20, label: 20 }, { val: 50, label: 50 }, { val: 100, label: 100 }]
  ngOnInit() {
    this.initData();
  }

  initData() {
    const urlGetCenterId = this.apiContext.host + this.apiTraining.getCenter;
    this.http.get(urlGetCenterId).toPromise().then(data => {
      this.centerId = data['Id'];
      this.getTotalPage();
      
    });
  }

  loadStudent() {
    const urlGetTotalStudent = this.apiContext.host + "api/TrainingDept/SearchStudent";
    const param = new HttpParams()
      .set('email', this.searchEmail + '')
      .set('name', this.searchName)
      .set("centerId", this.centerId)
      .set("pageSize", this.pageSize + "")
      .set("currentPage", this.currentPage + "");
    this.http.get<OfficalStudent[]>(urlGetTotalStudent, { params: param }).toPromise().then(data => {
      this.ListStudent = data;
      console.log(data);
    })

  }

  searchStudent() {
    this.getTotalPage();
    //this.loadStudent();
  }

  changePage() {
    this.loadStudent();
  }

  changePagesize() {
    this.getTotalPage();
    //this.loadStudent();
  }

  getTotalPage() {
    const url = this.apiContext.host + "api/TrainingDept/GetTotalStudent";
    const param = new HttpParams().set('email', this.searchEmail + '')
      .set('name', this.searchName)
      .set("centerId", this.centerId);
    this.http.get<any>(url, { params: param }).toPromise().then(data => {
      console.log(data);
      if (data != 0) {
        this.currentPage = 1;
        this.listPage = new Array;
        var totalPage = 0;
        if (data % this.pageSize == 0) {
          totalPage = data / this.pageSize;
        }
        else {
         // totalPage = parseInt( (data / this.pageSize).toFixed() )+ 1;
          totalPage= Math.floor(data / this.pageSize)+1
        }
        for (var i = 1; i <= totalPage; i++) {
          this.listPage = [...this.listPage, { label: 'Page ' + i + '/' + totalPage, value: i }]
        }
        this.loadStudent();
      }
    })
  }


}
