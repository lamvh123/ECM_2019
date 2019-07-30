import {Component, OnInit, AfterViewInit} from '@angular/core';
import {HttpParams, HttpClient} from '@angular/common/http';
import {Router, ActivatedRoute} from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {APIContext, APITraining} from '../APIContext';

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

  public Editor = ClassicEditor;

  courseName = '';
  image = '';
  description = '';

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

  ngAfterViewInit() {
    // this.loadScript('/assets/bundles/libscripts.bundle.js');
    // this.loadScript('/assets/bundles/vendorscripts.bundle.js');
    // this.loadScript('/assets/bundles/mainscripts.bundle.js');

  }

  //this is add program
  addProgram() {
    console.log(this.description);
    const configUrl = this.apiContext.host + this.apiTraining.addProgram;
    const body = new HttpParams()
      .set('ProgramName', this.courseName)
      .set('Image', this.image)
      .set('Description', this.description)
      .set('CenterId', this.apiContext.centerId + '');
    this.http.post<any>(configUrl, body).toPromise().then(
      res => {
        console.log(res);
        // this.showMessage(true);
        this.redirectToAllProgram();
      },
      err => {
        console.log(err);
        // this.showMessage(false);
      }
    );
  }

  onUploadCompleted($event: any) {
    this.image = $event.originalUrl;
  }

  redirectToAllProgram() {
    this.router.navigateByUrl('/Training-staff/view-program');
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
}
