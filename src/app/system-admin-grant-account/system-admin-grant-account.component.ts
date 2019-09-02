import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, ParamMap} from '@angular/router';
import {HttpClient, HttpParams} from '@angular/common/http';
import {APIContext, APISystem} from '../APIContext';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-system-admin-grant-account',
  templateUrl: './system-admin-grant-account.component.html',
  styleUrls: ['./system-admin-grant-account.component.css', '../../assets/css/main.css',
    '../../assets/css/themes/all-themes.css']
})
export class SystemAdminGrantAccountComponent implements OnInit, AfterViewInit {

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private toastr: ToastrService) {
  }

  centerId;
  centerName;
  Account: string;
  errorMsgAccount: string;
  apiContext = new APIContext();
  apiSystem = new APISystem();
  isLoading = true;

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.centerId = params.get('id');
      this.centerName = params.get('name');
      console.log(params.get('id') + ' ' + params.get('name'));
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

  checkValidFields() {
    this.checkValidAccount();
    if (this.checkValidAccount()) {
      this.GrantAccount();
    }
  }

  checkValidAccount() {
    if (this.Account == null || this.Account === '') {
      this.errorMsgAccount = 'Account is required.';
      return false;
    } else {
      this.errorMsgAccount = '';
      return true;
    }
  }

  GrantAccount() {
    this.isLoading = true;
    const url = this.apiContext.host + this.apiSystem.grantAccountForCenter;
    const params = new HttpParams().set('CenterId', this.centerId).set('EmailCenter', this.Account);
    this.http.post(url, params).toPromise().then(data => {
        this.isLoading = false;
        this.toastr.success('Grant account for center ' + this.centerName + ' successfully.', 'Success!');
      },
      error => {
        this.isLoading = false;
        this.toastr.error('Something goes wrong. Please try again.', 'Oops!');
      });
  }

  redirectToViewCenter() {
    this.router.navigateByUrl('/SystemAdmin/AllCenter');
  }

}
