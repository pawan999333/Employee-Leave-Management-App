export class Employee {
  employeeId: number;
  employeeName: string;
  contactNo: string;
  emailId: string;
  deptId: number;
  password: string;
  gender: string;
  role: string;

  constructor(){
    this.employeeId=0;
    this.employeeName='';
    this.contactNo='';
    this.emailId='';
    this.deptId=0;
    this.password='';
    this.gender='';
    this.role='Employee';
  }
}


export interface parentDept{
  departmentId: number,
  departmentName: string,
  departmentLogo: string
}

export interface childDept{

    childDeptId: number,
    parentDeptId: number,
    departmentName: string

}

export interface APIResponse{
  result:boolean,
  message:string,
  data:any
}

export interface LeaveType{
  leaveTypeId:number,
  typeName:string
}


export interface EarnedLeave{
  earnedLeaveId:number,
  employeeId:number,
  totalEarnedLeaves:number,
  totalSickEarnedLeaves:number,
  lastUpdatedDate:string,
  employeeName:string,
}

export interface LeaveRequest{
  leaveId:number,
  employeeId:number,
  leaveTypeId:number,
  startDate:string,
  endDate:string,
  status:string,
  reason:string,
  requestDate:string,
  employeeName:string,
  contactNo:string,
  typeName:string
}

export interface Dashboard{
  totalEmployee: number,
  totalLeaves: number,
  totalNewLeaves: number,
  totalApprovedLeaves: number
  totalCanceledLeave: number,
  earnedLeave:number
}
