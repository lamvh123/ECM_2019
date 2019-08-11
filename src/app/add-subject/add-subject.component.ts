import {AfterContentInit, AfterViewInit, Component, OnInit} from '@angular/core';
import {Subject} from '../subject';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpParams} from '@angular/common/http';
import {APIContext, APITraining} from '../APIContext';

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.css'
    , '../../assets/plugins/bootstrap/css/bootstrap.min.css'
    , '../../assets/plugins/dropzone/dropzone.css'
    , '../../assets/plugins/bootstrap-material-datetimepicker/css/bootstrap-material-datetimepicker.css'
    , '../../assets/plugins/waitme/waitMe.css'
    , '../../assets/plugins/bootstrap-select/css/bootstrap-select.css'
    , '../../assets/css/main.css'
    , '../../assets/css/themes/all-themes.css']
})
export class AddSubjectComponent implements OnInit, AfterViewInit {
  apiContext = new APIContext();
  apiTraining = new APITraining();
  centerId: number;

  Name: string;
  errorMsgName = '-';
  isLoading = true;

  constructor(private router: Router, private http: HttpClient, private route: ActivatedRoute) {
  }

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
    this.isLoading = false;
  }


  // ngAfterViewInit() {
  //   // this.loadScript('/assets/bundles/libscripts.bundle.js');
  //   // this.loadScript('/assets/bundles/vendorscripts.bundle.js');
  //   // this.loadScript('/assets/bundles/mainscripts.bundle.js');
  //   // this.loadScript('/assets/plugins/momentjs/moment.js');
  //   // this.loadScript('/assets/js/TrainingDept/addcourse.js');
  // }

  addSubject() {
    this.isLoading = true;
    const configUrl = this.apiContext.host + this.apiTraining.addSubject;
    const body = new HttpParams()
      .set('Name', this.Name)
      .set('CenterId', this.centerId + '');
    console.log(body);
    this.http.post<any>(configUrl, body).toPromise().then(
      res => {
        console.log(res);
        // this.showMessage(true);
        this.isLoading = false;
        this.redirectToAllSubject();
      },
      err => {
        console.log(err);
        this.isLoading = false;
        // this.showMessage(false);
      }
    );
  }


  redirectToAllSubject() {
    this.router.navigateByUrl('/Training-staff/view-subject');
  }

  redirectToAddSubject() {
    this.router.navigateByUrl('/Training-staff/add-subject');
  }

  // private showMessage(status: boolean) {
  //   let messageConfirm;
  //   if (status) {
  //     messageConfirm = 'A subject was added successfully.' +
  //       '\nDo you want to add more subjects?';
  //   } else {
  //     messageConfirm = 'Something go wrong.' +
  //       '\nDo you want to try again?';
  //   }
  //   const r = confirm(messageConfirm);
  //   if (r === true) {
  //     this.redirectToAddSubject();
  //   } else {
  //     this.redirectToAllSubject();
  //   }
  // }


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

  formatText(s: string) {
    return s.trim().replace(/\s\s+/g, ' ');
  }

  checkValidFields() {
    if (this.checkValidName()) {
      this.addSubject();
    }
  }

}
