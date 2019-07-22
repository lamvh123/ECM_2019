import {Component, OnInit, AfterViewInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {HttpParams, HttpClient} from '@angular/common/http';
import {Building} from '../building';
import {Subject} from '../subject';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';


@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css'
    , '../../assets/plugins/bootstrap/css/bootstrap.min.css'
    , '../../assets/plugins/dropzone/dropzone.css'
    , '../../assets/plugins/bootstrap-material-datetimepicker/css/bootstrap-material-datetimepicker.css'
    , '../../assets/plugins/waitme/waitMe.css'
    , '../../assets/plugins/bootstrap-select/css/bootstrap-select.css'
    , '../../assets/css/main.css'
    , '../../assets/css/themes/all-themes.css']
})
export class AddCourseComponent implements OnInit, AfterViewInit {
  public Editor = ClassicEditor;

  programId;
  courseName = '';
  image = '';
  Fee = '';
  Description = '';
  totalSession: '';
  subjectId = '';
  centerId = {
    Id: '',
    name: ''
  };
  subjects: Subject[];

  public onReady(editor) {
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    );
  }

  constructor(private router: Router, private http: HttpClient, private route: ActivatedRoute) {
  }

  // text editor

  // hasFocus = false;
  //
  // atValues = [
  //   {id: 1, value: 'Fredrik Sundqvist', link: 'https://google.com'},
  //   {id: 2, value: 'Patrik Sjölin'}
  // ];
  // hashValues = [
  //   {id: 3, value: 'Fredrik Sundqvist 2'},
  //   {id: 4, value: 'Patrik Sjölin 2'}
  // ];

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
  // end text editor

  ngOnInit() {
    this.programId = this.route.snapshot.paramMap.get('id');
    this.getSubjectsWithCenterId();
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

  addCourse() {
    const configUrl = 'https://educationcentermanagementapi-dev-as.azurewebsites.net/api/TrainingDept/AddCourse';
    const url = 'https://educationcentermanagementapi-dev-as.azurewebsites.net/api/TrainingDept/GetCenter';
    this.http.get(url).toPromise().then(data => {
        const body = new HttpParams()
          .set('CourseName', this.courseName)
          .set('Image', this.image)
          .set('Fee', this.Fee)
          .set('TotalSession', this.totalSession)
          .set('Description', this.Description)
          .set('ProgramId', this.programId)
          .set('SubjectId', this.subjectId)
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


  onUploadCompleted($event: any) {
    this.image = $event.originalUrl;
  }

  selectedValueChanged(value: any) {
    this.subjectId = value;
    console.log(value);
  }

  getSubjectsWithCenterId() {
    const url = 'https://educationcentermanagementapi-dev-as.azurewebsites.net/api/TrainingDept/GetCenter';
    this.http.get(url).toPromise().then((data) => {
        this.centerId.Id = data['Id'];
        this.getAllSubjects();
      },
      error => {
        console.log(error);
        this.showMessage(false);
      });

  }

  getAllSubjects() {

    const body = new HttpParams()
      .set('centerId', this.centerId.Id + '')
      .set('subjectName', '');

    const configUrl = 'https://educationcentermanagementapi-dev-as.azurewebsites.net/api/TrainingDept/SearchSubject';
    this.http.get<Subject[]>(configUrl, {params: body}).toPromise().then(res => {
        console.log(res);
        this.subjects = res;
        console.log(this.subjects);
      },
      error => {
        console.log(error);
        this.showMessage(false);
      });
  }

  // redirectToViewCourse() {
  //   this.router.navigate(['/Training-staff/view-course', this.programId]);
  // }


  redirectToAddCourse() {
    this.router.navigateByUrl('/Training-staff/add-course/' + this.programId);
  }

  redirectToViewCourse() {
    this.router.navigateByUrl('/Training-staff/view-course/' + this.programId);
  }

  private showMessage(status: boolean) {
    let messageConfirm;
    if (status) {
      messageConfirm = 'A course was added successfully.' +
        '\nDo you want to add more courses?';
    } else {
      messageConfirm = 'Something go wrong.' +
        '\nDo you want to try again?';
    }
    const r = confirm(messageConfirm);
    if (r === true) {
      this.redirectToAddCourse();
    } else {
      this.redirectToViewCourse();
    }
  }
}
