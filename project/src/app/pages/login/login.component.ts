import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router, private http: HttpClient) { }

  ngOnInit(): void {
  }

  loginObj:any={
    userName:'',
    password:''
  }



  onLogin(){
    this.http.post('https://projectapi.gerasim.in/api/EmployeeManagement/login', this.loginObj).subscribe((res:any)=>{
      if(res.result){
        localStorage.setItem("leaveUser",JSON.stringify(res.data));
        this.router.navigateByUrl('dashboard')
      }else{
        alert(res.message)
      }
    })

  }

}
