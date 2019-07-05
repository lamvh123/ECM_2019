import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';
import {Building} from '../building';
import {Room} from '../room';

@Component({
  selector: 'app-view-room',
  templateUrl: './view-room.component.html',
  styleUrls: ['./view-room.component.css', '../css/assets/plugins/bootstrap/css/bootstrap.min.css',
    '../css/assets/plugins/jquery-datatable/dataTables.bootstrap4.min.css',
    '../css/assets/css/main.css',
    '../css/assets/css/themes/all-themes.css']
})
export class ViewRoomComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) {
  }

  buildings: Building[] = [];
  rooms: Room[] = [];
  centerId = {
    Id: '',
    name: ''
  };

  ngOnInit() {
    this.getRoomWithCenterId();
  }

  getRoomWithCenterId() {
    const url = 'https://educationcentermanagementapi-dev-as.azurewebsites.net/api/TrainingDept/GetCenter';
    this.http.get(url).toPromise().then((data) => {
        this.centerId.Id = data['Id'];
        this.getAllRooms();
      },
      error => {
        console.log(error);
      });

  }

  getAllRooms() {

    const body = new HttpParams()
      .set('centerId', this.centerId.Id + '')
      .set('roomNumber', '')
      .set('buildingId', '-1');

    const configUrl = 'https://educationcentermanagementapi-dev-as.azurewebsites.net/api/TrainingDept/SearchRoom';
    this.http.get<Room[]>(configUrl, {params: body}).toPromise().then(res => {
        console.log(res);
        this.rooms = res;
        console.log(this.rooms);
        this.getAvailbleBuildings();
      },
      error => {
        console.log(error);
      });
  }

  getAvailbleBuildings() {
    for (const r of this.rooms) {
      if (r.Building.$ref == null) {
        this.buildings.push(r.Building);
      }
    }
    console.log(this.buildings);
  }

  ngAfterViewInit() {

  }

  getBuildingById(id: number) {
    for (const b of this.buildings) {
      if (b.$id === id) {
        return b;
      }
    }
    return null;
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
