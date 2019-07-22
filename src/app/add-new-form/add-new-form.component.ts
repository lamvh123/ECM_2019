import {Component, OnInit} from '@angular/core';
import {Course} from '../course';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';
import {Center} from '../center';
import {Building} from '../building';
import {Observable} from 'rxjs';
import {AdmissionForm} from '../admission-form';
import {DatePipe} from '@angular/common';
import {Slot} from '../slot';

@Component({
  selector: 'app-add-new-form',
  templateUrl: './add-new-form.component.html',
  styleUrls: ['./add-new-form.component.css', '../css/assets/css/main.css',
    '../css/assets/css/themes/all-themes.css']
})
export class AddNewFormComponent implements OnInit {
  listCourse: Course[];
  courseId;
  isClosed = -1;
  isClose;
  boolArr: string[] = ['true', 'false'];
  centerId;
  selectedBuilding;
  listBuilding: Observable<Building[]>;
  form: AdmissionForm;
  selectedDayArr: any[];
  dayArr: any[] = [{dayNumber: 1, dayString: 'Monday'}, {dayNumber: 2, dayString: 'Tuesday'},
    {dayNumber: 3, dayString: 'Wednesday'}, {dayNumber: 4, dayString: 'Thursday'},
    {dayNumber: 5, dayString: 'Friday'}, {dayNumber: 6, dayString: 'Saturday'}, {dayNumber: 0, dayString: 'Sunday'}];
  listOfSlot: Slot[];
  selectedSlot;

  constructor(private http: HttpClient, private router: Router, private datepipe: DatePipe) {

  }

  ngOnInit() {
    this.form = new AdmissionForm();
    this.getInitData();

  }

  getAllBuilding() {
    const url = 'https://educationcentermanagementapi-dev-as.azurewebsites.net/api/AdmissionManagement/GetAllBuilding';
    var para = new HttpParams().set('centerId', this.centerId + '');
    this.http.get<Observable<Building[]>>(url, {params: para}).toPromise().then(data => {
        this.listBuilding = data;
        console.log(this.listBuilding);
      },
      error => {
        console.log(error);
      });
  }

  getInitData() {
    const url = 'https://educationcentermanagementapi-dev-as.azurewebsites.net/api/AdmissionManagement/GetCenter';
    this.http.get(url).toPromise().then((data) => {
        this.centerId = data['Id'];
        const getAllCourseUrl = 'https://educationcentermanagementapi-dev-as.azurewebsites.net/api/AdmissionManagement/GetAllCourse';
        var para = new HttpParams().set('centerId', this.centerId + '');
        this.http.get<Course[]>(getAllCourseUrl, {params: para}).toPromise().then(data => {
            this.listCourse = data;
            console.log(this.listCourse);
          },
          error => {
            console.log(error);
          }
        );
        this.getAllBuilding();
        this.getAllSlot();
      },
      error => {
        console.log(error);
      });
  }

  getAllSlot() {
    const url = 'https://educationcentermanagementapi-dev-as.azurewebsites.net/api/AdmissionManagement/GetAllSlot';
    var para = new HttpParams().set('centerId', this.centerId + '');
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

  CreateForm() {
    var date = new Date(this.form.StartDate);
    let dateString = this.datepipe.transform(date, 'MM-dd-yyyy');
    var para = new HttpParams()
      .set('CourseId', this.courseId + '')
      .set('StartDate', dateString)
      .set('Name', this.form.Name)
      .set('BuildingId', this.selectedBuilding + '')
      .set('CenterId', this.centerId)
      .set('SlotId', this.selectedSlot);
    this.selectedDayArr.forEach(item => {
      para = para.append('DaysPerWeek', item + '');
    });
    const url = 'https://educationcentermanagementapi-dev-as.azurewebsites.net/api/AdmissionManagement/CreateAdmissionForm';
    console.log(para);
    this.http.post<any>(url, para).toPromise().then(data => {
        console.log(data);
        if (data['Id'] != null && data['Id'] != 0) {

          this.router.navigate(['/redirect', '/Admission-staff/form-detail', data['Id']]);
        }
      },
      error => {
        console.log(error);
      });
  }



  // redirectToAllProgram() {
  //   this.router.navigateByUrl('/Training-staff/view-program');
  // }
  //
  // redirectToAddProgram() {
  //   this.router.navigateByUrl('/Training-staff/add-program');
  // }
  //
  // private showMessage(status: boolean) {
  //   let messageConfirm;
  //   if (status) {
  //     messageConfirm = 'A program was added successfully.' +
  //       '\nDo you want to add more programs?';
  //   } else {
  //     messageConfirm = 'Something go wrong.' +
  //       '\nDo you want to try again?';
  //   }
  //   const r = confirm(messageConfirm);
  //   if (r === true) {
  //     this.redirectToAddProgram();
  //   } else {
  //     this.redirectToAllProgram();
  //   }
  // }

}
