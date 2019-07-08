import {Component, OnInit, AfterViewInit} from '@angular/core';
import {HttpParams, HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Course} from '../course';

@Component({
  selector: 'app-view-course',
  templateUrl: './view-course.component.html',
  styleUrls: ['./view-course.component.css', '../css/assets/css/main.css',
    '../css/assets/css/themes/all-themes.css']
})
export class ViewCourseComponent implements OnInit, AfterViewInit {

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {
  }

  centerId;
  programId;
  courseName = '';
  ListOfCourse: Course[];

  ngOnInit() {
    this.programId = this.route.snapshot.paramMap.get('id');
    this.getCourseWithCenterId();
    console.log(this.programId);
  }

  ngAfterViewInit() {
    // this.loadScript('/assets/bundles/libscripts.bundle.js');
    // this.loadScript('/assets/bundles/vendorscripts.bundle.js');
    // this.loadScript('/assets/bundles/mainscripts.bundle.js');
    // // this.loadScript('/assets/bundles/morphingsearchscripts.bundle.js');
    // this.loadScript('/assets/plugins/autosize/autosize.js');
    // this.loadScript('/assets/plugins/momentjs/moment.js');
    // this.loadScript('/assets/plugins/dropzone/dropzone.js');
    // // this.loadScript('/assets/plugins/bootstrap-material-datetimepicker/js/bootstrap-material-datetimepicker.js');
    // this.loadScript('/assets/js/pages/forms/basic-form-elements.js');
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

  getCourseWithCenterId() {

    const url = 'https://educationcentermanagementapi-dev-as.azurewebsites.net/api/TrainingDept/GetCenter';
    this.http.get(url).toPromise().then((data) => {
        this.centerId = data['Id'];
        this.getAllCourse();
      },
      error => {
        console.log(error);
      });

  }

  getAllCourse() {

    const body = new HttpParams().set('courseName', this.courseName).set('programId', this.programId).set('centerId', this.centerId + '');

    const configUrl = 'https://educationcentermanagementapi-dev-as.azurewebsites.net/api/TrainingDept/SearchCourse';
    this.http.get<Course[]>(configUrl, {params: body}).toPromise().then(res => {
        this.ListOfCourse = res;
        console.log(this.ListOfCourse);
      },
      error => {
        console.log(error);
      });
  }

  redirectToAddCourse() {
    this.router.navigate(['/Training-staff/add-course', this.programId]);
  }

  navigateToViewCourseDetail(course) {
    this.router.navigate(['/Training-staff/course-detail', course.Id]);
  }

  navigateToSyllabus(course) {
    this.router.navigate(['/Training-staff/syllabus', course.Id]);
  }
}
