import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';


@Component({
  selector: 'app-show-dep',
  templateUrl: './show-dep.component.html',
  styleUrls: ['./show-dep.component.css']
})
export class ShowDepComponent implements OnInit {

  constructor(private service:SharedService) { }

  DepartmentList: any=[];
  ModalTitle:string='';
  dep:any;

  DepartmentIdFilter:string="";
  DepartmentNameFilter:string="";
  DepartmentListWithoutFilter:any=[];

  ActivateAddEditDepComp:boolean=false;

  ngOnInit(): void {
    this.refreshDepList();
  }

  addClick(){
    this.dep={
      DepartmentId:0,
      DepartmentName:""
    }
    this.ModalTitle="Add Department";
    this.ActivateAddEditDepComp=true; 
  }

  editClick(item:any){
    this.dep=item;
    this.ModalTitle="Edit Department";
    this.ActivateAddEditDepComp=true;
  }

  closeClick()
  {
    this.ActivateAddEditDepComp=false;
    this.refreshDepList();
  }

  deleteClick(DeptId:number)
  {
    if(confirm("Are you sure?")){
      this.service.deleteDepartment(DeptId).subscribe(data=>
          {
            alert(data.toString());
            this.refreshDepList();
          }
        )
    }
    
  }

  refreshDepList(){
    this.service.getDeptList().subscribe(data=>{
      this.DepartmentList=data;
      this.DepartmentListWithoutFilter=data;
    })
  }

  FilterFn()
  {
    var DepartmentIdFilter = this.DepartmentIdFilter;
    var DepartmentNameFilter = this.DepartmentNameFilter;

    this.DepartmentList = this.DepartmentListWithoutFilter.filter(function(e1:any){
      return e1.DepartmentId.toString().toLowerCase().includes(
        DepartmentIdFilter.toString().trim().toLowerCase()
      )&&
      e1.DepartmentName.toString().toLowerCase().includes(
        DepartmentNameFilter.toString().trim().toLowerCase()
      )
    });
  }

  sortResult(prop:any,asc:boolean)
  {
    this.DepartmentList = this.DepartmentListWithoutFilter.sort(function(a:any,b:any){
    if(asc)
    {
      return(a[prop]>b[prop])?1 : ((a[prop]<b[prop])?-1:0)
    }
    else
    {
      return(b[prop]>a[prop])?1 : ((b[prop]<a[prop])?-1:0)
    }
    })
  }
}
