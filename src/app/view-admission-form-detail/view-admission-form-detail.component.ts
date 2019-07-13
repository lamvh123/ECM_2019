import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AdmissionForm } from '../admission-form';
import { Building } from '../building';
import { DatePipe } from '@angular/common';
import { Select2OptionData } from 'ng-Select2';
import { NgSelectModule, NgOption } from '@ng-select/ng-select';
import { FormControl, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-view-admission-form-detail',
  templateUrl: './view-admission-form-detail.component.html',
  styleUrls: ['./view-admission-form-detail.component.css', '../css/assets/css/main.css',
    '../css/assets/css/themes/all-themes.css']
})
export class ViewAdmissionFormDetailComponent implements OnInit, AfterViewInit {
  @ViewChild('myselect') myselect;
  formId;
  centerId;
  form: AdmissionForm;
  listBuilding: Observable<Building[]>;
  isClose = "true";
  startDate;
  boolArr:string[] = ['true','false'];
  public selectedBuilding = 0;

  constructor(private _router: Router, private http: HttpClient, private route: ActivatedRoute, private datepipe: DatePipe) { }

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

      const getAllCourseUrl = 'https://educationcentermanagementapi-dev-as.azurewebsites.net/api/AdmissionManagement/GetAdmissionFormById';
      var para = new HttpParams().set('centerId', this.centerId + '').set("admissionFormId", this.formId);
      this.http.get<AdmissionForm>(getAllCourseUrl, { params: para }).toPromise().then(data => {
        this.form = data;
        this.form.StartDate = this.form.StartDate.substr(0, 10);
        this.selectedBuilding = this.form.Building.Id;
        this.isClose = this.form.IsClosed + "";
        console.log(this.form);
        this.getAllBuilding();
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
  getAllBuilding() {
    const url = 'https://educationcentermanagementapi-dev-as.azurewebsites.net/api/AdmissionManagement/GetAllBuilding';
    var para = new HttpParams().set('centerId', this.centerId + '');
    this.http.get<Observable<Building[]>>(url, { params: para }).toPromise().then(data => {
      this.listBuilding = data;
      console.log(this.listBuilding);
    },
      error => {
        console.log(error);
      });
  }

  updateForm() {
    var date = new Date(this.form.StartDate);
    let dateString = this.datepipe.transform(date, 'MM-dd-yyyy');
    var para = new HttpParams().set("AdmissionFormId", this.formId)
      .set("CourseId", this.form.Course.Id + "").set("StartDate", dateString).set("Name", this.form.Name).set("BuildingId", this.selectedBuilding + "")
      .set("IsClosed", this.isClose).set("CenterId", this.centerId).set("GoogleFormLink",this.form.GoogleFormLink);
    const url = "https://educationcentermanagementapi-dev-as.azurewebsites.net/api/AdmissionManagement/UpdateAdmissionForm";
    console.log(para)
    this.http.post<any>(url, para).toPromise().then(data => {

      console.log(data);
    },
      error => {
        console.log(error);
      });
  }
  ngAfterViewInit() {
  }

}
