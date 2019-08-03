// import { Component, OnInit } from '@angular/core';
import {Component, OnInit, AfterViewInit} from '@angular/core';
import {HttpParams, HttpClient} from '@angular/common/http';
import {Router, ActivatedRoute, Routes} from '@angular/router';
import {APIContext, APITraining} from '../APIContext';

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


export class AddBuildingComponent implements OnInit, AfterViewInit {
  apiContext = new APIContext();
  apiTraining = new APITraining();
  errorMsgName = '-';
  errorMsgAddress = '-';

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

  addBuilding() {
    const configUrl = this.apiContext.host + this.apiTraining.addBuilding;
    const body = new HttpParams()
      .set('Name', this.buildingName)
      .set('Address', this.buildingAddress)
      .set('CenterId', this.apiContext.centerId + '');
    this.http.post<any>(configUrl, body).toPromise().then(
      res => {
        console.log(res);
        // this.showMessage(true);
        this.redirectToViewBuilding();
      },
      err => {
        console.log(err);
        // this.showMessage(false);
      }
    );
  }


  redirectToViewBuilding() {
    this._router.navigateByUrl('/Training-staff/view-building');
  }

  redirectToAddBuilding() {
    this._router.navigateByUrl('/Training-staff/add-building');
  }

  // private showMessage(status: boolean) {
  //   let messageConfirm;
  //   if (status) {
  //     messageConfirm = 'A building was added successfully.' +
  //       '\nDo you want to add more buildings?';
  //   } else {
  //     messageConfirm = 'Something go wrong.' +
  //       '\nDo you want to try again?';
  //   }
  //   const r = confirm(messageConfirm);
  //   if (r === true) {
  //     this.redirectToAddBuilding();
  //   } else {
  //     this.redirectToViewBuilding();
  //   }
  // }


  checkValidName() {
    if (this.buildingName != null) {
      this.buildingName = this.formatText(this.buildingName);
    }
    if (this.buildingName == null || this.buildingName === '') {
      this.errorMsgName = 'Name is required.';
      return false;
    } else {
      this.errorMsgName = '';
      return true;
    }
  }

  checkValidAddress() {
    if (this.buildingAddress != null) {
      this.buildingAddress = this.formatText(this.buildingAddress.trim());
    }
    if (this.buildingAddress == null || this.buildingAddress === '') {
      this.errorMsgAddress = 'Address is required.';
      return false;
    } else {
      this.errorMsgAddress = '';
      return true;
    }
  }

  checkValidFields() {
    if (this.checkValidName() && this.checkValidAddress()) {
      this.addBuilding();
    }
  }

  formatText(s: string) {
    return s.trim().replace(/\s\s+/g, ' ');
  }
}
