import {Component, OnInit, AfterViewInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {AuthService} from '../auth.service';
import {APIContext, APITraining} from '../APIContext';

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
export class ProfileComponent implements OnInit, AfterViewInit {
  apiContext = new APIContext();
  apiTraining = new APITraining();
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

  constructor(private router: Router, private http: HttpClient, private auth: AuthService) {
  }

  ngOnInit() {
    this.getProfile();
    this.setButtonLabel();
  }

  getProfile() {
    if (this.auth.adminLogedIn()) {
      const configUrl = this.apiContext.host + 'api/Systemmanagement/Profile';
      this.http.get<any>(configUrl).subscribe(res => {
          console.log(res);
          this.user.name = res.FullName;
          this.user.email = res.Email;
          this.user.PhoneNumber = res.PhoneNumber;
          this.user.Sex = res.Sex;
          this.user.Id = res.Id;
          this.user.Avatar = res.Avatar;
          console.log(res.FullName);
        },
        error => {
          if (error instanceof HttpErrorResponse) {
            if (error.status === 401) {
              console.log(error.status);
            }
          }
        });
    } else if (this.auth.trainingStaffLogedIn()) {
      const configUrl = this.apiContext.host + this.apiTraining.getProfile;
      this.http.get<any>(configUrl).subscribe(res => {
          console.log(res);
          this.user.name = res.FullName;
          this.user.email = res.Email;
          this.user.PhoneNumber = res.PhoneNumber;
          this.user.Sex = res.Sex;
          this.user.Id = res.Id;
          this.user.Avatar = res.Avatar;
        },
        error => {
          console.log(error);
          if (error instanceof HttpErrorResponse) {
            if (error.status === 401) {
              console.log(error.status);
            }
          }
        });
    } else if (this.auth.admissionStaffLogedIn()) {
      const configUrl = this.apiContext.host + 'api/AdmissionManagement/Profile';
      this.http.get<any>(configUrl).subscribe(res => {
          console.log(res);
          this.user.name = res.FullName;
          this.user.email = res.Email;
          this.user.PhoneNumber = res.PhoneNumber;
          this.user.Sex = res.Sex;
          this.user.Id = res.Id;
          this.user.Avatar = res.Avatar;
        },
        error => {
          console.log(error);
          if (error instanceof HttpErrorResponse) {
            if (error.status === 401) {
              console.log(error.status);
            }
          }
        });
    } else if (this.auth.accountingStaffLoggedin()) {
      const configUrl = this.apiContext.host + 'api/AccoungtingDept/profile';
      this.http.get<any>(configUrl).subscribe(res => {
          console.log(res);
          this.user.name = res.FullName;
          this.user.email = res.Email;
          this.user.PhoneNumber = res.PhoneNumber;
          this.user.Sex = res.Sex;
          this.user.Id = res.Id;
          this.user.Avatar = res.Avatar;
        },
        error => {
          console.log(error);
          if (error instanceof HttpErrorResponse) {
            if (error.status === 401) {
              console.log(error.status);
            }
          }
        });
    } else if (this.auth.centerAdminLoggedIn()) {
      const configUrl = this.apiContext.host + 'api/CenterManagement/profile';
      this.http.get<any>(configUrl).subscribe(res => {
          console.log(res);
          this.user.name = res.FullName;
          this.user.email = res.Email;
          this.user.PhoneNumber = res.PhoneNumber;
          this.user.Sex = res.Sex;
          this.user.Id = res.Id;
          this.user.Avatar = res.Avatar;
        },
        error => {
          console.log(error);
          if (error instanceof HttpErrorResponse) {
            if (error.status === 401) {
              console.log(error.status);
            }
          }
        });
    } else if (this.auth.StudentLoggedIn()) {
      const configUrl = this.apiContext.host + 'api/Student/profile';
      this.http.get<any>(configUrl).subscribe(res => {
          console.log(res);
          this.user.name = res.FullName;
          this.user.email = res.Email;
          this.user.PhoneNumber = res.PhoneNumber;
          this.user.Sex = res.Sex;
          this.user.Id = res.Id;
          this.user.Avatar = res.Avatar;
        },
        error => {
          console.log(error);
          if (error instanceof HttpErrorResponse) {
            if (error.status === 401) {
              console.log(error.status);
            }
          }
        });
    }
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
    // this.loadScript('../../assets/bundles/libscripts.bundle.js');
    // this.loadScript('../../assets/bundles/vendorscripts.bundle.js');
    // this.loadScript('../../assets/bundles/morphingsearchscripts.bundle.js');
    // this.loadScript('../../assets/bundles/mainscripts.bundle.js');
  }


  updateProfile() {
    var configUrl = '';
    if (this.auth.adminLogedIn()) {
      configUrl = '';
    } else if (this.auth.trainingStaffLogedIn()) {
      configUrl = this.apiContext.host + this.apiTraining.updateProfile;
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

      },
      error => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {

          }
        }
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


