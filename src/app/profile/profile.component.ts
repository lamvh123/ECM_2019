import {Component, OnInit, AfterViewInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {AuthService} from '../auth.service';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, AfterViewInit {
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
    console.log('asd');
    this.setButtonLabel();
  }

  getProfile() {
    if (this.auth.adminLogedIn()) {
      const configUrl = 'https://educationcentermanagementapi-dev-as.azurewebsites.net/api/Systemmanagement/Profile';
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

            }
          }
        });
    } else if (this.auth.trainingStaffLogedIn()) {
      const configUrl = 'https://educationcentermanagementapi-dev-as.azurewebsites.net/api/TrainingDept/Profile';
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
    // this.loadScript('/assets/bundles/libscripts.bundle.js');
    // this.loadScript('/assets/bundles/vendorscripts.bundle.js');
    // this.loadScript('/assets/bundles/mainscripts.bundle.js');
    // this.loadScript('/assets/bundles/morphingsearchscripts.bundle.js');
    // this.loadScript('/assets/plugins/autosize/autosize.js');
    // this.loadScript('/assets/plugins/momentjs/moment.js');
    // this.loadScript('/assets/plugins/dropzone/dropzone.js');
    // this.loadScript('/assets/plugins/bootstrap-material-datetimepicker/js/bootstrap-material-datetimepicker.js');
    //this.loadScript('/assets/js/pages/forms/basic-form-elements.js');
  }

  clickUpdate() {
    if (this.isEditing) {
      this.updateProfile();
      this.isEditing = false;
      this.setButtonLabel();
    } else {
      this.isEditing = true;
      this.setButtonLabel();
    }
  }

  updateProfile() {
    var configUrl = '';
    if (this.auth.adminLogedIn()) {
      configUrl = '';
    } else if (this.auth.trainingStaffLogedIn()) {
      configUrl = 'https://educationcentermanagementapi-dev-as.azurewebsites.net/api/TrainingDept/UpdateProfile';
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
    this.updateProfile();
  }
}


