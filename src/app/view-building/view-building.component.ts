import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';
import {Building} from '../building';

@Component({
  selector: 'app-view-building',
  templateUrl: './view-building.component.html',
  styleUrls: ['./view-building.component.css', '../css/assets/plugins/bootstrap/css/bootstrap.min.css',
    '../css/assets/plugins/jquery-datatable/dataTables.bootstrap4.min.css',
    '../css/assets/css/main.css',
    '../css/assets/css/themes/all-themes.css']
})
export class ViewBuildingComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) {
  }

  buildings: Building[];
  centerId = {
    Id: '',
    name: ''
  };

  ngOnInit() {
    this.getProgramWithCenterId();
  }

  getProgramWithCenterId() {
    const url = 'https://educationcentermanagementapi-dev-as.azurewebsites.net/api/TrainingDept/GetCenter';
    this.http.get(url).toPromise().then((data) => {
        this.centerId.Id = data['Id'];
        this.getAllBuildings();
      },
      error => {
        console.log(error);
      });

  }

  getAllBuildings() {

    const body = new HttpParams()
      .set('centerId', this.centerId.Id + '')
      .set('name', '')
      .set('address', '');

    const configUrl = 'https://educationcentermanagementapi-dev-as.azurewebsites.net/api/TrainingDept/SearchBuilding';
    this.http.get<Building[]>(configUrl, {params: body}).toPromise().then(res => {
        console.log(res);
        this.buildings = res;
        console.log(this.buildings);
      },
      error => {
        console.log(error);
      });
  }

  ngAfterViewInit() {
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
