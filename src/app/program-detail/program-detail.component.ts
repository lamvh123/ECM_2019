import {Component, OnInit, AfterViewInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpParams} from '@angular/common/http';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {APIContext, APITraining} from '../APIContext';

@Component({
  selector: 'app-program-detail',
  templateUrl: './program-detail.component.html',
  styleUrls: ['./program-detail.component.css'
    , '../../assets/plugins/bootstrap/css/bootstrap.min.css'
    , '../../assets/plugins/dropzone/dropzone.css'
    , '../../assets/plugins/bootstrap-material-datetimepicker/css/bootstrap-material-datetimepicker.css'
    , '../../assets/plugins/waitme/waitMe.css'
    , '../../assets/plugins/bootstrap-select/css/bootstrap-select.css'
    , '../../assets/css/main.css'
    , '../../assets/css/themes/all-themes.css']
})
export class ProgramDetailComponent implements OnInit, AfterViewInit {

  constructor(private _router: Router, private http: HttpClient, private route: ActivatedRoute) {
  }

  apiContext = new APIContext();
  apiTraining = new APITraining();
  centerId: number;

  programId;
  programName = '';
  image = '';


  errorMsgName = '';
  errorMsgImage = '';
  errorMsgDescription = '';


  public Editor = ClassicEditor;
  // text editor
  description = '<p>Testing</p>';
  isLoading = true;

  ngOnInit() {
    this.programId = this.route.snapshot.paramMap.get('id');
    const urlGetCenterId = this.apiContext.host + this.apiTraining.getCenter;
    this.http.get(urlGetCenterId).toPromise().then(data => {
      this.centerId = data['Id'];
      this.loadProgramById();
    });
  }

  public loadScript(url: string) {
    const body = document.body as HTMLDivElement;
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
    this.isLoading = false;
  }

  loadProgramById() {
    this.isLoading = true;
    const body = new HttpParams()
      .set('programId', this.programId);
    this.http.get<any>(this.apiContext.host + this.apiTraining.getProgramByProgramId, {params: body}).toPromise().then(
      res => {
        console.log(res);
        this.programName = res.Name;
        this.image = res.Image;
        this.description = res.Description;
        this.isLoading = false;
      },
      err => {
        console.log(err);
        this.isLoading = false;
        // this.showMessage(false);
      }
    );
  }

  updateProgram() {
    this.isLoading = true;
    const configUrl = this.apiContext.host + this.apiTraining.updateProgram;
    const body = new HttpParams()
      .set('ProgramId', this.programId)
      .set('ProgramName', this.programName)
      .set('Description', this.description)
      .set('Image', this.image)
      .set('CenterId', this.centerId + '');
    this.http.post<any>(configUrl, body).toPromise().then(
      res => {
        console.log(res);
        // this.showMessage(true);
        this.isLoading = false;
        this.redirectToAllProgram();
      },
      err => {
        console.log(err);
        this.isLoading = false;
        // this.showMessage(false);
      }
    );
  }

  onUploadCompleted($event: any) {
    console.log($event);
    this.image = $event.originalUrl;
    // this.updateProgram();
  }

  redirectToAllPrograms() {
    this._router.navigate(['/Training-staff/view-program']);
  }

  onReady(editor) {
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    );
  }


  redirectToAllProgram() {
    this._router.navigateByUrl('/Training-staff/view-program');
  }

  redirectToUpdateProgram() {
    this._router.navigateByUrl('/Training-staff/program-detail/' + this.programId);
  }

  // private showMessage(status: boolean) {
  //   let messageConfirm;
  //   if (status) {
  //     messageConfirm = 'A program was updated successfully.' +
  //       '\nDo you want to update anything else?';
  //   } else {
  //     messageConfirm = 'Something go wrong.' +
  //       '\nDo you want to try again?';
  //   }
  //   const r = confirm(messageConfirm);
  //   if (r === true) {
  //     this.redirectToUpdateProgram();
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

  checkValidFields() {
    this.checkValidName();
    this.checkValidImage();
    this.checkValidDescription();
    if (this.checkValidName() && this.checkValidImage() && this.checkValidDescription()) {
      this.updateProgram();
    }
  }

  formatText(s: string) {
    return s.trim().replace(/\s\s+/g, ' ');
  }

}
