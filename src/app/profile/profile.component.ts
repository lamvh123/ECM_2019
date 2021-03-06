import {Component, OnInit, AfterViewInit, AfterContentInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {AuthService} from '../auth.service';
import {APIAccounting, APIAdmission, APICenter, APIContext, APIStudent, APISystem, APITraining, APITeacher} from '../APIContext';
import {ToastrService} from 'ngx-toastr';
import {Building} from '../building';
import {Subject} from '../subject';
import {AdmissionForm} from '../admission-form';

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
  centerId: number;
  user = {
    name: '',
    email: '',
    PhoneNumber: '',
    Sex: true,
    Id: '',
    Avatar: '',
    Subjects: []
  };

  isEditing = false;
  buttonLabel = '';
  isLoading = true;
  errorMsgName = '-';
  errorMsgPhone = '-';
  errorMsgSubject = '-';
  errorMsgImage = '-';
  private listSubject: Subject[];

  constructor(private router: Router, private http: HttpClient, private auth: AuthService, private toastr: ToastrService) {
  }

  ngOnInit() {
    this.isLoading = true;
    if (this.auth.TeacherLoggedIn()) {
      const urlGetCenterId = this.apiContext.host + this.apiTeacher.getCenter;
      this.http.get(urlGetCenterId).toPromise().then(data => {
        this.centerId = data['Id'];
        this.getInitData();
        this.isLoading = false;
      });
    } else {
      this.getInitData();
      this.isLoading = false;
    }
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
        if (this.auth.TeacherLoggedIn()) {
          this.user.Subjects = [];
          for (let i = 0; i < res.Subjects.length; i++) {
            this.user.Subjects.push(res.Subjects[i].Id);
          }
          // res.Subjects.forEach(function(item) {
          //   this.user.Subjects.push(item.Id);
          // });
          console.log('this.user.Subjects');
          console.log(this.user.Subjects);
        }
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
    } else {

    }
    let body = new HttpParams()
      .set('Id', this.user.Id)
      .set('FullName', this.user.name)
      .set('Avatar', this.user.Avatar)
      .set('Email', this.user.email)
      .set('Sex', this.user.Sex + '')
      .set('PhoneNumber', this.user.PhoneNumber);
    if (this.auth.TeacherLoggedIn()) {
      this.user.Subjects.forEach(item => {
        body = body.append('Subjects', item);
      });
    }

    this.http.post<any>(configUrl, body).subscribe(res => {
        console.log(res);
        // this.user.name = res.FullName;
        // this.user.email = res.Email;
        // this.user.PhoneNumber = res.PhoneNumber;
        // this.user.Sex = res.Sex;
        // this.user.Id = res.Id;
        console.log(res);
        this.isLoading = false;
        this.toastr.success('Profile was updated successfully.', 'Success!');
        this.getProfile();
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
    this.errorMsgSubject = '-';
  }

  clickSubmit() {
    this.updateProfile();
    this.isEditing = false;
    this.errorMsgName = '-';
    this.errorMsgPhone = '-';
    this.errorMsgSubject = '-';
  }

  clickCancel() {
    this.isEditing = false;
    this.errorMsgName = '-';
    this.errorMsgPhone = '-';
    this.errorMsgSubject = '-';
  }

  setradio(b: boolean) {
    this.user.Sex = b;
  }

  checkValidImage() {
    if (this.user.Avatar != null) {
      this.user.Avatar = this.formatText(this.user.Avatar);
    }
    if (this.user.Avatar == null || this.user.Avatar === '') {
      this.errorMsgImage = 'Avatar is required.';
      return false;
    } else {
      this.errorMsgImage = '';
      return true;
    }
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

  checkValidSubject() {
    if (this.user.Subjects == null || this.user.Subjects.length < 1) {
      this.errorMsgSubject = 'Subject is required.';
      return false;
    } else {
      this.errorMsgSubject = '';
      return true;
    }
  }

  checkValidFields() {
    if (this.auth.TeacherLoggedIn()) {
      this.checkValidSubject();
      this.checkValidImage();
      this.checkValidName();
      this.checkValidPhone();
      if (this.checkValidImage() && this.checkValidName() && this.checkValidPhone() && this.checkValidSubject()) {
        this.clickSubmit();
      } else {
        this.toastr.warning('Something is missing.', 'Alert!');
      }
    } else {
      this.checkValidImage();
      this.checkValidName();
      this.checkValidPhone();
      if (this.checkValidImage() && this.checkValidName() && this.checkValidPhone()) {
        this.clickSubmit();
      } else {
        this.toastr.warning('Something is missing.', 'Alert!');
      }
    }
  }

  isTeacherLogin() {
    return this.auth.TeacherLoggedIn();
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

  private getAllSubjects() {
    this.isLoading = true;
    const body = new HttpParams()
      .set('centerId', this.centerId + '');

    const configUrl = this.apiContext.host + this.apiTeacher.getAllSubject;
    this.http.get<Subject[]>(configUrl, {params: body}).toPromise().then(res => {
        console.log(res);
        this.listSubject = res;
        console.log(this.listSubject);
        this.isLoading = false;
      },
      error => {
        console.log(error);
        this.isLoading = false;
        this.toastr.info('Something is not working right. Please try again soon.');
      });
  }

  private getInitData() {
    this.getProfile();
    this.setButtonLabel();
    if (this.auth.TeacherLoggedIn()) {
      this.getAllSubjects();
    }
  }
}


