import {Component, OnInit, AfterViewInit} from '@angular/core';
import {HttpParams, HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Course} from '../course';
import {Program} from '../program';

@Component({
  selector: 'app-view-course',
  templateUrl: './view-course.component.html',
  styleUrls: ['./view-course.component.css'
    , '../../assets/plugins/bootstrap/css/bootstrap.min.css'
    , '../../assets/css/main.css'
    , '../../assets/css/themes/all-themes.css']
})
export class ViewCourseComponent implements OnInit, AfterViewInit {

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {
  }

  centerId;
  programId;
  courseName = '';
  ListOfCourse: Course[];
  currentProgram: Program;

  ngOnInit() {
    this.programId = this.route.snapshot.paramMap.get('id');
    this.loadProgramById(this.programId);
    this.getCourseWithCenterId();
    console.log(this.programId);
  }

  ngAfterViewInit() {
    this.loadScript('../../assets/bundles/libscripts.bundle.js');
    this.loadScript('../../assets/bundles/vendorscripts.bundle.js');
    this.loadScript('../../assets/bundles/morphingsearchscripts.bundle.js');
    this.loadScript('../../assets/bundles/mainscripts.bundle.js');
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

  loadProgramById(pId: number) {
    const body = new HttpParams().set('programId', this.programId);
    this.http.get<Program>('https://educationcentermanagementapi-dev-as.azurewebsites.net/api/TrainingDept/GetProgramById', {params: body}).toPromise().then(
      res => {
        console.log(res);
        this.currentProgram = res;
      },
      err => {
        console.log(err);
      }
    );
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

    const body = new HttpParams()
      .set('courseName', this.courseName.trim().toLowerCase())
      .set('programId', this.programId)
      .set('centerId', this.centerId + '');

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
