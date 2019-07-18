import {AfterContentInit, AfterViewInit, Component, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Slot} from '../slot';
import {Program} from '../program';

@Component({
  selector: 'app-view-slot',
  templateUrl: './view-slot.component.html',
  styleUrls: ['./view-slot.component.css'
    , '../../assets/plugins/bootstrap/css/bootstrap.min.css'
    , '../../assets/css/main.css'
    , '../../assets/css/themes/all-themes.css']
})
export class ViewSlotComponent implements OnInit, AfterViewInit {

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {
  }

  centerId;
  slotList: Slot[];

  ngOnInit() {
    // this.programId = this.route.snapshot.paramMap.get('id');
    // this.loadProgramById(this.programId);
    this.getCourseWithCenterId();
    // console.log(this.programId);
  }

  ngAfterViewInit() {
    // this.loadScript('../../assets/bundles/libscripts.bundle.js');
    // this.loadScript('../../assets/bundles/vendorscripts.bundle.js');
    // this.loadScript('../../assets/bundles/morphingsearchscripts.bundle.js');
    // this.loadScript('../../assets/bundles/mainscripts.bundle.js');
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
        this.getAllSlots();
      },
      error => {
        console.log(error);
      });

  }

  getAllSlots() {

    const body = new HttpParams()
      .set('centerId', this.centerId + '');

    const configUrl = 'https://educationcentermanagementapi-dev-as.azurewebsites.net/api/TrainingDept/GetAllSlot';
    this.http.get<Slot[]>(configUrl, {params: body}).toPromise().then(res => {
        console.log(res);
        this.slotList = res;
        console.log(this.slotList);
      },
      error => {
        console.log(error);
      });
  }

  // redirectToAddCourse() {
  //   this.router.navigate(['/Training-staff/add-course', this.programId]);
  // }
  //
  // navigateToViewCourseDetail(course) {
  //   this.router.navigate(['/Training-staff/course-detail', course.Id]);
  // }
  //
  // navigateToSyllabus(course) {
  //   this.router.navigate(['/Training-staff/syllabus', course.Id]);
  // }
}
