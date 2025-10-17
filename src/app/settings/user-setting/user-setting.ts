import { Component, OnInit, ViewChild } from '@angular/core';
import HeaderComponent from "../../Utils/component/header/header.component";
import { MenuItem, SidenavComponent } from '../../Utils/component/sidenav/sidenav.component';
import { TitleComponent } from "../../Utils/component/title/title.component";
import { TabsComponent } from "../../Utils/component/tabs/tabs.component";
import { FooterComponent } from "../../Utils/component/footer/footer.component";
import { FabButtonComponent } from "../../Utils/component/fab-button/fab-button";
import { FormField } from '../../Utils/models/form-field';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../Utils/component/dialog/dialog';
import { SettingService } from '../setting-service';
import { PageableParam } from '../../Utils/models/responces';
import { AssignUserRoleDTO, Role, UserSettingDTo } from '../model';
import { AlertService } from '../../Utils/services/alert';
import { User } from '../model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { TableComponent } from "../../Utils/component/table/table";
import { DeleteDialogComponent } from "../../Utils/component/delete-dialog/delete-dialog";
import { NoDataFound } from "../../Utils/css/no-data-found/no-data-found";
import { MatCard } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { DivOnePartition } from "../../Utils/css/div-one-partition/div-one-partition";
import { ButtonComponent } from "../../Utils/component/button/button";
import { CommonModule } from '@angular/common';
import { MatDivider } from "@angular/material/divider";

@Component({
  selector: 'app-user-setting',
  imports: [HeaderComponent, SidenavComponent, TitleComponent, TabsComponent, FooterComponent, FabButtonComponent, TableComponent, DeleteDialogComponent, NoDataFound, MatIconModule, CommonModule, ButtonComponent, MatDivider],
  templateUrl: './user-setting.html',
  styleUrl: './user-setting.css'
})
export class UserSetting implements OnInit{
  field: any;
  filteredOptions$: any;
  searchControl: any;

constructor(private dialog:MatDialog, private settingService:SettingService, private alertService:AlertService){}
  ngOnInit(): void {
    this.loadAllLevels();
    this.loadAllUser();
    this.loadRoles();
  }
titleHeader = 'Settings';
menu: MenuItem[] = [
  {
    label: 'System Setting',
    icon: 'setting',
    route: '/settings' 
  },
  {
    label: 'User Setting',
    icon: 'seting',
  },
 {
    label: 'Room Setting',
    icon: 'roomseting',
    route: '/roomsetting' 
  },
];

onMenuItemClicked(item: MenuItem) {
  console.log('Menu Item Clicked:', item);
}

  tabs = [{
      label: 'Users',
      icon: 'user',
    },
    {
      label: 'Enable/Disable Account',
      icon: 'person',
    },
    {
      label: 'Assign/Remove Role',
      icon: 'role',
    },
  ];
  selectedTabIndex = 0;
  selectedIndexChange(index: number) {
  this.selectedTabIndex = index;
  if(this.selectedTabIndex === 0){
    this.AllRoles=[];
    this.showAllRoles=false;
  }
  if(this.selectedTabIndex === 1){
    this.AllRoles=[];
    this.showAllRoles=false;
  }
if(this.selectedTabIndex === 1){
    this.showAllRoles=false;
  }
}

/**************************************************************************************************************************** USER METHODS**************************************************************** */
userSettingFormField:FormField[]=[
{name:'personnelUID', placeholder:'Personnel', type:'select', options:[], required:true},
{name:'isRoot', placeholder:'is Root', type:'select', options:[{label:'Yes', value:'true'}, {label:'No',value:'false' }]},
{name:'roles', placeholder:'Roles', type:'checkbox-group', options:[], required:true},
{name:'levels', placeholder:'Levels', type:'checkbox-group', options:[], required:true},
{name:'tenantID', placeholder:'TenantID', type:'select', required:true, options:[{label:'Nasaba', value:'Nasaba'}]}
]
loadAllLevels(){
this.settingService.findLevels().subscribe({
  next:(res)=>{
      if(res.data){
        console.log('Levels Found', res.data);
        const levelOtions = res.data.map(l=> ({
          label: l.name,
          value: l.uid,
        }));
       const levelField = this.userSettingFormField.find(field=> field.name==='levels')
       if(levelField){
          levelField.options = levelOtions;
        }
      }
    }
})
}

AllRoles:Role[]=[];
loadRoles(){
this.settingService.findRoles().subscribe({
next: (res)=>{
    if(res.data){
      this.AllRoles = res.data;
      console.log('Roles Data Roles', this.AllRoles);
      const roleOptions = res.data.map( (r: { name: any; uid: any; })=> ({
        label: r.name,
        value: r.uid,
      }));
      const rolefield = this.userSettingFormField.find(u=> u.name === 'roles');
      if(rolefield){
        rolefield.options = roleOptions;
      }
    }
  }
})
}




user:User[]=[];
userEnable:User[]=[];
dataSource = new MatTableDataSource<any>();
 @ViewChild('paginatorUser') paginatorUser!: MatPaginator;
  ngAfterViewInitUser() {
    this.dataSource.paginator = this.paginatorUser;
  }
tableConfigUser= {
    displayedColumns: ['personnel', 'username',  'level', 'isRoot'],
    columnHeaderMap: {
      personnel: 'personnel',
      username: 'Email',
      level: 'level',
      isRoot: 'isRoot',
    },
  };
addUserDialog(){
const dialoagRef = this.dialog.open(DialogComponent, {
    width: '1200px',
    data: {
    fields: this.userSettingFormField,
    formTitle: 'Register User'
    }
  });
dialoagRef.afterClosed().subscribe((result)=>{
  if(result){
    const userSettingDto:UserSettingDTo={
      isRoot:result.isRoot,
      roleUIDS:result.roles,
      levelUIDS:result.levels,
      tenantId:result.tenantID,
      personnelUID: result.personnelUID,
    }

   this.settingService.registerNewUser(userSettingDto).subscribe({
    next: (res)=>{
      if(res.data){
          this.alertService.show('success', 'success')
          const userData:User={
          uid:res.data.uid,
          isRoot:res.data.isRoot,
          role:res.data.roles[0]?.code,
          level:res.data.levels[0]?.name,
          personnel:res.data.personnel.firstName + '  ' + res.data.personnel.lastName,
          tenantId:res.data.tenantId,
            
        }
       console.log('Data in User List', res.data);
       this.user = [userData, ...this.user]
       this.dataSource.data = this.user;
       console.log('Response Data', this.dataSource.data);
      }
    },
   error:(err)=>{console.error('Error Occurred', err)}
  })
  }  
})
}



searchUser:string='';
pageableParamUser:PageableParam={
searchParam:this.searchUser,
page:0,
size:10,
}

loadAllUser(){
this.settingService.findUserPAGE(this.pageableParamUser).subscribe({
next:(res)=>{
  if(res.data){
 console.log('Users Found', res.data)
 const users: User[] = res.data.map(r => ({
  uid: r.uid ?? '',
  username: r.username ?? '',
  role: r.roles?.[0]?.name ?? 'Unknown Role',
  level: r.levels?.[0]?.name ?? 'Unknown Level',
  isRoot: r.isRoot ?? false,
  tenantId: r.tenantId ?? '',
  personnel: `${r.personnel?.firstName ?? ''} ${r.personnel?.lastName ?? ''}`,
  isBlocked: r.isBlocked ?? false,
  checked: r.isBlocked === true,
}));

this.user = users;
this.dataSource.data = this.user;
 console.log('Users Found In CONNSTS', this.user)
this.dataSource.paginator = this.paginatorUser;

  }
}
});
}

onEditUserDialog(user:User){
if(user){
console.log('User To Edit', user)
}
const dialogRef = this.dialog.open(DialogComponent, {
  width: '1200px',
  data: {
      fields: this.userSettingFormField,
      formData: user,
      formTitle: 'Edit User'
  }
});
dialogRef.afterClosed().subscribe((result)=>{
if(result){
  console.log('Result', result);
  const userDto:UserSettingDTo={
    uid: result.uid,
    roleUIDS: result.roles,
    levelUIDS: result.levels,
    tenantId: result.tenantId,
    isRoot: result.isRoot,
    personnelUID: result.personnel,
  }
   this.settingService.registerNewUser(userDto).subscribe({
    next: (res)=>{
      if(res.data){
          this.alertService.show('success', 'success')
          const userData:User={
          uid:res.data.uid,
          username:res.data.username,
          isRoot:res.data.isRoot,
          role:res.data.roles[0]?.code,
          level:res.data.levels[0]?.name,
          personnel:res.data.personnel.firstName + '  ' + res.data.personnel.lastName,
          tenantId:res.data.tenantId, 
        }
       console.log('Data in User List', res.data);
       this.user = [userData, ...this.user]
       this.dataSource.data = this.user;
       console.log('Response Data', this.dataSource.data);
      }
    },
   error:(err)=>{console.error('Error Occurred', err)}
  })
}
});
}



deleteUser:boolean=false;
userRefUID:string=''
requestToDeleteUser(user:User){
  if(user){
    console.log("User to Delete", user)
    this.deleteUser=true,  
    this.userRefUID = user.uid!
  }
}

coonfirmDeleteUser(){
this.deleteUser=false;
this.settingService.deleteUser(this.userRefUID).subscribe({
  next: (res)=>{
    if(res.data){
      this.dataSource.data = this.dataSource.data.filter(r=> r.uid !== res.data.uid);
      this.alertService.show('success', 'success')
    }  
  },
  error: (err)=>{console.error('Error occurred when Deleting User', err)}
})
}
oncancellDeleteuser(){
this.userRefUID = '';
this.deleteUser = false;
}

 onSearchUser(searchValue: string) {
    const params: PageableParam = {
      searchParam: searchValue,
      page: 0,
      size: 100,
      sortBy: 'createdAt',
      direction: 'ASC',
    };
this.settingService.findUserPAGE(params).subscribe({
next:(res)=>{
  if(res.data){
  console.log('Users Found', res.data)
  const users:User[]=res.data.map(r=>({
    uid:r.uid,
    username: r.username,
    role: r.roles?.[0].name,
    level: r.levels?.[0].name,
    isRoot: r.isRoot,
    tenantId: r.tenantId,
    personnel: r.personnel.firstName +  '   '  +  r.personnel.lastName,
  }));
  this.dataSource.data = [];
  this.user = users;
  this.dataSource.data = this.user
  }
}
});
}



/*********************************************************************************************************************************   ASSIGN OR REMOVE ROLE   ********************************* */

userUID:string=''
userRoles:Role[]=[]
showAllRoles:boolean=false;
userName:string='';
userUserName:string=''
findRoleByUserUID(user:User){
console.log('User', user)
this.userName = user.personnel !
this.userUID= user.uid !
this.userUserName = user.username !
  this.settingService.findUserByUID(this.userUID).subscribe({
  next:(res)=>{
    if(res.data){
     this.loadRoles();
      this.userRoles=res.data.roles;
      this.showAllRoles=true;
      console.log('ROLES FOUND DATA', this.userRoles)
    }
  },
  error:(err)=>{console.error('Error Occurred', err)}
});
}

checkIfUserContainsThisRole(role: Role): boolean {
  return this.userRoles.some(r => r.uid === role.uid);
}

saveRole() {
  console.log('User Roles:', this.userRoles);
  this.showAllRoles=false;
  const assignUserRoleDTO: AssignUserRoleDTO = {
    userUID: this.userUID,
    roleUIDS: this.userRoles
      .filter(role => !!role?.uid)
      .map(role => role.uid as string)
  };

this.settingService.assignOrUnAssignUserRole(assignUserRoleDTO).subscribe({
  next:(res)=>{
    if(res.data){
      console.log('Roles save', res.data);
      this.alertService.show('success', 'success')
    }
  },
  error: (err)=>{console.error('Error Occurred', err)}
});
}

cancellSaveRole(){
this.showAllRoles=false;
}



onRoleToggle(role: Role, event: Event) {
  const checked = (event.target as HTMLInputElement).checked;

  if (checked) {
    if (!this.userRoles.some(r => r && r.uid === role.uid)) {
      this.userRoles.push(role);
      console.log('Role Added', role.name);
    }
  } else {
    this.userRoles = this.userRoles.filter(r => r && r.uid !== role.uid);
    console.log('Role Removed', role.name);
  }
}





/**********************************************************************************************************  ENABLE OR DISABLE ACCOUNT. **************************************************/

onCheckboxChanged(event: { row: User, checked: boolean }) {
  console.log('Checkbox changed:', event);
  event.row.checked = event.checked;
  event.row.isBlocked = event.checked;
  
this.settingService.enableOrDisableAccount(event.row.uid !, event.checked).subscribe({
  next: (res)=>{
    if(res.data){
      this.alertService.show('success', 'success')
    }
  },

  error:(err)=>{console.error('Error Occurred', err)}
});
}



}


