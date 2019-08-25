import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpParams, HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Subject} from '../subject';
import {Course} from '../course';
import {Building} from '../building';
import {Router} from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {APIContext, APITraining} from '../APIContext';
import {ToastrService} from 'ngx-toastr';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UrlTraining} from '../SiteUrlContext';
import {MenuBarComponent} from '../menu-bar/menu-bar.component';


@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css'
    , '../../assets/plugins/bootstrap/css/bootstrap.min.css'
    , '../../assets/plugins/dropzone/dropzone.css'
    , '../../assets/plugins/bootstrap-material-datetimepicker/css/bootstrap-material-datetimepicker.css'
    , '../../assets/plugins/waitme/waitMe.css'
    , '../../assets/plugins/bootstrap-select/css/bootstrap-select.css'
    , '../../assets/css/main.css'
    , '../../assets/css/themes/all-themes.css']
})
export class CourseDetailComponent implements OnInit, AfterViewInit {

  constructor(private routers: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: ToastrService, private modalService: NgbModal) {
  }

  apiContext = new APIContext();
  apiTraining = new APITraining();
  centerId: number;
  urlTraining = new UrlTraining();

  Editor = ClassicEditor;

  courseModel: Course;
  courseId = '';
  subjects: Subject[];

  errorMsgName = '';
  errorMsgImage = '';
  errorMsgFee = '';
  errorMsgTotalSession = '';
  errorMsgSubject = '';
  errorMsgDescription = '';
  isLoading = true;


  public onReady(editor) {
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    );
  }

  // end text editor

  ngOnInit() {
    this.courseId = this.route.snapshot.paramMap.get('id');
    console.log(this.courseId);
    const urlGetCenterId = this.apiContext.host + this.apiTraining.getCenter;
    this.http.get(urlGetCenterId).toPromise().then(data => {
      this.centerId = data['Id'];
      this.getAllSubjects();
      this.loadCourseById();
    });
  }

  ngAfterViewInit() {
    // this.loadScript('/assets/bundles/libscripts.bundle.js');
    // this.loadScript('/assets/bundles/vendorscripts.bundle.js');
    // this.loadScript('/assets/bundles/mainscripts.bundle.js');
    // this.loadScript('/assets/bundles/morphingsearchscripts.bundle.js');
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

  public loadScript(url: string) {
    const body = <HTMLDivElement> document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }

  loadCourseById() {
    this.isLoading = true;
    const body = new HttpParams().set('courseId', this.courseId);
    // const body = new HttpParams().set('courseId', this.courseId)
    //   .set('CenterId', this.centerId.Id);
    const configUrl = this.apiContext.host + this.apiTraining.getCourseByCourseId;
    this.http.get<Course>(configUrl, {params: body}).toPromise().then(res => {
        console.log(res);
        this.courseModel = res;
        if (this.courseModel.Subject != null) {
          this.courseModel.SubjectId = this.courseModel.Subject.Id + '';
        }
        // this.courseName = res.Name;
        // this.Image = res.Image;
        // this.Fee = res.Fee;
        // this.StartDate = res.StartDate.substring(0, 10);
        // this.Description = res.Description;

        this.isLoading = false;
      },
      error => {
        console.log(error);
        this.isLoading = false;
      });
  }

  updateCourse() {
    this.isLoading = true;
    console.log(this.courseModel);
    const configUrl = this.apiContext.host + this.apiTraining.updateCourse;
    const body = new HttpParams()
      .set('courseId', this.courseModel.Id + '')
      .set('CourseName', this.courseModel.Name)
      .set('Image', this.courseModel.Image)
      .set('SubjectId', this.courseModel.SubjectId + '')
      .set('TotalSession', this.courseModel.TotalSession)
      .set('Description', this.courseModel.Description)
      .set('Fee', this.courseModel.Fee + '')
      .set('CenterId', this.centerId + '');
    console.log(body);
    this.http.post<any>(configUrl, body).toPromise().then(
      res => {
        console.log(res);
        // this.showMessage(true);
        this.isLoading = false;
        this.toastr.success('Course ' + this.courseModel.Name + ' was updated successfully.', 'Success!');
        this.redirectToAllCourse();
      },
      err => {
        console.log(err);
        this.isLoading = false;
        this.toastr.error('Something goes wrong. Please try again.', 'Oops!');
        // this.showMessage(false);
      }
    );
  }

  onUploadCompleted($event: any) {
    this.courseModel.Image = $event.originalUrl;
  }

  selectedValueChanged(value: any) {
    this.courseModel.SubjectId = value;
  }

  getAllSubjects() {
    this.isLoading = true;
    const body = new HttpParams()
      .set('centerId', this.centerId + '')
      .set('subjectName', '');
    console.log(body);
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
        this.toastr.info('Something is not working right. Please try again soon.');
        // this.showMessage(false);
      });
  }


  redirectToAllCourse() {
    MenuBarComponent.currentUrl = this.urlTraining.viewCourse;
    this.routers.navigateByUrl(this.urlTraining.viewCourse + '/' + this.courseModel.Program.Id);
  }


  checkValidName() {
    if (this.courseModel.Name != null) {
      this.courseModel.Name = this.formatText(this.courseModel.Name);
    }
    if (this.courseModel.Name == null || this.courseModel.Name === '') {
      this.errorMsgName = 'Name is required.';
      return false;
    } else {
      this.errorMsgName = '';
      return true;
    }
  }

  checkValidImage() {
    if (this.courseModel.Image != null) {
      this.courseModel.Image = this.formatText(this.courseModel.Image);
    }
    if (this.courseModel.Image == null || this.courseModel.Image === '') {
      this.errorMsgImage = 'Image is required.';
      return false;
    } else {
      this.errorMsgImage = '';
      return true;
    }
  }

  checkValidFee() {
    if (this.courseModel.Fee != null) {
      this.courseModel.Fee = this.formatText(this.courseModel.Fee + '');
    }
    if (this.courseModel.Fee == null || this.courseModel.Fee === '') {
      this.errorMsgFee = 'Fee is required.';
      return false;
    } else if ((this.courseModel.Fee + '').length > 9) {
      this.errorMsgFee = 'Fee must be smaller than 1.000.000.000.';
      return false;
    } else {
      this.errorMsgFee = '';
      return true;
    }
  }

  checkValidTotalSession() {
    if (this.courseModel.TotalSession != null) {
      this.courseModel.TotalSession = this.formatText(this.courseModel.TotalSession + '');
    }
    if (this.courseModel.TotalSession == null || this.courseModel.TotalSession === '') {
      this.errorMsgTotalSession = 'Total session is required.';
      return false;
    } else if (Number(this.courseModel.TotalSession) > 200) {
      this.errorMsgTotalSession = 'Total session must be smaller than 200.';
      return false;
    } else {
      this.errorMsgTotalSession = '';
      return true;
    }
  }

  checkValidSubject() {
    if (this.courseModel.SubjectId != null) {
      this.courseModel.SubjectId = this.formatText(this.courseModel.SubjectId);
    }
    if (this.courseModel.SubjectId == null || this.courseModel.SubjectId === '') {
      this.errorMsgSubject = 'Subject is required.';
      return false;
    } else {
      this.errorMsgSubject = '';
      return true;
    }
  }

  checkValidDescription() {
    if (this.courseModel.Description != null) {
      this.courseModel.Description = this.formatText(this.courseModel.Description);
    }
    if (this.courseModel.Description == null || this.courseModel.Description === '') {
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
      this.updateCourse();
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

  openAttendanceForm(deleteModal) {
    console.log(this.modalService);
    this.modalService.open(deleteModal, {size: 'lg'});
  }

  deleteCourse() {
    this.isLoading = true;
    const param = new HttpParams()
      .set('CourseId', this.courseId + '')
      .set('CenterId', this.centerId + '');
    const url = this.apiContext.host + this.apiTraining.deleteCourse;
    this.http.post(url, param).toPromise().then(data => {
        console.log(data);
        this.isLoading = false;
        this.toastr.success('Delete course ' + this.courseModel.Name + ' successfully.', 'Success!');
        this.redirectToAllCourse();
      },
      error => {
        console.log(error);
        this.isLoading = false;
        if (error instanceof HttpErrorResponse && error.status === 406) {
          console.log(error.status);
          this.toastr.error(error.error, 'Oops!');
        } else {
          this.toastr.error('Something goes wrong. Please try again.', 'Oops!');
        }
      });
  }
}
