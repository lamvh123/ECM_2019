import {Component, OnInit, AfterViewInit, Inject, AfterContentInit} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {Program} from '../program';
import {MenuBarComponent} from '../menu-bar/menu-bar.component';
import {ActivatedRoute, Router} from '@angular/router';
import {APIContext, APITraining} from '../APIContext';
import {ToastrService} from 'ngx-toastr';

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

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) {
  }

  apiContext = new APIContext();
  apiTraining = new APITraining();
  centerId: number;

  programs: Program[];

  programName = '';
  isLoading = true;

  ngOnInit() {
    const urlGetCenterId = this.apiContext.host + this.apiTraining.getCenter;
    this.http.get(urlGetCenterId).toPromise().then(data => {
      this.centerId = data['Id'];
      this.getAllProgram();
    });
  }

  getAllProgram() {
    this.isLoading = true;
    const body = new HttpParams()
      .set('centerId', this.centerId + '')
      .set('programName', '');

    const configUrl = this.apiContext.host + this.apiTraining.searchProgram;
    this.http.get<Program[]>(configUrl, {params: body}).toPromise().then(res => {
        console.log(res);
        this.programs = res;
        console.log(this.programs);
        this.isLoading = false;
      },
      error => {
        console.log(error);
        this.isLoading = false;
        this.toastr.info('Something is not working right. Please try again soon.');
      });
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

  searchProgramByName() {
    this.isLoading = true;
    const body = new HttpParams()
      .set('centerId', this.centerId + '')
      .set('programName', this.programName.trim().toLowerCase());

    const configUrl = this.apiContext.host + this.apiTraining.searchProgram;
    this.http.get<Program[]>(configUrl, {params: body}).toPromise().then(res => {
        console.log(res);
        this.programs = res;
        console.log(this.programName);
        this.isLoading = false;
      },
      error => {
        console.log(error);
        this.isLoading = false;
        this.toastr.info('Something is not working right. Please try again soon.');
      });
  }

  selectProgram(program) {
    this.router.navigate(['/Training-staff/view-course', program.Id]);
  }

  navigateToProgramDetail(program) {
    this.router.navigate(['/Training-staff/program-detail', program.Id]);
  }

}
