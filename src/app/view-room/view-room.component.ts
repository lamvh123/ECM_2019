import {AfterContentInit, AfterViewInit, Component, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';
import {Building} from '../building';
import {Room} from '../room';
import {APIContext, APITraining} from '../APIContext';

@Component({
  selector: 'app-view-room',
  templateUrl: './view-room.component.html',
  styleUrls: ['./view-room.component.css', '../../assets/plugins/bootstrap/css/bootstrap.min.css',
    '../../assets/plugins/jquery-datatable/dataTables.bootstrap4.min.css',
    '../../assets/css/main.css',
    '../../assets/css/themes/all-themes.css']
})
export class ViewRoomComponent implements OnInit, AfterContentInit {

  constructor(private http: HttpClient, private router: Router) {
  }

  apiContext = new APIContext();
  apiTraining = new APITraining();
  buildings: Building[] = [];
  rooms: Room[] = [];
  isLoading = true;

  ngOnInit() {
    this.getAllRooms();
  }

  getAllRooms() {
    this.isLoading = true;
    const body = new HttpParams()
      .set('centerId', this.apiContext.centerId + '')
      .set('roomNumber', '')
      .set('buildingId', '-1');

    const configUrl = this.apiContext.host + this.apiTraining.searchRoom;
    this.http.get<Room[]>(configUrl, {params: body}).toPromise().then(res => {
        console.log(res);
        this.rooms = res;
        console.log(this.rooms);
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
