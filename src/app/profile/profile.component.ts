import {Component, OnInit, AfterViewInit, AfterContentInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {AuthService} from '../auth.service';
import {APIAccounting, APIAdmission, APICenter, APIContext, APIStudent, APISystem, APITraining, APITeacher} from '../APIContext';
import {ToastrService} from 'ngx-toastr';

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
    Sex: true,
    Id: '',
    Avatar: ''
  };

  isEditing = false;
  buttonLabel = '';
  isLoading = true;
  errorMsgName = '-';
  errorMsgPhone = '-';

  constructor(private router: Router, private http: HttpClient, private auth: AuthService, private toastr: ToastrService) {
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
        this.toastr.info('Something is not working right. Please try again soon.');
      });

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
    this.triggerEnterForm('formAdd', 'btnAdd');
    this.isLoading = false;
  }

  triggerEnterForm(formId: string, btnId: string) {
    const signInForm = document.getElementById(formId);
    signInForm.addEventListener('keyup', function(event) {
      if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById(btnId).click();
      }
    });
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
      .set('Sex', this.user.Sex + '')
      .set('PhoneNumber', this.user.PhoneNumber);

    this.http.post<any>(configUrl, body).subscribe(res => {
        console.log(res);
        this.user.name = res.FullName;
        this.user.email = res.Email;
        this.user.PhoneNumber = res.PhoneNumber;
        this.user.Sex = res.Sex;
        this.user.Id = res.Id;
        console.log(res);
        this.isLoading = false;
        this.toastr.success('Profile was updated successfully.', 'Success!');
      },
      error => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {

          }
        }
        this.isLoading = false;
        this.toastr.error('Something goes wrong. Please try again.', 'Oops!');
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
    this.errorMsgName = '-';
    this.errorMsgPhone = '-';
  }

  clickSubmit() {
    this.updateProfile();
    this.isEditing = false;
    this.errorMsgName = '-';
    this.errorMsgPhone = '-';
  }

  clickCancel() {
    this.isEditing = false;
    this.errorMsgName = '-';
    this.errorMsgPhone = '-';
  }

  setradio(b: boolean) {
    this.user.Sex = b;
  }

  checkValidName() {
    if (this.user.name != null) {
      this.user.name = this.formatText(this.user.name);
    }
    if (this.user.name == null || this.user.name === '') {
      this.errorMsgName = 'Name is required.';
      return false;
    } else {
      this.errorMsgName = '';
      return true;
    }
  }

  checkValidPhone() {
    if (this.user.PhoneNumber != null) {
      this.user.PhoneNumber = this.formatText(this.user.PhoneNumber);
    }
    const regex = /(09|03)+([0-9]{8})\b/g;
    if (this.user.PhoneNumber == null || this.user.PhoneNumber === '') {
      this.errorMsgPhone = 'Phone is required.';
      return false;
    } else if (!regex.test(this.user.PhoneNumber)) {
      this.errorMsgPhone = 'Invalid phone number format.';
      return false;
    } else {
      this.errorMsgPhone = '';
      return true;
    }
  }

  checkValidFields() {
    this.checkValidName();
    this.checkValidPhone();
    if (this.checkValidName() && this.checkValidPhone()) {
      this.clickSubmit();
    } else {
      this.toastr.warning('Something is missing.', 'Alert!');
    }
  }

  isInputNumber(evt) {
    const c = String.fromCharCode(evt.which);
    if (!(/[0-9]/.test(c))) {
      evt.preventDefault();
    }
  }

  formatText(s: string) {
    return s.trim().replace(/\s\s+/g, ' ');
  }
}


