// import { Component, OnInit } from '@angular/core';
import {Component, OnInit, AfterViewInit} from '@angular/core';
import {HttpParams, HttpClient} from '@angular/common/http';
import {Router, ActivatedRoute, Routes} from '@angular/router';

@Component({
  selector: 'app-add-building',
  templateUrl: './add-building.component.html',
  styleUrls: ['./add-building.component.css',
    '../../assets/plugins/bootstrap/css/bootstrap.min.css',
    '../../assets/css/main.css',
    '../../assets/css/themes/all-themes.css']
  // styleUrls: ['./add-building.component.css', '../css/assets/css/main.css',
  //   '../css/assets/css/themes/all-themes.css', '../css/assets/plugins/bootstrap/css/bootstrap.min.css',
  //   '../css/assets/plugins/dropzone/dropzone.css', '../css/assets/plugins/bootstrap-material-datetimepicker/css/bootstrap-material-datetimepicker.css',
  //   '../css/assets/plugins/waitme/waitMe.css',
  //   '../css/assets/plugins/bootstrap-select/css/bootstrap-select.css']
})


export class AddBuildingComponent implements OnInit {

  constructor(private _router: Router, private http: HttpClient, private route: ActivatedRoute) {
  }

  buildingName = '';
  buildingAddress = '';

  ngOnInit() {

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

  ngAfterViewInit() {
    // this.loadScript('/assets/bundles/libscripts.bundle.js');
    // this.loadScript('/assets/bundles/vendorscripts.bundle.js');
    // this.loadScript('/assets/bundles/mainscripts.bundle.js');

  }

  //this is add program
  addBuilding() {
    const configUrl = 'https://educationcentermanagementapi-dev-as.azurewebsites.net/api/TrainingDept/AddBuilding';
    const url = 'https://educationcentermanagementapi-dev-as.azurewebsites.net/api/TrainingDept/GetCenter';
    this.http.get(url).toPromise().then(data => {
        const body = new HttpParams()
          .set('Name', this.buildingName)
          .set('Address', this.buildingAddress)
          .set('CenterId', data['Id']);
        this.http.post<any>(configUrl, body).toPromise().then(
          res => {
            console.log(res);
            this.showMessage(true);
          },
          err => {
            console.log(err);
            this.showMessage(false);
          }
        );
      },
      error => {
        console.log(error);
        this.showMessage(false);
      });

  }

  redirectToViewBuilding() {
    this._router.navigateByUrl('/Training-staff/view-building');
  }
  redirectToAddBuilding() {
    this._router.navigateByUrl('/Training-staff/add-building');
  }

  private showMessage(status: boolean) {
    let messageConfirm;
    if (status) {
      messageConfirm = 'A building was added successfully.' +
        '\nDo you want to add more buildings?';
    } else {
      messageConfirm = 'Something go wrong.' +
        '\nDo you want to try again?';
    }
    const r = confirm(messageConfirm);
    if (r === true) {
      this.redirectToAddBuilding();
    } else {
      this.redirectToViewBuilding();
    }
  }
}
