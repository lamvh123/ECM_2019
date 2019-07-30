import {Component, OnInit, AfterViewInit, Inject} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {Program} from '../program';
import {MenuBarComponent} from '../menu-bar/menu-bar.component';
import {Router} from '@angular/router';
import {APIContext, APITraining} from '../APIContext';

@Component({
  selector: 'app-view-program',
  templateUrl: './view-program.component.html',
  styleUrls: ['./view-program.component.css'
    , '../../assets/plugins/bootstrap/css/bootstrap.min.css'
    , '../../assets/css/main.css'
    , '../../assets/css/themes/all-themes.css']
  // styleUrls: ['./view-program.component.css', '../css/assets/css/main.css',
  //   '../css/assets/css/themes/all-themes.css']
})
export class ViewProgramComponent implements OnInit, AfterViewInit {

  constructor(private http: HttpClient, private router: Router) {
  }

  apiContext = new APIContext();
  apiTraining = new APITraining();
  programs: Program[];

  programName = '';

  ngOnInit() {
    this.getAllProgram();
  }

  getAllProgram() {
    const body = new HttpParams()
      .set('centerId', this.apiContext.centerId + '')
      .set('programName', '');

    const configUrl = this.apiContext.host + this.apiTraining.searchProgram;
    this.http.get<Program[]>(configUrl, {params: body}).toPromise().then(res => {
        console.log(res);
        this.programs = res;
        console.log(this.programs);
      },
      error => {
        console.log(error);
      });
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

  searchProgramByName() {
    const body = new HttpParams()
      .set('centerId', this.apiContext.centerId + '')
      .set('programName', this.programName.trim().toLowerCase());

    const configUrl = this.apiContext.host + this.apiTraining.searchProgram;
    this.http.get<Program[]>(configUrl, {params: body}).toPromise().then(res => {
        console.log(res);
        this.programs = res;
        console.log(this.programName);
      },
      error => {
        console.log(error);
      });
  }

  selectProgram(program) {
    this.router.navigate(['/Training-staff/view-course', program.Id]);
  }

  navigateToProgramDetail(program) {
    this.router.navigate(['/Training-staff/program-detail', program.Id]);
  }

}
