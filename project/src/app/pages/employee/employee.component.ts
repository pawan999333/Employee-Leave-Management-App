import { Component, OnInit } from '@angular/core';
import { inject } from '@angular/core/testing';
import { APIResponse, childDept, Employee, parentDept } from 'src/app/model/master';

import { MasterService } from 'src/app/service/master.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
 isFormVisible:boolean=false;

 employeeObj:Employee=new Employee();
 parentDeptId:string='';
 parentDepartmentList:parentDept[]=[];
 childDepartmentList:childDept[]=[];
 employeeList:Employee[]=[];

  constructor(private masterSrv:MasterService) { }

  ngOnInit(): void {
    this.loadParentDept();
    this.loadEmployee();

  }

  loadParentDept(){
    this.masterSrv.getDepartment().subscribe((res:APIResponse)=>{
      this.parentDepartmentList=res.data;
    })
  }
  getAllChild(){
    this.masterSrv.getAllChildDepartment().subscribe((res:APIResponse)=>{
      this.childDepartmentList=res.data;
    })
  }
  loadEmployee(){
    this.masterSrv.getAllEmployee().subscribe((res:Employee[])=>{
      this.employeeList=res;
    })
  }
  onDeptChange(){
  this.masterSrv.getChildDepartmentByParentId(this.parentDeptId).subscribe((res:APIResponse)=>{
    this.childDepartmentList=res.data;

  })
  }
  onSaveEmployee(){
    this.masterSrv.createNewEmployee(this.employeeObj).subscribe((res:Employee)=>{

        alert("Employee Created Successfully");
        this.employeeObj=new Employee();
        this.loadEmployee();


    })
  }
  onUpdateEmployee(){
    this.masterSrv.updateEmp(this.employeeObj).subscribe((res:Employee)=>{

        alert("Employee Updated Successfully");
        this.employeeObj=new Employee();
        this.loadEmployee();


    })
  }
  onDelete(id:number){
    const isDelete=confirm("Do you want to delete this employee?");
    if(isDelete){
      this.masterSrv.deleteEmp(id).subscribe((res:Employee)=>{
        this.loadEmployee();

      })

    }

  }


  onEdit(item:Employee){
    this.employeeObj=item;
    this.getAllChild();


  }


  formvisible(){
    this.isFormVisible=true;
  }
  formNotvisible(){
    this.isFormVisible=false;

  }
}
