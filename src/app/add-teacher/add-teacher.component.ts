import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Subject} from '../subject';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {APIContext, APITraining} from '../APIContext';
import {UrlTraining} from '../SiteUrlContext';
import {MenuBarComponent} from '../menu-bar/menu-bar.component';

@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.css'
    , '../../assets/plugins/bootstrap/css/bootstrap.min.css'
    , '../../assets/css/main.css'
    , '../../assets/css/themes/all-themes.css']
})
export class AddTeacherComponent implements OnInit, AfterViewInit {
  apiContext = new APIContext();
  apiTraining = new APITraining();
  centerId: number;
  urlTraining = new UrlTraining();

  fullName = '';
  teacherEmail = '';
  subjectList: Subject[] = [];
  selectedSubject: Subject[] = [];
  errorMsgName = '-';
  errorMsgMail = '-';
  errorMsgPhone = '-';
  errorMsgSubject = '-';
  isLoading = true;
  teacherPhone = '';

  constructor(private router: Router, private http: HttpClient, private route: ActivatedRoute, private toastr: ToastrService) {
  }

  ngOnInit() {
    const urlGetCenterId = this.apiContext.host + this.apiTraining.getCenter;
    this.http.get(urlGetCenterId).toPromise().then(data => {
      this.centerId = data['Id'];
      this.getAllSubjects();
    });
  }

  ngAfterViewInit(): void {
    this.isLoading = false;
  }


  getAllSubjects() {
    this.isLoading = true;
    const body = new HttpParams()
      .set('centerId', this.centerId + '')
      .set('subjectName', '');
    const configUrl = this.apiContext.host + this.apiTraining.searchSubject;
    this.http.get<Subject[]>(configUrl, {params: body}).toPromise().then(res => {
        console.log(res);
        this.subjectList = res;
        console.log(this.subjectList);
        this.isLoading = false;
      },
      error => {
        console.log(error);
        this.isLoading = false;
        this.toastr.info('Something is not working right. Please try again soon.');
        // this.showMessage(false);
      });
  }

  checkValidName() {
    if (this.fullName != null) {
      this.fullName = this.formatText(this.fullName);
    }
    if (this.fullName == null || this.fullName === '') {
      this.errorMsgName = 'Name is required.';
      return false;
    } else {
      this.errorMsgName = '';
      return true;
    }
  }

  checkValidEmail() {
    if (this.teacherEmail != null) {
      this.teacherEmail = this.formatText(this.teacherEmail);
    }
    const regex = /^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/gm;
    if (this.teacherEmail == null || this.teacherEmail === '') {
      this.errorMsgMail = 'Email is required.';
      return false;
    } else if (!regex.test(this.teacherEmail)) {
      this.errorMsgMail = 'Invalid email format.';
      return false;
    } else {
      this.errorMsgMail = '';
      return true;
    }
  }

  checkValidPhone() {
    if (this.teacherPhone != null) {
      this.teacherPhone = this.formatText(this.teacherPhone);
    }
    const regex = /(09|03)+([0-9]{8})\b/g;
    if (this.teacherPhone == null || this.teacherPhone === '') {
      this.errorMsgPhone = 'Phone is required.';
      return false;
    } else if (!regex.test(this.teacherPhone)) {
      this.errorMsgPhone = 'Invalid phone number format.';
      return false;
    } else {
      this.errorMsgPhone = '';
      return true;
    }
  }

  checkValidSubject() {
    if (this.selectedSubject == null || this.selectedSubject.length < 1) {
      this.errorMsgSubject = 'Subject is required.';
      return false;
    } else {
      this.errorMsgSubject = '';
      return true;
    }
  }

  checkValidFields() {
    this.checkValidName();
    this.checkValidEmail();
    this.checkValidSubject();
    this.checkValidPhone();
    if (this.checkValidName() && this.checkValidEmail() && this.checkValidSubject() && this.checkValidPhone()) {
      this.addTeacher();
    } else {
      this.toastr.warning('Something is missing.', 'Alert!');
    }
  }

  formatText(s: string) {
    return s.trim().replace(/\s\s+/g, ' ');
  }

  redirectToViewTeacher() {
    MenuBarComponent.currentUrl = this.urlTraining.viewTeacher;
    this.router.navigateByUrl(this.urlTraining.viewTeacher);
  }

  private addTeacher() {
    this.isLoading = true;
    const configUrl = this.apiContext.host + this.apiTraining.grantAccountForTeacher;
    let body = new HttpParams()
      .set('Email', this.teacherEmail)
      .set('FullName', this.fullName)
      .set('PhoneNumber', this.teacherPhone)
      .set('CenterId', this.centerId + '');
    this.selectedSubject.forEach(item => {
      body = body.append('Subjects', item + '');
    });
    console.log(body);
    this.http.post<any>(configUrl, body).toPromise().then(
      res => {
        console.log(res);
        // this.showMessage(true);
        this.isLoading = false;
        this.toastr.success('Teacher ' + this.fullName + ' was added successfully.', 'Success!');
        this.redirectToViewTeacher();
      },
      err => {
        console.log(err);
        this.isLoading = false;
        if (err instanceof HttpErrorResponse && err.status === 406) {
          console.log(err.status);
          this.toastr.error(err.error, 'Oops!');
        } else {
          this.toastr.error('Something goes wrong. Please try again.', 'Oops!');
        }
      }
    );
  }
}
