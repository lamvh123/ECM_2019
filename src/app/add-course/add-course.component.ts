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
  totalSession: '';
  subjectId = '';
  subjects: Subject[];

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
    const configUrl = this.apiContext + this.apiTraining.addCourse;
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
}
