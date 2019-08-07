import {Component, OnInit, AfterViewInit, AfterContentInit} from '@angular/core';
import {HttpParams, HttpClient} from '@angular/common/http';
import {Router, ActivatedRoute} from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {APIContext, APITraining} from '../APIContext';
import * as $ from 'jquery';


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
export class AddProgramComponent implements OnInit, AfterContentInit, AfterViewInit {

  apiContext = new APIContext();
  apiTraining = new APITraining();

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

  ngAfterContentInit(): void {
    this.isLoading = false;
  }

  ngAfterViewInit() {
    this.loadScript('../../assets/bundles/libscripts.bundle.js');
    this.loadScript('../../assets/bundles/vendorscripts.bundle.js');
    this.loadScript('../../assets/bundles/morphingsearchscripts.bundle.js');
    this.loadScript('../../assets/plugins/bootstrap-notify/bootstrap-notify.js');
    this.loadScript('../../assets/js/pages/ui/notifications.js');
    this.loadScript('../../assets/bundles/mainscripts.bundle.js');
    this.loadScript('../../assets/testJS.js');

  }

  //this is add program
  addProgram() {
    this.isLoading = true;
    console.log(this.description);
    const configUrl = this.apiContext.host + this.apiTraining.addProgram;
    const body = new HttpParams()
      .set('ProgramName', this.programName)
      .set('Image', this.image)
      .set('Description', this.description)
      .set('CenterId', this.apiContext.centerId + '');
    this.http.post<any>(configUrl, body).toPromise().then(
      res => {
        console.log(res);
        // this.showMessage(true);
        this.showNoti('sBtn');
        this.redirectToAllProgram();
      },
      err => {
        console.log(err);
        this.isLoading = false;
        this.showNoti('fBtn');
        // this.showMessage(false);
      }
    );
    // this.showNoti('sBtn');
  }

  onUploadCompleted($event: any) {
    this.image = $event.originalUrl;
  }

  redirectToAllProgram() {
    this.router.navigateByUrl('/Training-staff/view-program');
    // this.showNoti('fBtn');
  }

  redirectToAddProgram() {
    this.router.navigateByUrl('/Training-staff/add-program');
  }

  // private showMessage(status: boolean) {
  //   let messageConfirm;
  //   if (status) {
  //     messageConfirm = 'A program was added successfully.' +
  //       '\nDo you want to add more programs?';
  //   } else {
  //     messageConfirm = 'Something go wrong.' +
  //       '\nDo you want to try again?';
  //   }
  //   const r = confirm(messageConfirm);
  //   if (r === true) {
  //     this.redirectToAddProgram();
  //   } else {
  //     this.redirectToAllProgram();
  //   }
  // }


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
    }
  }

  showNoti(btnId: string) {
    const btn: HTMLElement = document.getElementById(btnId) as HTMLElement;
    btn.click();



    // $['notify']({
    //   title: '<strong>Heads up!</strong>',
    //   message: 'You can use any of bootstraps other alert styles as well by default.'
    // }, {
    //   type: 'success',
    //   animate: {
    //     enter: 'animated fadeInRight',
    //     exit: 'animated fadeOutRight'
    //   },
    //   newest_on_top: true
    // });
  }
}
