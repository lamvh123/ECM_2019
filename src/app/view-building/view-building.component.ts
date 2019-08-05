import {AfterContentInit, AfterViewInit, Component, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';
import {Building} from '../building';
import {APIContext, APITraining} from '../APIContext';

@Component({
  selector: 'app-view-building',
  templateUrl: './view-building.component.html',
  styleUrls: ['./view-building.component.css'
    , '../../assets/plugins/bootstrap/css/bootstrap.min.css'
    , '../../assets/css/main.css'
    , '../../assets/css/themes/all-themes.css']
})
export class ViewBuildingComponent implements OnInit, AfterContentInit {

  constructor(private http: HttpClient, private router: Router) {
  }

  apiContext = new APIContext();
  apiTraining = new APITraining();
  buildings: Building[];
  isLoading = true;

  ngOnInit() {
    this.getAllBuildings();
  }

  getAllBuildings() {
    this.isLoading = true;
    const body = new HttpParams()
      .set('centerId', this.apiContext.centerId + '')
      .set('name', '')
      .set('address', '');

    const configUrl = this.apiContext.host + this.apiTraining.searchBuilding;
    this.http.get<Building[]>(configUrl, {params: body}).toPromise().then(res => {
        console.log(res);
        this.buildings = res;
        console.log(this.buildings);
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

  // searchProgramByName() {
  //   // const configUrl = 'https://educationcentermanagementapi-dev-as.azurewebsites.net/api/TrainingDept/SearchBuilding';
  //   const url = 'https://educationcentermanagementapi-dev-as.azurewebsites.net/api/TrainingDept/GetCenter';
  //   this.http.get(url).toPromise().then((data) => {
  //       this.centerId.Id = data['Id'];
  //       const body = new HttpParams()
  //         .set('centerId', this.centerId.Id + '')
  //         .set('programName', this.programName);
  //
  //       const configUrl = 'https://educationcentermanagementapi-dev-as.azurewebsites.net/api/TrainingDept/SearchBuilding';
  //       this.http.get<Building[]>(configUrl, {params: body}).toPromise().then(res => {
  //           console.log(res);
  //           this.programs = res;
  //           console.log(this.programName);
  //         },
  //         error => {
  //           console.log(error);
  //         });
  //     },
  //     error => {
  //       console.log(error);
  //     });
  // }

  // selectProgram(program) {
  //   this.router.navigate(['/Training-staff/view-course', program.Id]);
  // }
  //
  // navigateToProgramDetail(program) {
  //   this.router.navigate(['/Training-staff/program-detail', program.Id]);
  // }

}
