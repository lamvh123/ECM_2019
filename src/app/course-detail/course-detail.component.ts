import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpParams, HttpClient} from '@angular/common/http';
import {Subject} from '../subject';
import {Course} from '../course';
import {Building} from '../building';
import {Router} from '@angular/router';


@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css'
    , '../../assets/plugins/bootstrap/css/bootstrap.min.css'
    , '../../assets/plugins/dropzone/dropzone.css'
    , '../../assets/plugins/bootstrap-material-datetimepicker/css/bootstrap-material-datetimepicker.css'
    , '../../assets/plugins/waitme/waitMe.css'
    , '../../assets/plugins/bootstrap-select/css/bootstrap-select.css'
    , '../../assets/css/main.css'
    , '../../assets/css/themes/all-themes.css']
})
export class CourseDetailComponent implements OnInit {

  constructor(private _routers: Router, private route: ActivatedRoute, private http: HttpClient) {
  }

  courseModel: Course;
  courseId = '';
  subjects: Subject[];
  centerId = {
    Id: '',
    name: ''
  };
  // text editor
 
  hasFocus = false;

  atValues = [
    { id: 1, value: 'Fredrik Sundqvist', link: 'https://google.com' },
    { id: 2, value: 'Patrik Sjölin' }
  ];
  hashValues = [
    { id: 3, value: 'Fredrik Sundqvist 2' },
    { id: 4, value: 'Patrik Sjölin 2' }
  ]

  quillConfig={

    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['code-block'],
        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        //[{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        //[{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        //[{ 'direction': 'rtl' }],                         // text direction

        //[{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        //[{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        //[{ 'font': [] }],
        //[{ 'align': [] }],

        ['clean'],                                         // remove formatting button

        ['link'],
        //['link', 'image', 'video']  
        ['emoji'], 
      ],
      handlers: {'emoji': function() {}}
    },
    // autoLink: true,

    // mention: {
    //   allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
    //   mentionDenotationChars: ["@", "#"],
    //   source: (searchTerm, renderList, mentionChar) => {
    //     let values;

    //     if (mentionChar === "@") {
    //       values = this.atValues;
    //     } else {
    //       values = this.hashValues;
    //     }
        
    //     if (searchTerm.length === 0) {
    //       renderList(values, searchTerm);
    //     } else {
    //       const matches = [];
    //       for (var i = 0; i < values.length; i++)
    //         if (~values[i].value.toLowerCase().indexOf(searchTerm.toLowerCase())) matches.push(values[i]);
    //       renderList(matches, searchTerm);
    //     }
    //   },
    // },

    keyboard: {
      bindings: {
        // shiftEnter: {
        //   key: 13,
        //   shiftKey: true,
        //   handler: (range, context) => {
        //     // Handle shift+enter
        //     console.log("shift+enter")
        //   }
        // },
        enter:{
          key:13,
          handler: (range, context)=>{
            console.log("enter");
            return true;
          }
        }
      }
    }
  }
  // end text editor

  ngOnInit() {
    this.courseId = this.route.snapshot.paramMap.get('id');
    console.log(this.courseId);
    this.getSubjectsWithCenterId();
    this.loadCourseById();
  }

  ngAfterViewInit() {
    // this.loadScript('/assets/bundles/libscripts.bundle.js');
    // this.loadScript('/assets/bundles/vendorscripts.bundle.js');
    // this.loadScript('/assets/bundles/mainscripts.bundle.js');
    // this.loadScript('/assets/bundles/morphingsearchscripts.bundle.js');

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

  loadCourseById() {
    const body = new HttpParams().set('courseId', this.courseId)
      .set('CenterId', this.centerId.Id);
    const configUrl = 'https://educationcentermanagementapi-dev-as.azurewebsites.net/api/TrainingDept/GetCourseById';
    this.http.get<Course>(configUrl, {params: body}).toPromise().then(res => {
        console.log(res);
        this.courseModel = res;
        if (this.courseModel.Subject != null) {
          this.courseModel.SubjectId = this.courseModel.Subject.Id + '';
        }
        // this.courseName = res.Name;
        // this.Image = res.Image;
        // this.Fee = res.Fee;
        // this.StartDate = res.StartDate.substring(0, 10);
        // this.Description = res.Description;

      },
      error => {
        console.log(error);
      });
  }

  updateCourse() {
    console.log(this.courseModel);
    const configUrl = 'https://educationcentermanagementapi-dev-as.azurewebsites.net/api/TrainingDept/UpdateCourse';
    const url = 'https://educationcentermanagementapi-dev-as.azurewebsites.net/api/TrainingDept/GetCenter';
    this.http.get(url).toPromise().then(data => {
        const body = new HttpParams()
          .set('courseId', this.courseModel.Id + '')
          .set('CourseName', this.courseModel.Name)
          .set('Image', this.courseModel.Image)
          .set('SubjectId', this.courseModel.SubjectId + '')
          .set('TotalSession', this.courseModel.TotalSession)
          .set('Description', this.courseModel.Description)
          .set('Fee', this.courseModel.Fee + '')
          .set('CenterId', data['Id']);
        console.log(body);
        this.http.post<any>(configUrl, body).toPromise().then(
          res => {
            console.log(res);
          },
          err => {
            console.log(err);
          }
        );
      },
      error => {
        console.log(error);
      });
    this.redirectToProgram(this.courseModel.Program.Id);
  }

  onUploadCompleted($event: any) {
    this.courseModel.Image = $event.originalUrl;
  }

  selectedValueChanged(value: any) {
    this.courseModel.SubjectId = value;
  }

  getSubjectsWithCenterId() {
    const url = 'https://educationcentermanagementapi-dev-as.azurewebsites.net/api/TrainingDept/GetCenter';
    this.http.get(url).toPromise().then((data) => {
        console.log(data);
        this.centerId.Id = data['Id'];
        this.getAllSubjects();
      },
      error => {
        console.log(error);
      });

  }

  getAllSubjects() {

    const body = new HttpParams()
      .set('centerId', this.centerId.Id + '')
      .set('subjectName', '');
    console.log(body);
    const configUrl = 'https://educationcentermanagementapi-dev-as.azurewebsites.net/api/TrainingDept/SearchSubject';
    this.http.get<Subject[]>(configUrl, {params: body}).toPromise().then(res => {
        console.log(res);
        this.subjects = res;
        console.log(this.subjects);
      },
      error => {
        console.log(error);
      });
  }


  redirectToProgram(programId: number) {
    this._routers.navigate(['/Training-staff/view-course', programId]);
  }

}
