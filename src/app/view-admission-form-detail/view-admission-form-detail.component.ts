import {Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {HttpClient, HttpParams} from '@angular/common/http';
import {AdmissionForm} from '../admission-form';
import {Building} from '../building';
import {DatePipe} from '@angular/common';
import {Select2OptionData} from 'ng-Select2';
import {NgSelectModule, NgOption} from '@ng-select/ng-select';
import {FormControl, FormGroup, ReactiveFormsModule, FormsModule} from '@angular/forms';
import {Observable} from 'rxjs';
import {Slot} from '../slot';
import {forEach} from '@angular/router/src/utils/collection';
import {APIContext} from '../APIContext';

@Component({
  selector: 'app-view-admission-form-detail',
  templateUrl: './view-admission-form-detail.component.html',
  styleUrls: ['./view-admission-form-detail.component.css', '../css/assets/css/main.css',
    '../css/assets/css/themes/all-themes.css']
})
export class ViewAdmissionFormDetailComponent implements OnInit, AfterViewInit {
  @ViewChild('myselect') myselect;
  apiContext = new APIContext();
  formId;
  form: AdmissionForm;
  listBuilding: Observable<Building[]>;
  listOfSlot: Slot[];
  isClose = 'true';
  startDate;
  selectedSlot;
  boolArr: string[] = ['true', 'false'];
  selectedDayArr;
  dayArr: any[] = [{dayNumber: 1, dayString: 'Monday'}, {dayNumber: 2, dayString: 'Tuesday'},
    {dayNumber: 3, dayString: 'Wednesday'}, {dayNumber: 4, dayString: 'Thursday'},
    {dayNumber: 5, dayString: 'Friday'}, {dayNumber: 6, dayString: 'Saturday'}, {dayNumber: 0, dayString: 'Sunday'}];
  public selectedBuilding = 0;

  constructor(private _router: Router, private http: HttpClient, private route: ActivatedRoute, private datepipe: DatePipe) {
  }

  ngOnInit() {

    this.formId = this.route.snapshot.paramMap.get('id');
    this.form = new AdmissionForm();
    this.getInitData();
  }

  addSelectedDay(item) {
    this.selectedDayArr.push(item.dayNumber);
    this.dayArr = this.dayArr.filter(obj => obj.dayNumber != item.dayNumber);
  }

  getInitData() {
    const getAllCourseUrl = this.apiContext.host + 'api/AdmissionManagement/GetAdmissionFormById';
    var para = new HttpParams()
      .set('centerId', this.apiContext.centerId + '')
      .set('admissionFormId', this.formId);
    this.http.get<AdmissionForm>(getAllCourseUrl, {params: para}).toPromise().then(data => {
        this.form = data;
        this.form.StartDate = this.form.StartDate.substr(0, 10);
        this.selectedBuilding = this.form.Building.Id;
        this.isClose = this.form.IsClosed + '';
        if (data['Slot'] != null && data['Slot'] != undefined) {
          this.selectedSlot = data['Slot'].ID;
        }

        if (data['Weeks'] != null && data['Weeks'] != undefined) {
          var dayarr = Object.keys(data['Weeks']).map(i => data['Weeks'][i]);
          var arr = new Array<number>();
          console.log(dayarr);
          dayarr.forEach(function(item: any) {
            arr.push(item.DayOfWeek);
          });
          this.selectedDayArr = arr;
        }
        console.log(this.form);
        this.getAllBuilding();
      },
      error => {
        console.log(error);
      }
    );
    this.getAllSlot();
  }

  getAllBuilding() {
    const url = this.apiContext.host + 'api/AdmissionManagement/GetAllBuilding';
    var para = new HttpParams().set('centerId', this.apiContext.centerId + '');
    this.http.get<Observable<Building[]>>(url, {params: para}).toPromise().then(data => {
        this.listBuilding = data;
        console.log(this.listBuilding);
      },
      error => {
        console.log(error);
      });
  }

  getAllSlot() {
    const url = this.apiContext.host + 'api/AdmissionManagement/GetAllSlot';
    const para = new HttpParams().set('centerId', this.apiContext.centerId + '');
    this.http.get<Slot[]>(url, {params: para}).toPromise().then(data => {
        this.listOfSlot = data;
        this.listOfSlot.forEach(function(item) {
          item.displayText = item.Name + ': ' + item.From + '-' + item.To;
        });
        console.log(this.listOfSlot);
      },
      error => {
        console.log(error);
      });
  }

  updateForm() {
    var date = new Date(this.form.StartDate);
    let dateString = this.datepipe.transform(date, 'MM-dd-yyyy');
    var para = new HttpParams().set('AdmissionFormId', this.formId)
      .set('CourseId', this.form.Course.Id + '').set('StartDate', dateString).set('Name', this.form.Name)
      .set('SlotId', this.selectedSlot + '')
      .set('BuildingId', this.selectedBuilding + '')
      .set('IsClosed', false + '').set('CenterId', this.apiContext.centerId + '');
    this.selectedDayArr.forEach(item => {
      para = para.append('DaysPerWeek', item + '');
    });
    const url = this.apiContext.host + 'api/AdmissionManagement/UpdateAdmissionForm';
    console.log(para);
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
