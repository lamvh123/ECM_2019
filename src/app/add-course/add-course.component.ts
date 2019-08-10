import {Component, OnInit, AfterViewInit, AfterContentInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {HttpParams, HttpClient} from '@angular/common/http';
import {Building} from '../building';
import {Subject} from '../subject';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {APIContext, APITraining} from '../APIContext';


@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css'
    , '../../assets/plugins/bootstrap/css/bootstrap.min.css'
    , '../../assets/plugins/dropzone/dropzone.css'
    , '../../assets/plugins/bootstrap-material-datetimepicker/css/bootstrap-material-datetimepicker.css'
    , '../../assets/plugins/waitme/waitMe.css'
    , '../../assets/plugins/bootstrap-select/css/bootstrap-select.css'
    , '../../assets/css/main.css'
    , '../../assets/css/themes/all-themes.css']
})
export class AddCourseComponent implements OnInit, AfterContentInit {
  public Editor = ClassicEditor;

  apiContext = new APIContext();
  apiTraining = new APITraining();

  programId;
  courseName = '';
  image = '';
  Fee = '';
  Description = '';
  totalSession = '';
  subjectId = '';
  subjects: Subject[];

  errorMsgName = '-';
  errorMsgImage = '-';
  errorMsgFee = '-';
  errorMsgTotalSession = '-';
  errorMsgSubject = '-';
  errorMsgDescription = '-';
  isLoading = true;

  public onReady(editor) {
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    );
  }

  constructor(private router: Router, private http: HttpClient, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.programId = this.route.snapshot.paramMap.get('id');
    this.getAllSubjects();
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
  ngAfterContentInit(): void {
    this.isLoading = false;
  }
  // ngAfterViewInit() {
  //   // this.loadScript('/assets/bundles/libscripts.bundle.js');
  //   // this.loadScript('/assets/bundles/vendorscripts.bundle.js');
  //   // this.loadScript('/assets/bundles/mainscripts.bundle.js');
  //   // this.loadScript('/assets/plugins/momentjs/moment.js');
  //   // this.loadScript('/assets/js/TrainingDept/addcourse.js');
  // }

  addCourse() {
    this.isLoading = true;
    const configUrl = this.apiContext.host + this.apiTraining.addCourse;
    const body = new HttpParams()
      .set('CourseName', this.courseName)
      .set('Image', this.image)
      .set('Fee', this.Fee)
      .set('TotalSession', this.totalSession)
      .set('Description', this.Description)
      .set('ProgramId', this.programId)
      .set('SubjectId', this.subjectId)
      .set('CenterId', this.apiContext.centerId + '');
    console.log(body);
    this.http.post<any>(configUrl, body).toPromise().then(
      res => {
        console.log(res);
        // this.showMessage(true);
        this.redirectToViewCourse();
      },
      err => {
        console.log(err);
        this.isLoading = false;
        // this.showMessage(false);
      }
    );
  }


  onUploadCompleted($event: any) {
    this.image = $event.originalUrl;
  }

  selectedValueChanged(value: any) {
    this.subjectId = value;
    console.log(value);
  }

  getAllSubjects() {
    this.isLoading = true;
    const body = new HttpParams()
      .set('centerId', this.apiContext.centerId + '')
      .set('subjectName', '');
    const configUrl = this.apiContext.host + this.apiTraining.searchSubject;
    this.http.get<Subject[]>(configUrl, {params: body}).toPromise().then(res => {
        console.log(res);
        this.subjects = res;
        console.log(this.subjects);
        this.isLoading = false;
      },
      error => {
        console.log(error);
        this.isLoading = false;
        // this.showMessage(false);
      });
  }

  // redirectToViewCourse() {
  //   this.router.navigate(['/Training-staff/view-course', this.programId]);
  // }


  redirectToAddCourse() {
    this.router.navigateByUrl('/Training-staff/add-course/' + this.programId);
  }

  redirectToViewCourse() {
    this.router.navigateByUrl('/Training-staff/view-course/' + this.programId);
  }

  // private showMessage(status: boolean) {
  //   let messageConfirm;
  //   if (status) {
  //     messageConfirm = 'A course was added successfully.' +
  //       '\nDo you want to add more courses?';
  //   } else {
  //     messageConfirm = 'Something go wrong.' +
  //       '\nDo you want to try again?';
  //   }
  //   const r = confirm(messageConfirm);
  //   if (r === true) {
  //     this.redirectToAddCourse();
  //   } else {
  //     this.redirectToViewCourse();
  //   }
  // }


  checkValidName() {
    if (this.courseName != null) {
      this.courseName = this.formatText(this.courseName);
    }
    if (this.courseName == null || this.courseName === '') {
      this.errorMsgName = 'Name is required.';
      return false;
    } else {
      this.errorMsgName = '';
      return true;
    }
  }

  checkValidImage() {
    if (this.image != null) {
      this.image = this.formatText(this.image);
    }
    if (this.image == null || this.image === '') {
      this.errorMsgImage = 'Image is required.';
      return false;
    } else {
      this.errorMsgImage = '';
      return true;
    }
  }

  checkValidFee() {
    if (this.Fee != null) {
      this.Fee = this.formatText(this.Fee);
    }
    if (this.Fee == null || this.Fee === '') {
      this.errorMsgFee = 'Fee is required.';
      return false;
    } else if (this.Fee.length > 9) {
      this.errorMsgFee = 'Fee must be smaller than 1.000.000.000.';
      return false;
    } else {
      this.errorMsgFee = '';
      return true;
    }
  }

  checkValidTotalSession() {
    if (this.totalSession != null) {
      this.totalSession = this.formatText(this.totalSession);
    }
    if (this.totalSession == null || this.totalSession === '') {
      this.errorMsgTotalSession = 'Total session is required.';
      return false;
    } else if (Number(this.totalSession) > 200) {
      this.errorMsgTotalSession = 'Total session must be smaller than 200.';
      return false;
    } else {
      this.errorMsgTotalSession = '';
      return true;
    }
  }

  checkValidSubject() {
    if (this.subjectId != null) {
      this.subjectId = this.formatText(this.subjectId);
    }
    if (this.subjectId == null || this.subjectId === '') {
      this.errorMsgSubject = 'Subject is required.';
      return false;
    } else {
      this.errorMsgSubject = '';
      return true;
    }
  }

  checkValidDescription() {
    if (this.Description != null) {
      this.Description = this.formatText(this.Description);
    }
    if (this.Description == null || this.Description === '') {
      this.errorMsgDescription = 'Description is required.';
      return false;
    } else {
      this.errorMsgDescription = '';
      return true;
    }
  }

  checkValidFields() {
    this.checkValidName();
    this.checkValidTotalSession();
    this.checkValidFee();
    this.checkValidSubject();
    this.checkValidImage();
    this.checkValidDescription();
    if (this.checkValidName() && this.checkValidTotalSession() && this.checkValidFee() && this.checkValidSubject() && this.checkValidImage() && this.checkValidDescription()) {
      this.addCourse();
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
