import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Building} from '../building';
import {APIContext, APITraining} from '../APIContext';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.css'
    , '../../assets/plugins/bootstrap/css/bootstrap.min.css'
    , '../../assets/plugins/dropzone/dropzone.css'
    , '../../assets/plugins/bootstrap-material-datetimepicker/css/bootstrap-material-datetimepicker.css'
    , '../../assets/plugins/waitme/waitMe.css'
    , '../../assets/plugins/bootstrap-select/css/bootstrap-select.css'
    , '../../assets/css/main.css'
    , '../../assets/css/themes/all-themes.css']
})
export class AddRoomComponent implements OnInit {

  // tslint:disable-next-line:variable-name
  constructor(private _router: Router, private http: HttpClient, private route: ActivatedRoute) {
  }

  apiContext = new APIContext();
  apiTraining = new APITraining();

  roomNumber: string;
  capacity: number;
  buildingId: number;

  buildings: Building[];
  selectedName: string;

  ngOnInit() {
    this.getAllBuildings();
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
    const configUrl = this.apiContext.host + this.apiTraining.addRoom;
    const body = new HttpParams()
      .set('RoomNumber', this.roomNumber)
      .set('Capacity', String(this.capacity))
      .set('BuildingId', String(this.buildingId))
      .set('CenterId', this.apiContext.centerId + '');
    this.http.post<any>(configUrl, body).toPromise().then(
      res => {
        console.log(res);
        // this.showMessage(true);
        this.redirectToAllRoom();
      },
      err => {
        console.log(err);
        // this.showMessage(false);
      }
    );
  }

  getAllBuildings() {
    const body = new HttpParams()
      .set('centerId', this.apiContext.centerId + '')
      .set('name', '')
      .set('address', '');

    const configUrl = this.apiContext.host + this.apiTraining.searchBuilding;
    this.http.get<Building[]>(configUrl, {params: body}).toPromise().then(res => {
        console.log(res);
        this.buildings = res;
        console.log(this.buildings);
      },
      error => {
        console.log(error);
        // this.showMessage(false);
      });
  }

  selectedValueChanged(value: any) {
    this.buildingId = value;
    console.log(value);
  }


  redirectToAllRoom() {
    this._router.navigateByUrl('/Training-staff/view-room');
  }

  redirectToAddRoom() {
    this._router.navigateByUrl('/Training-staff/add-room');
  }

  // private showMessage(status: boolean) {
  //   let messageConfirm;
  //   if (status) {
  //     messageConfirm = 'A room was added successfully.' +
  //       '\nDo you want to add more rooms?';
  //   } else {
  //     messageConfirm = 'Something go wrong.' +
  //       '\nDo you want to try again?';
  //   }
  //   const r = confirm(messageConfirm);
  //   if (r === true) {
  //     this.redirectToAddRoom();
  //   } else {
  //     this.redirectToAllRoom();
  //   }
  // }
}
