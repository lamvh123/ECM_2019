import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AdmissionForm } from '../admission-form';
import { Building } from '../building';
import { DatePipe } from '@angular/common';
import { Select2OptionData } from 'ng-Select2';

@Component({
  selector: 'app-view-admission-form-detail',
  templateUrl: './view-admission-form-detail.component.html',
  styleUrls: ['./view-admission-form-detail.component.css', '../css/assets/css/main.css',
  '../css/assets/css/themes/all-themes.css']
})
export class ViewAdmissionFormDetailComponent implements OnInit,AfterViewInit {
  formId;
  centerId;
  form:AdmissionForm;
  listBuilding:Building[];
  buildingId = "-1";
  isClose = "true";
  listBuildingOptions: Array<Select2OptionData>;
  startDate;
  public exampleData;
  constructor(private _router: Router, private http: HttpClient, private route: ActivatedRoute,private datepipe:DatePipe) { }

  ngOnInit() {
    
    this.listBuildingOptions = new Array<Select2OptionData>();
    this.formId = this.route.snapshot.paramMap.get('id');
    this.form = new AdmissionForm();
    this.getInitData();
  }
  getInitData() {
    const url = 'https://educationcentermanagementapi-dev-as.azurewebsites.net/api/AdmissionManagement/GetCenter';
    this.http.get(url).toPromise().then((data) => {
      console.log(data['Id']);
      this.centerId = data['Id'];
      this.getAllBuilding();
      const getAllCourseUrl = 'https://educationcentermanagementapi-dev-as.azurewebsites.net/api/AdmissionManagement/GetAdmissionFormById';
      var para = new HttpParams().set('centerId', this.centerId + '').set("admissionFormId",this.formId);
      this.http.get<AdmissionForm>(getAllCourseUrl, { params: para }).toPromise().then(data => {
        this.form = data;
        this.form.StartDate = this.form.StartDate.substr(0,10);
        this.buildingId = this.form.Building.Id+"";
        this.isClose = this.form.IsClosed+"";
        console.log(this.form);
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
  getAllBuilding(){
    const url = 'https://educationcentermanagementapi-dev-as.azurewebsites.net/api/AdmissionManagement/GetAllBuilding';
    var para = new HttpParams().set('centerId', this.centerId + '');
    this.http.get<Building[]>(url, { params: para }).toPromise().then(data => {
      this.listBuilding = data;
      console.log(this.listBuilding);
      for(var i=0;i<this.listBuilding.length;i++){
        
        var option:Select2OptionData =   { id: this.listBuilding[i].Id+"", text: this.listBuilding[i].Id+"" };
        this.listBuildingOptions.push(option);
        this.exampleData = [
          {
            id: 'basic1',
            text: 'Basic 1'
          },
          {
            id: 'basic2',
            text: 'Basic 2'
          },
          {
            id: 'basic3',
            text: 'Basic 3'
          },
          {
            id: 'basic4',
            text: 'Basic 4'
          }
        ];
      }
      console.log(this.listBuildingOptions);
    },
    error=>{
      console.log(error);
    });
  }
  selectedValueChanged(value: any) {
    this.buildingId = value;
    console.log(value);
  }
  updateForm(){
    var date = new Date(this.form.StartDate);
    let dateString =this.datepipe.transform(date, 'MM-dd-yyyy');
    var para = new HttpParams().set("AdmissionFormId",this.formId)
    .set("CourseId",this.form.Course.Id+"").set("StartDate",dateString).set("Name",this.form.Name).set("BuildingId",this.buildingId)
    .set("IsClosed",this.isClose).set("CenterId",this.centerId);
    const url = "https://educationcentermanagementapi-dev-as.azurewebsites.net/api/AdmissionManagement/UpdateAdmissionForm";
    console.log(para)
    this.http.post<any>(url, para ).toPromise().then(data => {
      
      console.log(data);
    },
    error=>{
      console.log(error);
    });
  }
  ngAfterViewInit() {

   // this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js');
   //   this.loadScript('https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js');
   //    this.loadScript('https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.10/dist/js/bootstrap-select.min.js');

 }

}
