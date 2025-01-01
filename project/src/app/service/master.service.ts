import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponse, Employee } from '../model/master';


@Injectable({
  providedIn: 'root'
})
export class MasterService {
apiUrl:string='https://projectapi.gerasim.in/api/EmployeeManagement/'
  constructor(private http:HttpClient) { }


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
}
