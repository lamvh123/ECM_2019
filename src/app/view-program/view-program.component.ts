import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Program } from '../program';
@Component({
  selector: 'app-view-program',
  templateUrl: './view-program.component.html',
  styleUrls: ['./view-program.component.css', '../css/assets/css/main.css',
    '../css/assets/css/themes/all-themes.css']
})
export class ViewProgramComponent implements OnInit {

  constructor(private http: HttpClient, private http2: HttpClient) { }
  programs:Program[];
  centerId = {
    Id: '',
    name: ''
  };
  ngOnInit() {
    this.getProgramWithCenterId();
  }
  getProgramWithCenterId() {
    const configUrl = 'https://educationcentermanagementapi-dev-as.azurewebsites.net/api/TrainingDept/SearchProgram';
    const url = "https://educationcentermanagementapi-dev-as.azurewebsites.net/api/TrainingDept/GetCenter";
    this.http.get(url).toPromise().then((data) => {
      this.centerId.Id = data["Id"];
      this.getAllProgram();
      },
        error => {
          console.log(error);
        });
    
  }
   getAllProgram() {
    
    const body = new HttpParams()
      .set('centerId', this.centerId.Id + '')
      .set('programName', '');

    const configUrl = 'https://educationcentermanagementapi-dev-as.azurewebsites.net/api/TrainingDept/SearchProgram';
    this.http.get<Program[]>(configUrl, { params: body }).toPromise().then(res => {
      console.log(res);
      this.programs = res;
      console.log(this.programs);
    },
      error => {
        console.log(error);
      });
  }

}
