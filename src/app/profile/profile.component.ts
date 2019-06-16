import { Component, OnInit,AfterViewInit } from '@angular/core';
import { Router} from '@angular/router';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
declare var jquery: any; declare var $: any;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit,AfterViewInit {

  constructor(private router:Router,private http:HttpClient) { }

  ngOnInit() {
    console.log('2'+this.router.url);
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
  ngAfterViewInit() {
    
  }

}
