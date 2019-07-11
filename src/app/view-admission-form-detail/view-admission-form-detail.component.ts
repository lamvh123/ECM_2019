import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AdmissionForm } from '../admission-form';
import { Building } from '../building';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-view-admission-form-detail',
  templateUrl: './view-admission-form-detail.component.html',
  styleUrls: ['./view-admission-form-detail.component.css', '../css/assets/css/main.css',
  '../css/assets/css/themes/all-themes.css']
})
export class ViewAdmissionFormDetailComponent implements OnInit {
  formId;
  centerId;
  form:AdmissionForm;
  listBuilding:Building[];
  buildingId = "-1";
  startDate;
  constructor(private _router: Router, private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit() {
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
    var para = new HttpParams().set("AdmissionFormId",this.formId)
    .set("CourseId","")
    const url = "https://educationcentermanagementapi-dev-as.azurewebsites.net/api/AdmissionManagement/UpdateAdmissionForm";
    this.http.post<Building[]>(url, para ).toPromise().then(data => {
      this.listBuilding = data;
      console.log(this.listBuilding);
    },
    error=>{
      console.log(error);
    });
  }

}
