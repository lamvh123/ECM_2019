import {AfterContentInit, AfterViewInit, Component, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';
import {Building} from '../building';
import {Subject} from '../subject';
import {APIContext, APITraining} from '../APIContext';

@Component({
  selector: 'app-view-subjects',
  templateUrl: './view-subjects.component.html',
  styleUrls: ['./view-subjects.component.css'
    , '../../assets/plugins/bootstrap/css/bootstrap.min.css'
    , '../../assets/css/main.css'
    , '../../assets/css/themes/all-themes.css']
})
export class ViewSubjectsComponent implements OnInit, AfterContentInit {

  constructor(private http: HttpClient, private router: Router) {
  }

  apiContext = new APIContext();
  apiTraining = new APITraining();
  subjects: Subject[];
  isLoading = true;

  ngOnInit() {
    this.getAllSubjects();
  }

  getAllSubjects() {
    this.isLoading = true;
    const body = new HttpParams()
      .set('centerId', this.apiContext.centerId + '')
      .set('subjectName', '');

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
      });
  }

  ngAfterContentInit(): void {
    this.isLoading = false;
  }

  // ngAfterViewInit() {
  //   // this.loadScript('../../assets/bundles/libscripts.bundle.js');
  //   // this.loadScript('../../assets/bundles/vendorscripts.bundle.js');
  //   // this.loadScript('../../assets/bundles/morphingsearchscripts.bundle.js');
  //   // this.loadScript('../../assets/bundles/mainscripts.bundle.js');
  // }

  public loadScript(url: string) {
    const body = <HTMLDivElement> document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }

}
