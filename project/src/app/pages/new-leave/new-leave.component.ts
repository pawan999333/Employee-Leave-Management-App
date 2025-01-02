import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { APIResponse, Employee, LeaveRequest, LeaveType } from 'src/app/model/master';
import { MasterService } from 'src/app/service/master.service';

@Component({
  selector: 'app-new-leave',
  templateUrl: './new-leave.component.html',
  styleUrls: ['./new-leave.component.css']
})
export class NewLeaveComponent implements OnInit {



  employee$: Observable<Employee[]>=new Observable<Employee[]>();

  leaveForm:FormGroup=new FormGroup({});
  leaveTypeList:LeaveType[]=[];
  requestList:LeaveRequest[]=[];

  constructor(public masterSrv:MasterService) {
    this.employee$=this.masterSrv.getAllEmployee();
    this.initializeForm()
  }

  ngOnInit(): void {
    this.getLeaveType();
    this.getGridData();

  }

  getGridData(){
    if(this.masterSrv.loggedUserData.role=="Employee"){
      this.getData();
     }else{
       this.getAllData();
     }
  }
  initializeForm(){
    this.leaveForm=new FormGroup({
      leaveId:new FormControl(0),
      employeeId:new FormControl(this.masterSrv.loggedUserData.employeeId),
      leaveTypeId:new FormControl(0),
      startDate:new FormControl(''),
      endDate:new FormControl(""),
      status:new FormControl("New"),
      reason:new FormControl(''),
      requestDate:new FormControl(new Date()),

    })
    if(this.masterSrv.loggedUserData.role=="Employee"){
      this.leaveForm.controls['employeeId'].disable();
    }
  }
  getLeaveType(){
    this.masterSrv.getLeaveType().subscribe((res:APIResponse)=>{
      this.leaveTypeList=res.data;

    })

  }

  onSave(){
    const formValue=this.leaveForm.getRawValue();
    this.masterSrv.newRequest(formValue).subscribe((res:APIResponse)=>{
      if(res.result){
        alert("Request Raised");
        this.getGridData();
      }else{
        alert(res.message);
      }
    })

  }
  getData(){
    this.masterSrv.GetAllLeaveRequestByEmpId(this.masterSrv.loggedUserData.employeeId).subscribe((res:APIResponse)=>{
      this.requestList=res.data;
    })
  }
  getAllData(){
    this.masterSrv.GetAllLeaveRequest().subscribe((res:APIResponse)=>{
      this.requestList=res.data;
    })
  }
  changeStatus(id:number){
    this.masterSrv.ChangeLeaveStatus(id, 'Approved').subscribe((res:APIResponse)=>{
      this.leaveTypeList=res.data;
      this.getGridData();
    })

  }
}
