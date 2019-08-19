import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {HttpClient, HttpParams} from '@angular/common/http';
import {APIContext, APITraining} from '../APIContext';
import {element} from '@angular/core/src/render3';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-weekly-report',
  templateUrl: './weekly-report.component.html',
  styleUrls: ['./weekly-report.component.css']
})
export class WeeklyReportComponent implements OnInit {

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, private toastr: ToastrService) { }
  isLoading = true;
  apiContext = new APIContext();
  apiTraining = new APITraining();
  centerId;
  months = [{Id:1,Name:1}];
  years : any[];
  selectedYear = 2019;
  selectedMonth = 8;
  graphArr : any[];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabelMoney = 'Biểu đồ số tiền thu được';
  showYAxisLabel = true;
  yAxisLabelMoney = 'EarnedMoney';
  colorScheme = {
    domain: ['#3cb44b', '#800000', '#ffe119', '#a9a9a9', '#9A6324', '#808000', '#469990', '#000075', '#e6194B', '#f58231', '#bfef45', '#42d4f4', '#4363d8', '#911eb4', '#f032e6', '#fabebe', '#ffd8b1', '#fffac8', '#aaffc3', '#e6beff']
  };
  ngOnInit() {
    this.getInitData();
    this.years = new Array();
    this.months = new Array();
    for(var i = 2017;i<=new Date().getFullYear();i++){
      this.years.push({Id:i,Name:i})
    }
    for(var i=1;i<=12;i++){
       this.months.push({Id:i,Name:i})
    }
  }

  getInitData(){
    this.isLoading = true;
    var urlGetCenterId = this.apiContext.host + this.apiTraining.getCenter;
    this.http.get(urlGetCenterId).toPromise().then(data => {
      this.centerId = data['Id'];
      this.loadData();
      this.isLoading = false;
    },error=>{
      console.log(error);
    });
  }

  loadData(){
    var url = this.apiContext.host + "api/TrainingDept/statistic/StatisticEarningByDay";
    var param = new HttpParams().set('centerId',this.centerId);
    this.http.get<any[]>(url,{params:param}).toPromise().then(data=>{
      console.log(data);
      var arr = new Array();
      data.forEach(ele=>{
        var splitted = ele.Day.split("/", 3); 
        if(splitted[0]==this.selectedMonth&&splitted[2]==this.selectedYear){
           arr.push({name:ele.Day,value:ele.Money});
           arr = [...arr]
        }
      });
      arr = [...arr];
      this.graphArr = arr;
      console.log(this.graphArr);
    },
    error=>{
      console.log(error);
    })
  }



}
