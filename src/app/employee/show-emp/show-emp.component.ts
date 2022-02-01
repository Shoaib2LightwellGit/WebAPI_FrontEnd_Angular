import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';


@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.component.html',
  styleUrls: ['./show-emp.component.css']
})
export class ShowEmpComponent implements OnInit {

  constructor(private service:SharedService) { }

  EmployeeList: any=[];

  ModalTitle:string='';
  emp:any;
  ActivateAddEditEmpComp:boolean=false;

  ngOnInit(): void {
    this.refreshEmpList();
  }

  addClick(){
    this.emp={
      EmployeeId:0,
      EmployeeName:"",
      Department:"",
      DateOfJoining:"",
      PhotoFileName:"",
    }
    this.ModalTitle="Add Employee";
    this.ActivateAddEditEmpComp=true; 
  }

  editClick(item:any){
    this.emp=item;
    this.ModalTitle="Edit Employee";
    this.ActivateAddEditEmpComp=true;
  }

  closeClick()
  {
    this.ActivateAddEditEmpComp=false;
    this.refreshEmpList();
  }

  deleteClick(EmpId:number)
  {
    if(confirm("Are you sure?")){
      this.service.deleteEmployee(EmpId).subscribe(data=>
          {
            alert(data.toString());
            this.refreshEmpList();
          }
        )
    }
    
  }

  refreshEmpList(){
    this.service.getEmpList().subscribe(data=>{
      this.EmployeeList=data;
    })
  }

}
