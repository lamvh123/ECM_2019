import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpParams, HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css', '../css/assets/css/main.css',
  '../css/assets/css/themes/all-themes.css', '../css/assets/plugins/bootstrap/css/bootstrap.min.css',
  '../css/assets/plugins/dropzone/dropzone.css', '../css/assets/plugins/bootstrap-material-datetimepicker/css/bootstrap-material-datetimepicker.css',
  '../css/assets/plugins/waitme/waitMe.css',
  '../css/assets/plugins/bootstrap-select/css/bootstrap-select.css']
})
export class AddCourseComponent implements OnInit,AfterViewInit {

  constructor(private _router: Router, private http: HttpClient,private route:ActivatedRoute) { }
  programId;
  courseName='';
  Image='';
  Fee='';
  StartDate;
  Description='';
  ngOnInit() {
    this.programId = this.route.snapshot.paramMap.get('id');
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
  ngAfterViewInit() {
    this.loadScript('/assets/bundles/libscripts.bundle.js');
    this.loadScript('/assets/bundles/vendorscripts.bundle.js');
    this.loadScript('/assets/bundles/mainscripts.bundle.js');
    this.loadScript('/assets/plugins/momentjs/moment.js');
    this.loadScript('/assets/js/TrainingDept/addcourse.js');
  }

  addCourse(){
    const configUrl = 'https://educationcentermanagementapi-dev-as.azurewebsites.net/api/TrainingDept/AddCourse';
    const url = "https://educationcentermanagementapi-dev-as.azurewebsites.net/api/TrainingDept/GetCenter";
    this.http.get(url).toPromise().then((data) => {
      const body = new HttpParams()
        .set('CourseName', this.courseName)
        .set('Image', this.Image)
        .set('Fee',this.Fee)
        .set('StartDate',this.StartDate)
        .set('Description',this.Description)
        .set('ProgramId',this.programId)
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
