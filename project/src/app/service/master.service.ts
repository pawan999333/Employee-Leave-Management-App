import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponse, Dashboard, EarnedLeave, Employee, LeaveRequest } from '../model/master';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class MasterService {
apiUrl:string='https://projectapi.gerasim.in/api/EmployeeManagement/';
loggedUserData:any;

  constructor(private http:HttpClient,private router:Router) {

        const localData=localStorage.getItem('leaveUser');
        if(localData){
          this.loggedUserData=JSON.parse(localData);
        }
       }


  getDepartment():Observable<APIResponse>{
    return this.http.get<APIResponse>(this.apiUrl + 'GetParentDepartment');
  }
  getAllChildDepartment():Observable<APIResponse>{
    return this.http.get<APIResponse>(this.apiUrl + 'GetAllChildDepartment');
  }
  getChildDepartmentByParentId(id:string):Observable<APIResponse>{
    return this.http.get<APIResponse>(this.apiUrl + 'GetChildDepartmentByParentId?deptId=' + id);
  }
  createNewEmployee(obj:Employee):Observable<Employee>{
    return this.http.post<Employee>(`${this.apiUrl}CreateEmployee` , obj);
  }
  getAllEmployee():Observable<Employee[]>{
    return this.http.get<Employee[]>(this.apiUrl + 'GetAllEmployees');
  }
  deleteEmp(id:number):Observable<Employee>{
    return this.http.delete<Employee>(this.apiUrl + 'DeleteEmployee/' + id);
  }
  updateEmp(emp:Employee):Observable<Employee>{
    return this.http.put<Employee>(this.apiUrl + 'UpdateEmployee/' + emp.employeeId, emp);
  }
  addEarnedLeave(emp:APIResponse):Observable<APIResponse>{
    return this.http.post<APIResponse>(this.apiUrl + 'AddNewEarnedLeave', emp);
  }
  getAllEarnedLeaves():Observable<APIResponse>{
    return this.http.get<APIResponse>(this.apiUrl + 'GetAllEarnedLeaves');
  }
  getLeaveType():Observable<APIResponse>{
    return this.http.get<APIResponse>(this.apiUrl + 'GetLeaveTypes');
  }
  newRequest(emp:LeaveRequest):Observable<APIResponse>{
    return this.http.post<APIResponse>(this.apiUrl + 'CreateNewLeaveRequest', emp);
  }
  GetAllLeaveRequestByEmpId(id:number):Observable<APIResponse>{
    return this.http.get<APIResponse>(this.apiUrl + 'GetAllLeaveRequestByEmpId?id=' + id);
  }
  GetAllLeaveRequest():Observable<APIResponse>{
    return this.http.get<APIResponse>(this.apiUrl + 'GetAllLeaveRequest');
  }

  ChangeLeaveStatus(leaveId:number,status:string):Observable<APIResponse>{
    return this.http.get<APIResponse>(this.apiUrl + 'ChangeLeaveStatus?leaveId='+ leaveId + '&status=' + status);
  }


  GetHRDashboard():Observable<Dashboard>{
    return this.http.get<Dashboard>(this.apiUrl + 'GetHRDashboard');
  }

  GetEmpployeeLeaveDashboard(id:number):Observable<Dashboard>{
    return this.http.get<Dashboard>(this.apiUrl + 'GetEmpployeeLeaveDashboard?id=' + id);
  }
}
