import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Building} from '../building';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.css', '../css/assets/plugins/bootstrap/css/bootstrap.min.css',
    '../css/assets/css/main.css',
    '../css/assets/css/themes/all-themes.css']
})
export class AddRoomComponent implements OnInit {

  // tslint:disable-next-line:variable-name
  constructor(private _router: Router, private http: HttpClient, private route: ActivatedRoute) {
  }

  roomNumber: string;
  capacity: number;
  buildingId: number;

  buildings: Building[];
  centerId = {
    Id: '',
    name: ''
  };
  selectedName: string;

  ngOnInit() {
    this.getBuildingsWithCenterId();
  }

  public loadScript(url: string) {
    const body = document.body as HTMLDivElement;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }


  addRoom() {
    const configUrl = 'https://educationcentermanagementapi-dev-as.azurewebsites.net/api/TrainingDept/AddRoom';
    const url = 'https://educationcentermanagementapi-dev-as.azurewebsites.net/api/TrainingDept/GetCenter';
    this.http.get(url).toPromise().then(data => {
        const body = new HttpParams()
          .set('RoomNumber', this.roomNumber)
          .set('Capacity', String(this.capacity))
          .set('BuildingId', String(this.buildingId))
          .set('CenterId', data['Id']);
        this.http.post<any>(configUrl, body).toPromise().then(
          res => {
            console.log(res);
          },
          err => {
            console.log(err);
          }
        );
      },
      error => {
        console.log(error);
      });

  }




  getBuildingsWithCenterId() {
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

  selectedValueChanged(value: any) {
    this.buildingId = value;
    console.log(value);
  }
}
