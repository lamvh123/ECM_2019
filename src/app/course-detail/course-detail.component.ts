import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpParams, HttpClient} from '@angular/common/http';
import {Subject} from '../subject';
import {Course} from '../course';
import {Building} from '../building';
import {Router} from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';


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

  constructor(private routers: Router, private route: ActivatedRoute, private http: HttpClient) {
  }

  Editor = ClassicEditor;

  courseModel: Course;
  courseId = '';
  subjects: Subject[];
  centerId = {
    Id: '',
    name: ''
  };

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
    this.getSubjectsWithCenterId();
    this.loadCourseById();
  }

  ngAfterViewInit() {
    // this.loadScript('/assets/bundles/libscripts.bundle.js');
    // this.loadScript('/assets/bundles/vendorscripts.bundle.js');
    // this.loadScript('/assets/bundles/mainscripts.bundle.js');
    // this.loadScript('/assets/bundles/morphingsearchscripts.bundle.js');

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
    const body = new HttpParams().set('courseId', this.courseId);
    // const body = new HttpParams().set('courseId', this.courseId)
    //   .set('CenterId', this.centerId.Id);
    const configUrl = 'https://educationcentermanagementapi-dev-as.azurewebsites.net/api/TrainingDept/GetCourseById';
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

      },
      error => {
        console.log(error);
      });
  }

  updateCourse() {
    console.log(this.courseModel);
    const configUrl = 'https://educationcentermanagementapi-dev-as.azurewebsites.net/api/TrainingDept/UpdateCourse';
    const url = 'https://educationcentermanagementapi-dev-as.azurewebsites.net/api/TrainingDept/GetCenter';
    this.http.get(url).toPromise().then(data => {
        const body = new HttpParams()
          .set('courseId', this.courseModel.Id + '')
          .set('CourseName', this.courseModel.Name)
          .set('Image', this.courseModel.Image)
          .set('SubjectId', this.courseModel.SubjectId + '')
          .set('TotalSession', this.courseModel.TotalSession)
          .set('Description', this.courseModel.Description)
          .set('Fee', this.courseModel.Fee + '')
          .set('CenterId', data['Id']);
        console.log(body);
        this.http.post<any>(configUrl, body).toPromise().then(
          res => {
            console.log(res);
            this.showMessage(true);
          },
          err => {
            console.log(err);
            this.showMessage(false);
          }
        );
      },
      error => {
        console.log(error);
        this.showMessage(false);
      });
  }

  onUploadCompleted($event: any) {
    this.courseModel.Image = $event.originalUrl;
  }

  selectedValueChanged(value: any) {
    this.courseModel.SubjectId = value;
  }

  getSubjectsWithCenterId() {
    const url = 'https://educationcentermanagementapi-dev-as.azurewebsites.net/api/TrainingDept/GetCenter';
    this.http.get(url).toPromise().then((data) => {
        console.log(data);
        this.centerId.Id = data['Id'];
        this.getAllSubjects();
      },
      error => {
        console.log(error);
        this.showMessage(false);
      });

  }

  getAllSubjects() {

    const body = new HttpParams()
      .set('centerId', this.centerId.Id + '')
      .set('subjectName', '');
    console.log(body);
    const configUrl = 'https://educationcentermanagementapi-dev-as.azurewebsites.net/api/TrainingDept/SearchSubject';
    this.http.get<Subject[]>(configUrl, {params: body}).toPromise().then(res => {
        console.log(res);
        this.subjects = res;
        console.log(this.subjects);
      },
      error => {
        console.log(error);
        this.showMessage(false);
      });
  }


  // redirectToProgram(programId: number) {
  //   this.routers.navigate(['/Training-staff/view-course', programId]);
  // }


  redirectToAllCourse() {
    this.routers.navigateByUrl('/Training-staff/view-course/' + this.courseModel.Program.Id);
  }

  redirectToUpdateCourse() {
    this.routers.navigateByUrl('/Training-staff/course-detail' + this.courseModel.Id);
  }

  private showMessage(status: boolean) {
    let messageConfirm;
    if (status) {
      messageConfirm = 'A course was updated successfully.' +
        '\nDo you want to update anything else?';
    } else {
      messageConfirm = 'Something go wrong.' +
        '\nDo you want to try again?';
    }
    const r = confirm(messageConfirm);
    if (r === true) {
      this.redirectToUpdateCourse();
    } else {
      this.redirectToAllCourse();
    }
  }
}
