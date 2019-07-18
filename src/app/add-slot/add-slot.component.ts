import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Subject} from '../subject';
import * as $ from 'jquery';
import {AmazingTimePickerService} from 'amazing-time-picker';
import {Slot} from '../slot';
import {Center} from '../center';

@Component({
  selector: 'app-add-slot',
  templateUrl: './add-slot.component.html',
  styleUrls: ['./add-slot.component.css'
    , '../../assets/plugins/bootstrap/css/bootstrap.min.css'
    , '../../assets/plugins/dropzone/dropzone.css'
    , '../../assets/plugins/bootstrap-material-datetimepicker/css/bootstrap-material-datetimepicker.css'
    , '../../assets/plugins/waitme/waitMe.css'
    , '../../assets/plugins/bootstrap-select/css/bootstrap-select.css'
    , '../../assets/css/main.css'
    , '../../assets/css/themes/all-themes.css']
})
export class AddSlotComponent implements OnInit, AfterViewInit {

  constructor(private atp: AmazingTimePickerService, private _router: Router, private http: HttpClient, private route: ActivatedRoute) {
  }

  center: Center;
  slotModel: Slot = {
    $id: '',
    ID: -1,
    Center: this.center,
    Name: '',
    From: '00:00',
    To: '00:00'
  };
  programId;
  courseName = '';
  image = '';
  Fee = '';
  Description = '';
  totalSession: '';
  subjectId = '';
  centerId = {
    Id: '',
    name: ''
  };
  subjects: Subject[];


  ngOnInit() {
    this.programId = this.route.snapshot.paramMap.get('id');
    this.getSubjectsWithCenterId();
  }

  public loadScript(url: string) {
    const body = <HTMLDivElement> document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }

  ngAfterViewInit() {

    // this.loadScript('/assets/bundles/libscripts.bundle.js');
    // this.loadScript('/assets/bundles/vendorscripts.bundle.js');
    // this.loadScript('/assets/bundles/mainscripts.bundle.js');
    // this.loadScript('/assets/plugins/momentjs/moment.js');
    // this.loadScript('/assets/js/TrainingDept/addcourse.js');
  }

  addCourse() {
    const configUrl = 'https://educationcentermanagementapi-dev-as.azurewebsites.net/api/TrainingDept/AddCourse';
    const url = 'https://educationcentermanagementapi-dev-as.azurewebsites.net/api/TrainingDept/GetCenter';
    this.http.get(url).toPromise().then(data => {
        const body = new HttpParams()
          .set('CourseName', this.courseName)
          .set('Image', this.image)
          .set('Fee', this.Fee)
          .set('TotalSession', this.totalSession)
          .set('Description', this.Description)
          .set('ProgramId', this.programId)
          .set('SubjectId', this.subjectId)
          .set('CenterId', data['Id']);
        console.log(body);
        this.http.post<any>(configUrl, body).toPromise().then(
          res => {
            console.log(res);
          },
          err => {
            console.log(err);
          }
        );
      },
      error => {
        console.log(error);
      });
    this.redirectToViewCourse();
  }


  onUploadCompleted($event: any) {
    this.image = $event.originalUrl;
  }

  selectedValueChanged(value: any) {
    this.subjectId = value;
    console.log(value);
  }

  getSubjectsWithCenterId() {
    const url = 'https://educationcentermanagementapi-dev-as.azurewebsites.net/api/TrainingDept/GetCenter';
    this.http.get(url).toPromise().then((data) => {
        this.centerId.Id = data['Id'];
        this.getAllSubjects();
      },
      error => {
        console.log(error);
      });

  }

  getAllSubjects() {

    const body = new HttpParams()
      .set('centerId', this.centerId.Id + '')
      .set('subjectName', '');

    const configUrl = 'https://educationcentermanagementapi-dev-as.azurewebsites.net/api/TrainingDept/SearchSubject';
    this.http.get<Subject[]>(configUrl, {params: body}).toPromise().then(res => {
        console.log(res);
        this.subjects = res;
        console.log(this.subjects);
      },
      error => {
        console.log(error);
      });
  }

  redirectToViewCourse() {
    this._router.navigate(['/Training-staff/view-course', this.programId]);
  }

  chooseTimeFrom() {
    const amazingTimePicker = this.atp.open();
    amazingTimePicker.afterClose().subscribe(time => {
      console.log(time);
    });
  }
}
