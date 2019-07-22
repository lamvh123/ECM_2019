import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Subject} from '../subject';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpParams} from '@angular/common/http';

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
  Name: string;
;

  constructor(private router: Router, private http: HttpClient, private route: ActivatedRoute) {
  }

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
    // this.loadScript('/assets/plugins/momentjs/moment.js');
    // this.loadScript('/assets/js/TrainingDept/addcourse.js');
  }

  addSubject() {
    const configUrl = 'https://educationcentermanagementapi-dev-as.azurewebsites.net/api/TrainingDept/AddSubject';
    const url = 'https://educationcentermanagementapi-dev-as.azurewebsites.net/api/TrainingDept/GetCenter';
    this.http.get(url).toPromise().then(data => {
        const body = new HttpParams()
          .set('Name', this.Name)
          .set('CenterId', data['Id']);
        console.log(body);
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


  redirectToAllSubject() {
    this.router.navigateByUrl('/Training-staff/view-subject');
  }

  redirectToAddSubject() {
    this.router.navigateByUrl('/Training-staff/add-subject');
  }

  private showMessage(status: boolean) {
    let messageConfirm;
    if (status) {
      messageConfirm = 'A subject was added successfully.' +
        '\nDo you want to add more subjects?';
    } else {
      messageConfirm = 'Something go wrong.' +
        '\nDo you want to try again?';
    }
    const r = confirm(messageConfirm);
    if (r === true) {
      this.redirectToAddSubject();
    } else {
      this.redirectToAllSubject();
    }
  }
}
