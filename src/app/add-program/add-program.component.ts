import {Component, OnInit, AfterViewInit, AfterContentInit} from '@angular/core';
import {HttpParams, HttpClient} from '@angular/common/http';
import {Router, ActivatedRoute} from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {APIContext, APITraining} from '../APIContext';
import * as $ from 'jquery';
import {ToastrService} from 'ngx-toastr';
import {MenuBarComponent} from '../menu-bar/menu-bar.component';
import {UrlTraining} from '../SiteUrlContext';


@Component({
  selector: 'app-add-program',
  templateUrl: './add-program.component.html',
  styleUrls: ['./add-program.component.css'
    , '../../assets/plugins/bootstrap/css/bootstrap.min.css'
    , '../../assets/plugins/dropzone/dropzone.css'
    , '../../assets/plugins/bootstrap-material-datetimepicker/css/bootstrap-material-datetimepicker.css'
    , '../../assets/plugins/waitme/waitMe.css'
    , '../../assets/plugins/bootstrap-select/css/bootstrap-select.css'
    , '../../assets/css/main.css'
    , '../../assets/css/themes/all-themes.css']
})
export class AddProgramComponent implements OnInit, AfterViewInit {

  apiContext = new APIContext();
  apiTraining = new APITraining();
  centerId: number;
  urlTraining = new UrlTraining();

  public Editor = ClassicEditor;

  programName = '';
  image = '';
  description = '';


  errorMsgName = '-';
  errorMsgImage = '-';
  errorMsgDescription = '-';
  isLoading = true;

  public onReady(editor) {
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    );
  }

  constructor(private router: Router, private http: HttpClient, private route: ActivatedRoute, private toastr: ToastrService) {
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

  ngAfterViewInit() {
    // this.loadScript('../../assets/bundles/libscripts.bundle.js');
    // this.loadScript('../../assets/bundles/vendorscripts.bundle.js');
    this.loadScript('../../assets/bundles/morphingsearchscripts.bundle.js');
    this.loadScript('../../assets/plugins/bootstrap-notify/bootstrap-notify.js');
    this.loadScript('../../assets/js/pages/ui/notifications.js');
    // this.loadScript('../../assets/bundles/mainscripts.bundle.js');
    this.loadScript('../../assets/testJS.js');
    this.isLoading = false;

  }

  addProgram() {
    this.isLoading = true;
    console.log(this.description);
    const configUrl = this.apiContext.host + this.apiTraining.addProgram;
    const body = new HttpParams()
      .set('ProgramName', this.programName)
      .set('Image', this.image)
      .set('Description', this.description)
      .set('CenterId', this.centerId + '');
    this.http.post<any>(configUrl, body).toPromise().then(
      res => {
        console.log(res);
        this.isLoading = false;
        this.toastr.success('Program ' + this.programName + ' was added successfully.', 'Success!');
        this.redirectToAllProgram();
      },
      err => {
        console.log(err);
        this.isLoading = false;
        this.toastr.error('Something goes wrong. Please try again.', 'Oops!');
      }
    );
  }

  onUploadCompleted($event: any) {
    this.image = $event.originalUrl;
  }

  redirectToAllProgram() {
    MenuBarComponent.currentUrl = this.urlTraining.viewProgram;
    this.router.navigateByUrl(this.urlTraining.viewProgram);
    // this.showNoti('fBtn');
  }


  checkValidName() {
    if (this.programName != null) {
      this.programName = this.formatText(this.programName);
    }
    if (this.programName == null || this.programName === '') {
      this.errorMsgName = 'Name is required.';
      return false;
    } else {
      this.errorMsgName = '';
      return true;
    }
  }

  checkValidImage() {
    if (this.image != null) {
      this.image = this.formatText(this.image);
    }
    if (this.image == null || this.image === '') {
      this.errorMsgImage = 'Image is required.';
      return false;
    } else {
      this.errorMsgImage = '';
      return true;
    }
  }


  checkValidDescription() {
    if (this.description != null) {
      this.description = this.formatText(this.description);
    }
    if (this.description == null || this.description === '') {
      this.errorMsgDescription = 'Description is required.';
      return false;
    } else {
      this.errorMsgDescription = '';
      return true;
    }
  }

  formatText(s: string) {
    return s.trim().replace(/\s\s+/g, ' ');
  }

  checkValidFields() {
    this.checkValidName();
    this.checkValidImage();
    this.checkValidDescription();
    if (this.checkValidName() && this.checkValidImage() && this.checkValidDescription()) {
      this.addProgram();
    } else {
      this.toastr.warning('Something is missing.', 'Alert!');
    }
  }

}
