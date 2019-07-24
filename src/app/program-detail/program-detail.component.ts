import {Component, OnInit, AfterViewInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpParams} from '@angular/common/http';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

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

  programId;
  courseName = '';
  image = '';

  public Editor = ClassicEditor;
  // text editor
  description = '<p>Testing</p>';
  // hasFocus = false;
  //
  // atValues = [
  //   { id: 1, value: 'Fredrik Sundqvist', link: 'https://google.com' },
  //   { id: 2, value: 'Patrik Sjölin' }
  // ];
  // hashValues = [
  //   { id: 3, value: 'Fredrik Sundqvist 2' },
  //   { id: 4, value: 'Patrik Sjölin 2' }
  // ]
  //
  // quillConfig={
  //
  //   toolbar: {
  //     container: [
  //       ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  //       ['code-block'],
  //       [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  //       [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  //       //[{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  //       //[{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
  //       //[{ 'direction': 'rtl' }],                         // text direction
  //
  //       //[{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  //       //[{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  //
  //       //[{ 'font': [] }],
  //       //[{ 'align': [] }],
  //
  //       ['clean'],                                         // remove formatting button
  //
  //       ['link'],
  //       //['link', 'image', 'video']
  //       ['emoji'],
  //     ],
  //     handlers: {'emoji': function() {}}
  //   },
  //   // autoLink: true,
  //
  //   // mention: {
  //   //   allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
  //   //   mentionDenotationChars: ["@", "#"],
  //   //   source: (searchTerm, renderList, mentionChar) => {
  //   //     let values;
  //
  //   //     if (mentionChar === "@") {
  //   //       values = this.atValues;
  //   //     } else {
  //   //       values = this.hashValues;
  //   //     }
  //
  //   //     if (searchTerm.length === 0) {
  //   //       renderList(values, searchTerm);
  //   //     } else {
  //   //       const matches = [];
  //   //       for (var i = 0; i < values.length; i++)
  //   //         if (~values[i].value.toLowerCase().indexOf(searchTerm.toLowerCase())) matches.push(values[i]);
  //   //       renderList(matches, searchTerm);
  //   //     }
  //   //   },
  //   // },
  //
  //   keyboard: {
  //     bindings: {
  //       // shiftEnter: {
  //       //   key: 13,
  //       //   shiftKey: true,
  //       //   handler: (range, context) => {
  //       //     // Handle shift+enter
  //       //     console.log("shift+enter")
  //       //   }
  //       // },
  //       enter:{
  //         key:13,
  //         handler: (range, context)=>{
  //           console.log("enter");
  //           return true;
  //         }
  //       }
  //     }
  //   }
  // }
  // Editor: any;
  // end text editor

  ngOnInit() {
    this.programId = this.route.snapshot.paramMap.get('id');
    this.loadProgramById();
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

  }

  loadProgramById() {
    const body = new HttpParams().set('programId', this.programId);
    this.http.get<any>('https://educationcentermanagementapi-dev-as.azurewebsites.net/api/TrainingDept/GetProgramById', {params: body}).toPromise().then(
      res => {
        console.log(res);
        this.courseName = res.Name;
        this.image = res.Image;
        this.description = res.Description;
      },
      err => {
        console.log(err);
        this.showMessage(false);
      }
    );
  }

  updateProgram() {
    const configUrl = 'https://educationcentermanagementapi-dev-as.azurewebsites.net/api/TrainingDept/UpdateProgram';
    const url = 'https://educationcentermanagementapi-dev-as.azurewebsites.net/api/TrainingDept/GetCenter';
    this.http.get<any>(url).toPromise().then(data => {
        console.log(data);
        const body = new HttpParams()
          .set('ProgramId', this.programId)
          .set('ProgramName', this.courseName)
          .set('Description', this.description)
          .set('Image', this.image)
          .set('CenterId', data['Id']);
        this.http.post<any>(configUrl, body).toPromise().then(
          res => {
            console.log(res);
            this.showMessage(true);
            // this.redirectToAllPrograms();
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

  private showMessage(status: boolean) {
    let messageConfirm;
    if (status) {
      messageConfirm = 'A program was updated successfully.' +
        '\nDo you want to update anything else?';
    } else {
      messageConfirm = 'Something go wrong.' +
        '\nDo you want to try again?';
    }
    const r = confirm(messageConfirm);
    if (r === true) {
      this.redirectToUpdateProgram();
    } else {
      this.redirectToAllProgram();
    }
  }
}
