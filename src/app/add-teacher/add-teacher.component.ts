import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Subject} from '../subject';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {APIContext, APITraining} from '../APIContext';

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

  fullName = '';
  teacherEmail = '';
  subjectList: Subject[] = [];
  selectedSubject: Subject[] = [];
  errorMsgName = '-';
  errorMsgMail = '-';
  errorMsgSubject = '-';
  isLoading = true;

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
    if (this.teacherEmail == null || this.teacherEmail === '') {
      this.errorMsgMail = 'Email is required.';
      return false;
    } else {
      this.errorMsgMail = '';
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
    if (this.checkValidName() && this.checkValidEmail() && this.checkValidSubject()) {
      this.addTeacher();
    } else {
      this.toastr.warning('Something is missing.', 'Alert!');
    }
  }

  formatText(s: string) {
    return s.trim().replace(/\s\s+/g, ' ');
  }

  redirectToViewTeacher() {
    this.router.navigateByUrl('/Training-staff/view-teacher');
  }

  private addTeacher() {
    this.isLoading = true;
    const configUrl = this.apiContext.host + this.apiTraining.grantAccountForTeacher;
    const body = new HttpParams()
      .set('Email', this.teacherEmail)
      .set('FullName', this.fullName)
      .set('Subjects', JSON.stringify(this.selectedSubject))
      .set('CenterId', this.centerId + '');
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
