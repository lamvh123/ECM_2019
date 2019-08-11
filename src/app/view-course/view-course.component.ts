import {Component, OnInit, AfterViewInit, AfterContentInit} from '@angular/core';
import {HttpParams, HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Course} from '../course';
import {Program} from '../program';
import {APIContext, APITraining} from '../APIContext';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-view-course',
  templateUrl: './view-course.component.html',
  styleUrls: ['./view-course.component.css'
    , '../../assets/plugins/bootstrap/css/bootstrap.min.css'
    , '../../assets/css/main.css'
    , '../../assets/css/themes/all-themes.css']
})
export class ViewCourseComponent implements OnInit, AfterViewInit {

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, private toastr: ToastrService) {
  }

  apiContext = new APIContext();
  apiTraining = new APITraining();
  centerId: number;

  programId;
  courseName = '';
  ListOfCourse: Course[];
  currentProgram: Program;
  isLoading = true;

  ngOnInit() {
    this.isLoading = true;
    this.programId = this.route.snapshot.paramMap.get('id');
    const urlGetCenterId = this.apiContext.host + this.apiTraining.getCenter;
    this.http.get(urlGetCenterId).toPromise().then(data => {
      this.centerId = data['Id'];
      this.loadProgramById(this.programId);
      this.getAllCourse();
      this.isLoading = false;
    });
    console.log(this.programId);
    this.isLoading = false;
  }

  ngAfterViewInit() {
    // this.loadScript('../../assets/bundles/libscripts.bundle.js');
    // this.loadScript('../../assets/bundles/vendorscripts.bundle.js');
    // this.loadScript('../../assets/bundles/morphingsearchscripts.bundle.js');
    // this.loadScript('../../assets/bundles/mainscripts.bundle.js');
    this.isLoading = false;
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
    this.isLoading = true;
    const body = new HttpParams().set('programId', this.programId);
    this.http.get<Program>(this.apiContext.host + this.apiTraining.getProgramByProgramId, {params: body}).toPromise().then(
      res => {
        console.log(res);
        this.currentProgram = res;

        this.isLoading = false;
      },
      err => {
        console.log(err);
        this.isLoading = false;
        this.toastr.info('Something is not working right. Please try again soon.');
      }
    );
  }

  getAllCourse() {
    this.isLoading = true;
    const body = new HttpParams()
      .set('courseName', this.courseName.trim().toLowerCase())
      .set('programId', this.programId)
      .set('centerId', this.centerId + '');

    const configUrl = this.apiContext.host + this.apiTraining.searchCourse;
    this.http.get<Course[]>(configUrl, {params: body}).toPromise().then(res => {
        this.ListOfCourse = res;
        console.log(this.ListOfCourse);
        this.isLoading = false;
      },
      error => {
        console.log(error);
        this.isLoading = false;
        this.toastr.info('Something is not working right. Please try again soon.');
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
