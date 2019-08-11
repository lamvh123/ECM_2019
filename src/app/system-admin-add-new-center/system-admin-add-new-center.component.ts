import {AfterViewInit, Component, OnInit} from '@angular/core';
import {APIContext, APISystem} from '../APIContext';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-system-admin-add-new-center',
  templateUrl: './system-admin-add-new-center.component.html',
  styleUrls: ['./system-admin-add-new-center.component.css', '../../assets/css/main.css',
    '../../assets/css/themes/all-themes.css']
})
export class SystemAdminAddNewCenterComponent implements OnInit, AfterViewInit {

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {
  }

  Name: string;
  errorMsgName: string;
  Address: string;
  errorMsgAddress: string;
  PhoneNumber: string;
  errorPhoneNumber: string;
  Email: string;
  errorEmail: string;
  ResponsiblePersonFullname: string;
  errorOwner: string;
  apiContext = new APIContext();
  apiSystem = new APISystem();
  isLoading = true;

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.isLoading = false;
  }

  formatText(s: string) {
    return s.trim().replace(/\s\s+/g, ' ');
  }

  CreateCenter() {
    this.isLoading = true;
    var url = this.apiContext.host + this.apiSystem.addCenter;
    var params = new HttpParams().set('Name', this.Name).set('Name', this.Name)
      .set('Address', this.Address)
      .set('PhoneNumber', this.PhoneNumber)
      .set('Email', this.Email)
      .set('ResponsiblePersonFullname', this.ResponsiblePersonFullname);
    this.http.post(url, params).toPromise().then(data => {
        console.log(data);
        this.isLoading = false;
      },
      error => {
        console.log(error);
        this.isLoading = false;
      });
  }

  checkValidFields() {
    this.checkValidName();
    this.checkValidAddress();
    this.checkValidEmail();
    this.checkValidOwner();
    this.checkValidPhoneNumber();
    if (this.checkValidAddress() && this.checkValidName() && this.checkValidEmail() && this.checkValidOwner() && this.checkValidPhoneNumber()) {
      this.CreateCenter();
    }
  }

  checkValidName() {
    if (this.Name != null) {
      this.Name = this.formatText(this.Name);
    }
    if (this.Name == null || this.Name === '') {
      this.errorMsgName = 'Name is required.';
      return false;
    } else {
      this.errorMsgName = '';
      return true;
    }
  }

  checkValidOwner() {
    if (this.ResponsiblePersonFullname != null) {
      this.ResponsiblePersonFullname = this.formatText(this.ResponsiblePersonFullname);
    }
    if (this.ResponsiblePersonFullname == null || this.ResponsiblePersonFullname === '') {
      this.errorOwner = 'Owner Name is required.';
      return false;
    } else {
      this.errorOwner = '';
      return true;
    }
  }

  checkValidEmail() {
    if (this.Email != null) {
      this.Email = this.formatText(this.Email);
    }
    const EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (this.Email == null || this.Email === '') {
      this.errorEmail = 'Email is required.';
      return false;
    } else if (!EMAIL_REGEXP.test(this.Email)) {
      this.errorEmail = 'Email is invalid.';
      return false;
    } else {
      this.errorEmail = '';
      return true;
    }
  }

  checkValidPhoneNumber() {
    if (this.PhoneNumber == null || this.PhoneNumber === '') {
      this.errorPhoneNumber = 'PhoneNumber is required.';
      return false;
    } else if ((this.PhoneNumber + '').length > 10) {
      this.errorPhoneNumber = 'Length of PhoneNumber must be less than 10.';
      return false;
    } else {
      this.errorPhoneNumber = '';
      return true;
    }
  }

  checkValidAddress() {
    if (this.Address != null) {
      this.Address = this.formatText(this.Address);
    }
    if (this.Address == null || this.Address === '') {
      this.errorMsgAddress = 'Address is required.';
      return false;
    } else {
      this.errorMsgAddress = '';
      return true;
    }
  }

}
