import {AfterContentInit, AfterViewInit, Component, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Slot} from '../slot';
import {Program} from '../program';
import {APIContext, APITraining} from '../APIContext';

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

  apiContext = new APIContext();
  apiTraining = new APITraining();
  slotList: Slot[];

  ngOnInit() {
    this.getAllSlots();
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

  getAllSlots() {
    const body = new HttpParams()
      .set('centerId', this.apiContext.centerId + '');

    const configUrl = this.apiContext.host + this.apiTraining.getAllSlot;
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
