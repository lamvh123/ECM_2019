import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Staff} from '../staff';
import {APICenter, APIContext} from '../APIContext';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {AdmissionForm} from '../admission-form';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Student} from '../entity/student';
import {Role} from '../role';

@Component({
  selector: 'app-center-view-staff',
  templateUrl: './center-view-staff.component.html',
  styleUrls: ['./center-view-staff.component.css'
    , '../../assets/plugins/bootstrap/css/bootstrap.min.css'
    , '../../assets/css/main.css'
    , '../../assets/css/themes/all-themes.css']
})
export class CenterViewStaffComponent implements OnInit, AfterViewInit {

  apiContext = new APIContext();
  apiCenter = new APICenter();
  centerId: number;


  isLoading = true;
  listStaff: Staff[];
  deletingStaff: Staff;
  addingStaff: Staff;
  listRole: Role[];
  empty = true;
  errorMsgName = '-';
  errorMsgEmail = '-';
  errorMsgRole = '-';

  constructor(private router: Router, private http: HttpClient, private toastr: ToastrService, private modalService: NgbModal) {
  }

  ngOnInit() {
    const urlGetCenterId = this.apiContext.host + this.apiCenter.getCenter;
    this.http.get(urlGetCenterId).toPromise().then(data => {
      this.centerId = data['Id'];
      this.getInitData();
      this.getAllRoles();
    });
  }

  ngAfterViewInit(): void {
    this.isLoading = false;
  }

  getInitData() {
    this.empty = true;
    this.isLoading = true;
    const param = new HttpParams()
      .set('centerId', this.centerId + '');
    const url = this.apiContext.host + this.apiCenter.viewAllStaffAccount;
    this.http.get<Staff[]>(url, {params: param}).toPromise().then(data => {
        this.listStaff = data;
        console.log(data);
        if (this.listStaff != null && this.listStaff.length > 0) {
          this.empty = false;
        }
        this.isLoading = false;
      },
      error => {
        console.log(error);
        this.isLoading = false;
        this.toastr.info('Something is not working right. Please try again soon.');
      });
  }

  openDeleteForm(deleteModal, staffModel: Staff) {
    this.deletingStaff = staffModel;
    console.log(this.modalService);
    this.modalService.open(deleteModal, {size: 'lg'});
  }

  private getAllRoles() {
    this.isLoading = true;
    const param = new HttpParams()
      .set('centerId', this.centerId + '');
    const url = this.apiContext.host + this.apiCenter.viewAllRole;
    this.http.get<Role[]>(url, {params: param}).toPromise().then(data => {
        this.listRole = data;
        console.log(data);
        this.isLoading = false;
      },
      error => {
        console.log(error);
        this.isLoading = false;
        this.toastr.info('Something is not working right. Please try again soon.');
      });
  }

  addStaff() {
    this.isLoading = true;
    const url = this.apiContext.host + this.apiCenter.grantAccountForStaff;
    const param = new HttpParams()
      .set('Email', this.addingStaff.Email)
      .set('FullName', this.addingStaff.FullName)
      .set('RoleName', this.addingStaff.RoleName)
      .set('centerId', this.centerId + '');
    this.http.post(url, param).toPromise().then(data => {
        console.log(data);
        this.isLoading = false;
        this.toastr.success('Staff ' + this.addingStaff.FullName + ' was added successfully.', 'Success!');
        this.getInitData();
      },
      error => {
        console.log(error);
        this.isLoading = false;
        if (error instanceof HttpErrorResponse && error.status === 406) {
          console.log(error.status);
          this.toastr.error(error.error, 'Oops!');
        } else {
          this.toastr.error('Something goes wrong. Please try again.', 'Oops!');
        }
      }
    );
  }

  openAddForm(addModal) {
    this.addingStaff = new Staff();
    this.addingStaff.RoleName = this.listRole[0].Name;
    console.log(this.modalService);
    this.modalService.open(addModal, {size: 'lg'});
  }

  roleSelectedChange(value: any) {
    this.addingStaff.RoleName = value;
  }

  deleteStaff(deletingStaff: Staff) {
    this.toastr.error('This function is pending', 'Oops!');
  }


  checkValidName() {
    if (this.addingStaff.FullName != null) {
      this.addingStaff.FullName = this.formatText(this.addingStaff.FullName);
    }
    if (this.addingStaff.FullName == null || this.addingStaff.FullName === '') {
      this.errorMsgName = 'Name is required.';
      return false;
    } else {
      this.errorMsgName = '';
      return true;
    }
  }


  checkValidEmail() {
    if (this.addingStaff.Email != null) {
      this.addingStaff.Email = this.formatText(this.addingStaff.Email);
    }
    const regex = /^[a-zA-Z][a-zA-Z0-9_\.]{5,32}@[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,4}){1,2}$/gm;
    if (this.addingStaff.Email == null || this.addingStaff.Email === '') {
      this.errorMsgEmail = 'Email is required.';
      return false;
    } else if (!regex.test(this.addingStaff.Email)) {
      this.errorMsgEmail = 'Invalid email format.';
      return false;
    } else {
      this.errorMsgEmail = '';
      return true;
    }
  }

  checkValidRole() {
    if (this.addingStaff.RoleName == null || this.addingStaff.RoleName === '') {
      this.errorMsgRole = 'Role is required.';
      return false;
    } else {
      this.errorMsgRole = '';
      return true;
    }
  }

  checkValidFields() {
    this.checkValidName();
    this.checkValidEmail();
    this.checkValidRole();
    if (this.checkValidName() && this.checkValidEmail() && this.checkValidRole()) {
      this.addStaff();
      const btnClose: HTMLElement = document.getElementById('btnClose') as HTMLElement;
      btnClose.click();
    } else {
      this.toastr.warning('Something is missing.', 'Alert!');
    }
  }

  isInputNumber(evt) {
    const c = String.fromCharCode(evt.which);
    if (!(/[0-9]/.test(c))) {
      evt.preventDefault();
    }
  }


  formatText(s: string) {
    return s.trim().replace(/\s\s+/g, ' ');
  }

}
