import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { APIResponse, EarnedLeave, Employee } from 'src/app/model/master';
import { MasterService } from 'src/app/service/master.service';

@Component({
  selector: 'app-earned-leave',
  templateUrl: './earned-leave.component.html',
  styleUrls: ['./earned-leave.component.css']
})
export class EarnedLeaveComponent implements OnInit {



  employee$: Observable<Employee[]>=new Observable<Employee[]>();
  earnedLeaves:EarnedLeave[]=[];

  constructor(private masterSrv:MasterService) {
    this.employee$=this.masterSrv.getAllEmployee();
    this.intializeForm()
   }

  ngOnInit(): void {
    this.getData();
  }

  form:FormGroup=new FormGroup({});

  intializeForm(){
    this.form=new FormGroup({
      earnedLeaveId:new FormControl(0),
      employeeId:new FormControl(0),
      totalEarnedLeaves:new FormControl(0),
      lastUpdatedDate:new FormControl(new Date())
    })
  }
  getData(){
    const formValue=this.form.value;
    this.masterSrv.getAllEarnedLeaves().subscribe((res:APIResponse)=>{
      this.earnedLeaves=res.data;
    })

  }
  onSave(){
    const formValue=this.form.value;
    this.masterSrv.addEarnedLeave(formValue).subscribe((res:APIResponse)=>{
      if(res.result){
        alert("Leave modified")
      }else{
        alert(res.message)
      }
    })

  }
}
