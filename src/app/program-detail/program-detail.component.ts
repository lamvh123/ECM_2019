import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-program-detail',
  templateUrl: './program-detail.component.html',
  styleUrls: ['./program-detail.component.css','../css/assets/css/main.css',
  '../css/assets/css/themes/all-themes.css', '../css/assets/plugins/bootstrap/css/bootstrap.min.css',
  '../css/assets/plugins/dropzone/dropzone.css', '../css/assets/plugins/bootstrap-material-datetimepicker/css/bootstrap-material-datetimepicker.css',
  '../css/assets/plugins/waitme/waitMe.css',
  '../css/assets/plugins/bootstrap-select/css/bootstrap-select.css']
})
export class ProgramDetailComponent implements OnInit ,AfterViewInit{

  constructor(private _router: Router, private http: HttpClient,private route:ActivatedRoute) { }
  programId;
  courseName = '';
  image = '';
  ngOnInit() {
    this.programId = this.route.snapshot.paramMap.get('id');
    this.loadProgramById();
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
  ngAfterViewInit() {
    this.loadScript('/assets/bundles/libscripts.bundle.js');
    this.loadScript('/assets/bundles/vendorscripts.bundle.js');
    this.loadScript('/assets/bundles/mainscripts.bundle.js');

  }

  loadProgramById(){
    const body = new HttpParams().set("programId",this.programId);
    this.http.get<any>("https://educationcentermanagementapi-dev-as.azurewebsites.net/api/TrainingDept/GetProgramById",{params:body}).toPromise().then(
      res => {
        console.log(res);
        this.courseName = res.Name;
      },
      err => {
        console.log(err);
      }
    );
  }
  updateProgram(){
    const configUrl = 'https://educationcentermanagementapi-dev-as.azurewebsites.net/api/TrainingDept/UpdateProgram';
    const url = "https://educationcentermanagementapi-dev-as.azurewebsites.net/api/TrainingDept/GetCenter";
    this.http.get(url).toPromise().then(data => {
      const body = new HttpParams()
        .set('ProgramId',this.programId)
        .set('ProgramName', this.courseName)
        .set('Image', this.image).set('CenterId', data["Id"]);
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

  }
  
}
