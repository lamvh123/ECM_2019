import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { OfficalStudent } from '../entity/offical-student';

@Component({
  selector: 'app-list-student-of-class',
  templateUrl: './list-student-of-class.component.html',
  styleUrls: ['./list-student-of-class.component.css']
})
export class ListStudentOfClassComponent implements OnInit {

  constructor(private _router: Router, private http: HttpClient, private route: ActivatedRoute) { }
  ClassId;
  centerId;
  ListStudent:OfficalStudent[];
  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap)=>{
      this.ClassId = params.get("id");
    });
    this.loadInitData();
  }

  loadInitData(){
    const url = 'https://educationcentermanagementapi-dev-as.azurewebsites.net/api/TrainingDept/GetCenter';
    this.http.get(url).toPromise().then((data) => {
      this.centerId = data['Id'];
      this.loadStudent();
    },
      error => {
        console.log(error);
      });
  }

  loadStudent(){
    const url = 'https://educationcentermanagementapi-dev-as.azurewebsites.net/api/TrainingDept/GetClassById';
    var param = new HttpParams().set("centerId",this.centerId).set("classId",this.ClassId);
    this.http.get<OfficalStudent[]>(url,{params:param}).toPromise().then(data=>{
      console.log(data);
      this.ListStudent = data;
      this.ListStudent.forEach(item=>{
        if(item.Sex==true){
          item.realSex = "Male"
        }
        else{
          item.realSex= "Female";
        }
      })
    })
  }

}
