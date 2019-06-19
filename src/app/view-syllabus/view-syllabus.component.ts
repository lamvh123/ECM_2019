import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Syllabus } from '../entity/syllabus';
declare function alertSuccess():any;
@Component({
  selector: 'app-view-syllabus',
  templateUrl: './view-syllabus.component.html',
  styleUrls: ['./view-syllabus.component.css', '../css/assets/css/main.css',
    '../css/assets/css/themes/all-themes.css']
})
export class ViewSyllabusComponent implements OnInit, AfterViewInit {

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }
  courseId;
  ListOfSyllabus: Syllabus[];

  ngOnInit() {
    this.courseId = this.route.snapshot.paramMap.get('id');
    this.loadSyllabus();
  }

  addNewSyllabus() {
    var syl = new Syllabus();
    syl.CourseId = this.courseId;
    this.ListOfSyllabus.push(syl);
  }
  
  deleteSylabus(index){
     this.ListOfSyllabus.splice(index,1);
  }
  saveSyllabus() {
    const url = "https://educationcentermanagementapi-dev-as.azurewebsites.net/api/TrainingDept/UpdateSyllabusForCourse";
    let params = new HttpParams();
    this.http.post(url, this.ListOfSyllabus).toPromise().then(
      res => {
        console.log(res);
        this.loadSyllabus();
        alertSuccess();
      },
      error=>{
        console.log(error);
      }
    );
   
  }
  loadSyllabus() {
    const param = new HttpParams().set("courseId", this.courseId);
    const url = "https://educationcentermanagementapi-dev-as.azurewebsites.net/api/TrainingDept/GetSyllabus";
    this.http.get<Syllabus[]>(url, { params: param }).toPromise().then(
      res => {
        console.log(res);
        this.ListOfSyllabus = res;
        this.ListOfSyllabus.forEach(item =>{
          item.CourseId = this.courseId;
        })
      }
      , error => {
        console.log(error);
      }
    )
  }
  ngAfterViewInit() {
    // this.loadScript('/assets/bundles/libscripts.bundle.js');
    // this.loadScript('/assets/bundles/vendorscripts.bundle.js');
    // this.loadScript('/assets/bundles/mainscripts.bundle.js');
    // // this.loadScript('/assets/bundles/morphingsearchscripts.bundle.js');
    // this.loadScript('/assets/plugins/autosize/autosize.js');
    // this.loadScript('/assets/plugins/momentjs/moment.js');
    // this.loadScript('/assets/plugins/dropzone/dropzone.js');
    // // this.loadScript('/assets/plugins/bootstrap-material-datetimepicker/js/bootstrap-material-datetimepicker.js');
    // this.loadScript('/assets/js/pages/forms/basic-form-elements.js');
  }

  public loadScript(url: string) {
    const body = <HTMLDivElement>document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }



}
