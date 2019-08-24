import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import {HttpClient, HttpParams} from '@angular/common/http';
import {OfficalStudent} from '../entity/offical-student';
import {APIContext, APITraining} from '../APIContext';
import {Class} from '../entity/class';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-list-student-of-class',
  templateUrl: './list-student-of-class.component.html',
  styleUrls: ['./list-student-of-class.component.css'
    , '../../assets/plugins/bootstrap/css/bootstrap.min.css'
    , '../../assets/css/main.css'
    , '../../assets/css/themes/all-themes.css']
})
export class ListStudentOfClassComponent implements OnInit, AfterViewInit {

  constructor(private _router: Router, private http: HttpClient, private route: ActivatedRoute, private toastr: ToastrService) {
  }

  apiContext = new APIContext();
  apiTraining = new APITraining();
  centerId: number;

  ClassId;
  ListStudent: OfficalStudent[];
  currentClass: Class;
  isLoading = true;

  ngOnInit() {
    this.ClassId = this.route.snapshot.paramMap.get('cId');
    const urlGetCenterId = this.apiContext.host + this.apiTraining.getCenter;
    this.http.get(urlGetCenterId).toPromise().then(data => {
      this.centerId = data['Id'];
      this.loadClassInfo();
      this.loadStudent();
    });
  }

  ngAfterViewInit(): void {
    this.isLoading = false;
  }

  loadStudent() {
    this.isLoading = true;
    const url = this.apiContext.host + this.apiTraining.getClassById;
    const param = new HttpParams()
      .set('centerId', this.centerId + '')
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
        this.isLoading = false;
      },
      error => {
        console.log(error);
        this.isLoading = false;
        this.toastr.info('Something is not working right. Please try again soon.');
        // this.showMessage(false);
      });
  }

  loadClassInfo() {
    this.isLoading = true;
    const url = this.apiContext.host + this.apiTraining.getDetailClassById;
    const param = new HttpParams()
      .set('centerId', this.centerId + '')
      .set('classId', this.ClassId);
    this.http.get<Class>(url, {params: param}).toPromise().then(data => {
        console.log(data);
        this.currentClass = data;
        this.isLoading = false;
      },
      error => {
        console.log(error);
        this.isLoading = false;
        this.toastr.info('Something is not working right. Please try again soon.');
        // this.showMessage(false);
      });
  }

}
