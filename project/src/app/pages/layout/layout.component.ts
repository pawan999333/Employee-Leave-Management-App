import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
loggedUserData:any;
  constructor(private router:Router) {
    const localData=localStorage.getItem('leaveUser');
    if(localData){
      this.loggedUserData=JSON.parse(localData);
    }
   }

  ngOnInit(): void {

  }
  onLogoff(){
    localStorage.removeItem("leaveUser");
    this.router.navigateByUrl('login');
  }
}
