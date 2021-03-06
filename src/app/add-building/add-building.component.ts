// import { Component, OnInit } from '@angular/core';
import {Component, OnInit, AfterViewInit, AfterContentInit} from '@angular/core';
import {HttpParams, HttpClient} from '@angular/common/http';
import {Router, ActivatedRoute, Routes} from '@angular/router';
import {APIContext, APITraining} from '../APIContext';
import {ToastrService} from 'ngx-toastr';
import {UrlTraining} from '../SiteUrlContext';
import {MenuBarComponent} from '../menu-bar/menu-bar.component';

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
  centerId: number;
  urlTraining = new UrlTraining();
  errorMsgName = '-';
  errorMsgAddress = '-';

  constructor(private _router: Router, private http: HttpClient, private route: ActivatedRoute, private toastr: ToastrService) {
  }

  buildingName = '';
  buildingAddress = '';
  isLoading = true;

  ngOnInit() {
    const urlGetCenterId = this.apiContext.host + this.apiTraining.getCenter;
    this.http.get(urlGetCenterId).toPromise().then(data => {
      this.centerId = data['Id'];
    });

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


  // ngAfterViewInit() {
  //   // this.loadScript('/assets/bundles/libscripts.bundle.js');
  //   // this.loadScript('/assets/bundles/vendorscripts.bundle.js');
  //   // this.loadScript('/assets/bundles/mainscripts.bundle.js');
  //
  // }

  addBuilding() {
    this.isLoading = true;
    const configUrl = this.apiContext.host + this.apiTraining.addBuilding;
    const body = new HttpParams()
      .set('Name', this.buildingName)
      .set('Address', this.buildingAddress)
      .set('CenterId', this.centerId + '');
    this.http.post<any>(configUrl, body).toPromise().then(
      res => {
        console.log(res);
        // this.showMessage(true);
        this.toastr.success('Building ' + this.buildingName + ' was added successfully.', 'Success!');
        this.isLoading = false;
        this.redirectToViewBuilding();
      },
      err => {
        console.log(err);
        this.toastr.error('Something goes wrong. Please try again.', 'Oops!');
        this.isLoading = false;
        // this.showMessage(false);
      }
    );
  }


  redirectToViewBuilding() {
    MenuBarComponent.currentUrl = this.urlTraining.viewBuilding;
    this._router.navigateByUrl(this.urlTraining.viewBuilding);
  }

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
    this.checkValidName();
    this.checkValidAddress();
    if (this.checkValidName() && this.checkValidAddress()) {
      this.addBuilding();
    } else {
      this.toastr.warning('Something is missing.', 'Alert!');
    }
  }

  formatText(s: string) {
    return s.trim().replace(/\s\s+/g, ' ');
  }
}
