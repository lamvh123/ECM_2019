import {AfterContentInit, AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Building} from '../building';
import {APIContext, APITraining} from '../APIContext';
import {ToastrService} from 'ngx-toastr';
import {UrlTraining} from '../SiteUrlContext';
import {MenuBarComponent} from '../menu-bar/menu-bar.component';

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
export class AddRoomComponent implements OnInit, AfterViewInit {

  // tslint:disable-next-line:variable-name
  constructor(private _router: Router, private http: HttpClient, private route: ActivatedRoute, private toastr: ToastrService) {
  }

  apiContext = new APIContext();
  apiTraining = new APITraining();
  centerId: number;
  urlTraining = new UrlTraining();

  roomNumber: string;
  capacity: string;
  buildingId: string;

  buildings: Building[];
  selectedName: string;


  errorMsgName = '-';
  errorMsgCapacity = '-';
  errorMsgBuilding = '-';
  isLoading = true;

  ngOnInit() {
    const urlGetCenterId = this.apiContext.host + this.apiTraining.getCenter;
    this.http.get(urlGetCenterId).toPromise().then(data => {
      this.centerId = data['Id'];
      this.getAllBuildings();
    });
  }

  ngAfterViewInit(): void {
    this.triggerEnterForm('formAdd', 'btnAdd');
    this.isLoading = false;
  }

  triggerEnterForm(formId: string, btnId: string) {
    const signInForm = document.getElementById(formId);
    signInForm.addEventListener('keyup', function(event) {
      if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById(btnId).click();
      }
    });
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
    this.isLoading = true;
    const configUrl = this.apiContext.host + this.apiTraining.addRoom;
    const body = new HttpParams()
      .set('RoomNumber', this.roomNumber)
      .set('Capacity', this.capacity)
      .set('BuildingId', this.buildingId)
      .set('CenterId', this.centerId + '');
    this.http.post<any>(configUrl, body).toPromise().then(
      res => {
        console.log(res);
        // this.showMessage(true);
        this.isLoading = false;
        this.toastr.success('Room ' + this.roomNumber + ' was added successfully.', 'Success!');
        this.redirectToAllRoom();
      },
      err => {
        console.log(err);
        this.isLoading = false;
        this.toastr.error('Something goes wrong. Please try again.', 'Oops!');
        // this.showMessage(false);
      }
    );
  }

  getAllBuildings() {
    this.isLoading = true;
    const body = new HttpParams()
      .set('centerId', this.centerId + '')
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
        this.toastr.info('Something is not working right. Please try again soon.');
        // this.showMessage(false);
      });
  }

  selectedValueChanged(value: any) {
    this.buildingId = value;
    console.log(value);
  }


  redirectToAllRoom() {
    MenuBarComponent.currentUrl = this.urlTraining.viewRoom;
    this._router.navigateByUrl(this.urlTraining.viewRoom);
  }

  checkValidName() {
    if (this.roomNumber != null) {
      this.roomNumber = this.formatText(this.roomNumber);
    }
    if (this.roomNumber == null || this.roomNumber === '') {
      this.errorMsgName = 'Name is required.';
      return false;
    } else {
      this.errorMsgName = '';
      return true;
    }
  }


  checkValidCapacity() {
    if (this.capacity != null) {
      this.capacity = this.formatText(this.capacity);
    }
    if (this.capacity == null || this.capacity === '') {
      this.errorMsgCapacity = 'Capacity is required.';
      return false;
    } else if (this.capacity.length > 9) {
      this.errorMsgCapacity = 'Capacity must be smaller than 1.000.000.000.';
      return false;
    } else {
      this.errorMsgCapacity = '';
      return true;
    }
  }

  checkValidBuilding() {
    if (this.buildingId != null) {
      this.buildingId = this.formatText(this.buildingId);
    }
    if (this.buildingId == null || this.buildingId === '') {
      this.errorMsgBuilding = 'Building is required.';
      return false;
    } else {
      this.errorMsgBuilding = '';
      return true;
    }
  }

  checkValidFields() {
    this.checkValidName();
    this.checkValidCapacity();
    this.checkValidBuilding();
    if (this.checkValidName() && this.checkValidCapacity() && this.checkValidBuilding()) {
      this.addRoom();
    } else {
      this.toastr.warning('Something is missing.', 'Alert!');
    }
  }

  formatText(s: string) {
    return s.trim().replace(/\s\s+/g, ' ');
  }

  isInputNumber(evt) {
    const c = String.fromCharCode(evt.which);
    if (!(/[0-9]/.test(c))) {
      evt.preventDefault();
    }
  }
}
