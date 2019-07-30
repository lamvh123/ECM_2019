import {Component, OnInit, AfterViewInit} from '@angular/core';
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
export class AddCourseComponent implements OnInit, AfterViewInit {
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

  ngAfterViewInit() {
    // this.loadScript('/assets/bundles/libscripts.bundle.js');
    // this.loadScript('/assets/bundles/vendorscripts.bundle.js');
    // this.loadScript('/assets/bundles/mainscripts.bundle.js');
    // this.loadScript('/assets/plugins/momentjs/moment.js');
    // this.loadScript('/assets/js/TrainingDept/addcourse.js');
  }

  addCourse() {
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
    const body = new HttpParams()
      .set('centerId', this.apiContext.centerId + '')
      .set('subjectName', '');
    const configUrl = this.apiContext.host + this.apiTraining.searchSubject;
    this.http.get<Subject[]>(configUrl, {params: body}).toPromise().then(res => {
        console.log(res);
        this.subjects = res;
        console.log(this.subjects);
      },
      error => {
        console.log(error);
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
      this.courseName = this.courseName.trim();
    }
    if (this.courseName == null || this.courseName === '') {
      this.errorMsgName = 'Name is required.';
    } else {
      this.errorMsgName = '';
    }
  }

  checkValidImage() {
    if (this.image != null) {
      this.image = this.image.trim();
    }
    if (this.image == null || this.image === '') {
      this.errorMsgImage = 'Image is required.';
    } else {
      this.errorMsgImage = '';
    }
  }

  checkValidFee() {
    if (this.Fee != null) {
      this.Fee = this.Fee.trim();
    }
    if (this.Fee == null || this.Fee === '') {
      this.errorMsgFee = 'Fee is required.';
    } else if (this.Fee.length > 9) {
      this.errorMsgFee = 'Fee must be smaller than 1.000.000.000.';
    } else {
      this.errorMsgFee = '';
    }
  }

  checkValidTotalSession() {
    if (this.totalSession != null) {
      this.totalSession = this.totalSession.trim();
    }
    if (this.totalSession == null || this.totalSession === '') {
      this.errorMsgTotalSession = 'Total session is required.';
    } else if (Number(this.totalSession) > 200) {
      this.errorMsgTotalSession = 'Total session must be smaller than 200.';
    } else {
      this.errorMsgTotalSession = '';
    }
  }

  checkValidSubject() {
    if (this.subjectId != null) {
      this.subjectId = this.subjectId.trim();
    }
    if (this.subjectId == null || this.subjectId === '') {
      this.errorMsgSubject = 'Subject is required.';
    } else {
      this.errorMsgSubject = '';
    }
  }

  checkValidDescription() {
    if (this.Description != null) {
      this.Description = this.Description.trim();
    }
    if (this.Description == null || this.Description === '') {
      this.errorMsgDescription = 'Description is required.';
    } else {
      this.errorMsgDescription = '';
    }
  }

  checkValidFields() {
    if (this.errorMsgName.length !== 0 || this.errorMsgImage.length !== 0 || this.errorMsgFee.length !== 0
      || this.errorMsgTotalSession.length !== 0 || this.errorMsgSubject.length !== 0 || this.errorMsgDescription.length !== 0) {
      return false;
    }
    return true;
  }

  isInputNumber(evt) {
    const c = String.fromCharCode(evt.which);
    if (!(/[0-9]/.test(c))) {
      evt.preventDefault();
    }
  }

  verifyAllFields() {
    this.checkValidName();
    this.checkValidTotalSession();
    this.checkValidFee();
    this.checkValidSubject();
    this.checkValidImage();
    this.checkValidDescription();
  }
}
