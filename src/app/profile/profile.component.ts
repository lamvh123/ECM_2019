import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private router:Router,private http:HttpClient) { }

  ngOnInit() {
    const configUrl = 'https://educationcentermanagementapi-dev-as.azurewebsites.net/api/Systemmanagement/Profile';
    this.http.get(configUrl).subscribe(res =>{
         console.log(res);
    },
    error=>{
        if(error instanceof HttpErrorResponse){
          if(error.status===401){
            this.router.navigate(['/login']);
          }
        }
    });
  
  }

}
