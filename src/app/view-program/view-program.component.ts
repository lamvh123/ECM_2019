import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Program } from '../program';
import { MenuBarComponent } from '../menu-bar/menu-bar.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-view-program',
  templateUrl: './view-program.component.html',
  styleUrls: ['./view-program.component.css', '../css/assets/css/main.css',
    '../css/assets/css/themes/all-themes.css']
})
export class ViewProgramComponent implements OnInit, AfterViewInit {

  constructor(private http: HttpClient,private router:Router) { }
  programs: Program[];
  
  programName = '';
  centerId = {
    Id: '',
    name: ''
  };
  ngOnInit() {
    this.getProgramWithCenterId();
  }
  getProgramWithCenterId() {
    const configUrl = 'https://educationcentermanagementapi-dev-as.azurewebsites.net/api/TrainingDept/SearchProgram';
    const url = "https://educationcentermanagementapi-dev-as.azurewebsites.net/api/TrainingDept/GetCenter";
    this.http.get(url).toPromise().then((data) => {
      this.centerId.Id = data["Id"];
      this.getAllProgram();
    },
      error => {
        console.log(error);
      });

  }
  getAllProgram() {

    const body = new HttpParams()
      .set('centerId', this.centerId.Id + '')
      .set('programName', '');

    const configUrl = 'https://educationcentermanagementapi-dev-as.azurewebsites.net/api/TrainingDept/SearchProgram';
    this.http.get<Program[]>(configUrl, { params: body }).toPromise().then(res => {
      console.log(res);
      this.programs = res;
      console.log(this.programs);
    },
      error => {
        console.log(error);
      });
  }

  ngAfterViewInit() {
    // this.loadScript('/assets/bundles/libscripts.bundle.js');
    // this.loadScript('/assets/bundles/vendorscripts.bundle.js');
    // this.loadScript('/assets/bundles/mainscripts.bundle.js');
    // this.loadScript('/assets/bundles/morphingsearchscripts.bundle.js');
    // this.loadScript('/assets/plugins/autosize/autosize.js');
    // this.loadScript('/assets/plugins/momentjs/moment.js');
    // this.loadScript('/assets/plugins/dropzone/dropzone.js');
    // // this.loadScript('/assets/plugins/bootstrap-material-datetimepicker/js/bootstrap-material-datetimepicker.js');
    // this.loadScript('/assets/js/pages/forms/basic-form-elements.js');
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

  searchProgramByName() {
    const configUrl = 'https://educationcentermanagementapi-dev-as.azurewebsites.net/api/TrainingDept/SearchProgram';
    const url = "https://educationcentermanagementapi-dev-as.azurewebsites.net/api/TrainingDept/GetCenter";
    this.http.get(url).toPromise().then((data) => {
      this.centerId.Id = data["Id"];
      const body = new HttpParams()
        .set('centerId', this.centerId.Id + '')
        .set('programName', this.programName);

      const configUrl = 'https://educationcentermanagementapi-dev-as.azurewebsites.net/api/TrainingDept/SearchProgram';
      this.http.get<Program[]>(configUrl, { params: body }).toPromise().then(res => {
        console.log(res);
        this.programs = res;
        console.log(this.programName);
      },
        error => {
          console.log(error);
        });
    },
      error => {
        console.log(error);
      });
  }

  selectProgram(program){
    this.router.navigate(['/Training-staff/view-course',program.Id]);
  }

  navigateToProgramDetail(program){
    this.router.navigate(['/Training-staff/program-detail',program.Id]);
  }

}
