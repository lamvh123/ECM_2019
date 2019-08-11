import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {HttpClient, HttpParams} from '@angular/common/http';
import {APIContext, APITraining} from '../APIContext';
import {element} from '@angular/core/src/render3';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css', '../../assets/css/main.css',
    '../../assets/css/themes/all-themes.css']
})
export class ReportComponent implements OnInit, AfterViewInit {

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, private toastr: ToastrService) {
  }

  apiContext = new APIContext();
  apiTraining = new APITraining();
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabelMoney = 'Biểu đồ số tiền thu được theo program';
  xAxisLabelStudent = 'Biểu đồ số học sinh của mỗi program';
  xAxisLabelCourse = 'Biểu đồ số khóa học của mỗi program';
  showYAxisLabel = true;
  yAxisLabelMoney = 'EarnedMoney';
  yAxisLabelStudent = 'Student';
  yAxisLabelCourse = 'Course';

  centerId;
  colorScheme = {
    domain: ['#3cb44b', '#800000', '#ffe119', '#a9a9a9', '#9A6324', '#808000', '#469990', '#000075', '#e6194B', '#f58231', '#bfef45', '#42d4f4', '#4363d8', '#911eb4', '#f032e6', '#fabebe', '#ffd8b1', '#fffac8', '#aaffc3', '#e6beff']
  };
  totalEarning: any[] = new Array();
  totalCourse: any[] = new Array();
  totalStudent: any[] = new Array();
  totalProgramReport = 0;
  totalCourseReport = 0;
  totalClassReport = 0;
  isLoading = true;

  ngOnInit() {
    this.getInitData();
  }

  ngAfterViewInit(): void {
    this.isLoading = false;
  }

  getInitData() {
    this.isLoading = true;
    var urlGetCenterId = this.apiContext.host + this.apiTraining.getCenter;
    this.http.get(urlGetCenterId).toPromise().then(data => {
      this.centerId = data['Id'];
      this.getStatisticProgram();
      this.getNumberOfClass();
      this.getNumberOfCourse();
      this.getNumberOfProgram();
      this.isLoading = false;
    });
  }

  getNumberOfProgram() {
    this.isLoading = true;
    var url = this.apiContext.host + this.apiTraining.getNumberOfProgram;
    var param = new HttpParams().set('centerId', this.centerId);
    this.http.get<number>(url, {params: param}).toPromise().then(data => {
      console.log(data);
      this.totalProgramReport = data;
      this.isLoading = false;
    });
  }

  getNumberOfCourse() {
    this.isLoading = true;
    var url = this.apiContext.host + this.apiTraining.getNumberOfCourse;
    var param = new HttpParams().set('centerId', this.centerId);
    this.http.get<number>(url, {params: param}).toPromise().then(data => {
      console.log(data);
      this.totalCourseReport = data;
      this.isLoading = false;
    });
  }

  getNumberOfClass() {
    this.isLoading = true;
    var url = this.apiContext.host + this.apiTraining.getNumberOfClass;
    var param = new HttpParams().set('centerId', this.centerId);
    this.http.get<number>(url, {params: param}).toPromise().then(data => {
      console.log(data);
      this.totalClassReport = data;
      this.isLoading = false;
    });
  }

  getStatisticProgram() {
    this.isLoading = true;
    var url = this.apiContext.host + this.apiTraining.getStatisticByProgram;
    var param = new HttpParams().set('centerId', this.centerId);
    this.http.get<any[]>(url, {params: param}).toPromise().then(data => {
        data.forEach((element, index) => {
          console.log(element);
          this.totalEarning.push({'name': element['ProgramName'] + '', 'value': parseInt(element['Earning'] + '')});
          this.totalCourse.push({'name': element['ProgramName'] + '', 'value': parseInt(element['TotalCourse'] + '')});
          this.totalStudent.push({'name': element['ProgramName'] + '', 'value': parseInt(element['TotalStudent'] + '')});

        });
        this.totalStudent = [...this.totalStudent];
        this.totalCourse = [...this.totalCourse];
        this.totalEarning = [...this.totalEarning];
        console.log(this.totalCourse);
        this.isLoading = false;
      },
      error => {
        console.log(error);
        this.isLoading = false;
        this.toastr.warning('Something is missing.', 'Alert!');
      });
  }

  formatPercent(val) {
    var x: number = parseInt(val + '');
    if (x <= 10) {
      return x.toFixed();
    }
  }
}
