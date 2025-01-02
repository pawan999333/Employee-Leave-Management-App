import { Component, OnInit } from '@angular/core';
import { Dashboard } from 'src/app/model/master';
import { MasterService } from 'src/app/service/master.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dashboardData: Dashboard = {
    totalEmployee: 0,
    totalLeaves: 0,
    totalNewLeaves: 0,
    totalApprovedLeaves: 0,
    totalCanceledLeave: 0,
    earnedLeave:0,
  };
  constructor(public masterSrv:MasterService) { }

  ngOnInit(): void {
    this.getDashboard();
  }
  getDashboard(){
    if(this.masterSrv.loggedUserData.role=="Employee"){
      this.getData();
     }else{
       this.getAllData();
     }
  }
    getData(){
      this.masterSrv.GetEmpployeeLeaveDashboard(this.masterSrv.loggedUserData.employeeId).subscribe((res:Dashboard)=>{
        this.dashboardData=res;
      })
    }
    getAllData(){
      this.masterSrv.GetHRDashboard().subscribe((res:Dashboard)=>{
        this.dashboardData=res;
      })
    }
}
