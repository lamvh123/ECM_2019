import { Component, OnInit } from '@angular/core';
import { APIContext, APISystem } from '../APIContext';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Center } from '../center';

@Component({
  selector: 'app-system-admin-get-all-center',
  templateUrl: './system-admin-get-all-center.component.html',
  styleUrls: ['./system-admin-get-all-center.component.css','../../assets/css/main.css',
  '../../assets/css/themes/all-themes.css']
})
export class SystemAdminGetAllCenterComponent implements OnInit {

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }
  apiContext = new APIContext();
  apiSystem = new APISystem();
  listCenter: Center[];
  empty = true;
  ngOnInit() {
    this.getAllCenter();
  }
  getAllCenter(){
    var url = this.apiContext.host + this.apiSystem.getAllCenter;
    this.http.get<Center[]>(url).toPromise().then(data=>{
      this.listCenter = data;
      if(this.listCenter.length>0){
         this.empty = false;
      }
    },
    error=>{
      console.log(error);
    })
  }

  navigateToGrantAccount(center:Center){
    this.router.navigate(['/SystemAdmin/GrantAccount',{id:center.Id,name:center.Name}]);
  }
}
