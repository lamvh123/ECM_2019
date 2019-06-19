import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Course } from '../course';


@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css', '../css/assets/css/main.css',
    '../css/assets/css/themes/all-themes.css', '../css/assets/plugins/bootstrap/css/bootstrap.min.css',
    '../css/assets/plugins/dropzone/dropzone.css', '../css/assets/plugins/bootstrap-material-datetimepicker/css/bootstrap-material-datetimepicker.css',
    '../css/assets/plugins/waitme/waitMe.css',
    '../css/assets/plugins/bootstrap-select/css/bootstrap-select.css']
})
export class CourseDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute, private http: HttpClient) { }
  courseName = '';
  Image = '';
  Fee = '';
  StartDate;
  Description = '';
  courseId;
  ngOnInit() {
    this.courseId = this.route.snapshot.paramMap.get('id');
    console.log(this.courseId);
    this.loadCourseById();
  }
  ngAfterViewInit() {
    // this.loadScript('/assets/bundles/libscripts.bundle.js');
    // this.loadScript('/assets/bundles/vendorscripts.bundle.js');
    // this.loadScript('/assets/bundles/mainscripts.bundle.js');
    // this.loadScript('/assets/bundles/morphingsearchscripts.bundle.js');

  }

  public loadScript(url: string) {
    const body = <HTMLDivElement>document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }

  loadCourseById() {
    const body = new HttpParams().set('courseId', this.courseId);
    const configUrl = 'https://educationcentermanagementapi-dev-as.azurewebsites.net/api/TrainingDept/GetCourseById';
    this.http.get<any>(configUrl, { params: body }).toPromise().then(res => {
      console.log(res);
      this.courseName = res.Name;
      this.Image = res.Image;
      this.Fee = res.Fee;
      this.StartDate = res.StartDate.substring(0, 10);
      this.Description = res.Description;

    },
      error => {
        console.log(error);
      });
  }

  updateCourse() {
    const configUrl = 'https://educationcentermanagementapi-dev-as.azurewebsites.net/api/TrainingDept/UpdateCourse';
    const url = "https://educationcentermanagementapi-dev-as.azurewebsites.net/api/TrainingDept/GetCenter";
    this.http.get(url).toPromise().then((data) => {
      const body = new HttpParams()
        .set('courseId', this.courseId)
        .set('CourseName', this.courseName)
        .set('StartDate', this.StartDate)
        .set('Image', this.Image)
        .set('Description', this.Description)
        .set('Fee', this.Fee)
        .set('CenterId', data["Id"]);
      this.http.post<any>(configUrl, body).toPromise().then(
        res => {
          console.log(res);
        },
        err => {
          console.log(err);
        }
      );
    },
      error => {
        console.log(error);
      });

  }

}
