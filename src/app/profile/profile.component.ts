import {Component, OnInit, AfterViewInit, AfterContentInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {AuthService} from '../auth.service';
import {APIAccounting, APIAdmission, APICenter, APIContext, APIStudent, APISystem, APITraining, APITeacher} from '../APIContext';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'
    , '../../assets/plugins/bootstrap/css/bootstrap.min.css'
    , '../../assets/css/main.css'
    , '../../assets/css/themes/all-themes.css']
})
export class ProfileComponent implements OnInit, AfterViewInit, AfterContentInit {
  apiContext = new APIContext();
  apiTraining = new APITraining();
  apiAdmission = new APIAdmission();
  apiSystem = new APISystem();
  apiAccounting = new APIAccounting();
  apiCenter = new APICenter();
  apiStudent = new APIStudent();
  apiTeacher = new APITeacher();
  user = {
    name: '',
    email: '',
    PhoneNumber: '',
    Sex: '',
    Id: '',
    Avatar: ''
  };

  isEditing = false;
  buttonLabel = '';
  isLoading = true;

  constructor(private router: Router, private http: HttpClient, private auth: AuthService) {
  }

  ngOnInit() {
    this.getProfile();
    this.setButtonLabel();
  }

  getProfile() {
    this.isLoading = true;

    let configUrl = this.apiContext.host;

    if (this.auth.adminLogedIn()) {
      configUrl += this.apiSystem.profile;
    } else if (this.auth.trainingStaffLogedIn()) {
      configUrl += this.apiTraining.getProfile;
    } else if (this.auth.admissionStaffLogedIn()) {
      configUrl += this.apiAdmission.profile;
    } else if (this.auth.accountingStaffLoggedin()) {
      configUrl += this.apiAccounting.profile;
    } else if (this.auth.centerAdminLoggedIn()) {
      configUrl += this.apiCenter.profile;
    } else if (this.auth.StudentLoggedIn()) {
      configUrl += this.apiStudent.profile;
    } else if (this.auth.TeacherLoggedIn()) {
      configUrl += this.apiTeacher.profile;
    } else if (this.auth.adminLogedIn()) {
      configUrl += this.apiSystem.profile;
    }

    this.http.get<any>(configUrl).subscribe(res => {
        console.log(res);
        this.user.name = res.FullName;
        this.user.email = res.Email;
        this.user.PhoneNumber = res.PhoneNumber;
        this.user.Sex = res.Sex;
        this.user.Id = res.Id;
        this.user.Avatar = res.Avatar;
        this.isLoading = false;
      },
      error => {
        console.log(error);
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            console.log(error.status);
          }
        }
        this.isLoading = false;
      });

  }

  public loadScript(url: string) {
    const body = <HTMLDivElement>document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }

  ngAfterContentInit(): void {
    this.isLoading = false;
  }

  ngAfterViewInit() {
    this.isLoading = false;
    // this.loadScript('../../assets/bundles/libscripts.bundle.js');
    // this.loadScript('../../assets/bundles/vendorscripts.bundle.js');
    // this.loadScript('../../assets/bundles/morphingsearchscripts.bundle.js');
    // this.loadScript('../../assets/bundles/mainscripts.bundle.js');
  }


  updateProfile() {
    this.isLoading = true;


    let configUrl = this.apiContext.host;

    if (this.auth.adminLogedIn()) {
      configUrl += this.apiSystem.updateProfile;
    } else if (this.auth.trainingStaffLogedIn()) {
      configUrl += this.apiTraining.updateProfile;
    } else if (this.auth.admissionStaffLogedIn()) {
      configUrl += this.apiAdmission.updateProfile;
    } else if (this.auth.accountingStaffLoggedin()) {
      configUrl += this.apiAccounting.updateProfile;
    } else if (this.auth.centerAdminLoggedIn()) {
      configUrl += this.apiCenter.updateProfile;
    } else if (this.auth.StudentLoggedIn()) {
      configUrl += this.apiStudent.updateProfile;
    } else if (this.auth.TeacherLoggedIn()) {
      configUrl += this.apiTeacher.updateProfile;
    } else if (this.auth.adminLogedIn()) {
      configUrl += this.apiSystem.updateProfile;
    } else {

    }
    const body = new HttpParams()
      .set('Id', this.user.Id)
      .set('FullName', this.user.name)
      .set('Avatar', this.user.Avatar)
      .set('Email', this.user.email)
      .set('Sex', this.user.Sex)
      .set('PhoneNumber', this.user.PhoneNumber);

    this.http.post<any>(configUrl, body).subscribe(res => {
        console.log(res);
        this.user.name = res.Full_Name;
        this.user.email = res.Email;
        this.user.PhoneNumber = res.PhoneNumber;
        this.user.Sex = res.Sex;
        this.user.Id = res.Id;
        console.log(res);
        this.isLoading = false;
      },
      error => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {

          }
        }
        this.isLoading = false;
      });
  }

  setButtonLabel() {
    if (this.isEditing) {
      this.buttonLabel = 'Save';
    } else {
      this.buttonLabel = 'Edit Profile';
    }
  }

  onUploadCompleted($event: any) {
    console.log($event);
    this.user.Avatar = $event['originalUrl'];
  }

  clickUpdate() {
    this.isEditing = true;
  }

  clickSubmit() {
    this.updateProfile();
    this.isEditing = false;
  }

  clickCancel() {
    this.isEditing = false;
  }

  changedGender() {
    if (this.user.Sex == 'true') {
      this.user.Sex = 'false';
    } else {
      this.user.Sex = 'true';
    }
  }
}


