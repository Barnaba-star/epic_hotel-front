import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { TitleComponent } from '../Utils/component/title/title.component';
import { MenuItem, SidenavComponent } from '../Utils/component/sidenav/sidenav.component';
import HeaderComponent from '../Utils/component/header/header.component';
import { FooterComponent } from '../Utils/component/footer/footer.component';
import { TabsComponent } from '../Utils/component/tabs/tabs.component';
import { FabButtonComponent } from '../Utils/component/fab-button/fab-button';
import { CommonModule } from '@angular/common';
import { DivOnePartition } from '../Utils/css/div-one-partition/div-one-partition';
import { AssignPermissionToRoleDto, Level, LevelDto, Permission, Role, RoleDto, WorkfowDto } from './model';
import { NoDataFound } from '../Utils/css/no-data-found/no-data-found';
import { FormField } from '../Utils/models/form-field';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../Utils/component/dialog/dialog';
import { SettingService } from './setting-service';
import { AlertService } from '../Utils/services/alert';
import { TableComponent } from '../Utils/component/table/table';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { PageableParam } from '../Utils/models/responces';
import { DeleteDialogComponent } from '../Utils/component/delete-dialog/delete-dialog';
import { DropdownselectionComponent } from "../Utils/component/dropdownselection/dropdownselection.component";
import { ButtonComponent } from "../Utils/component/button/button";
import { WorkflowDialog } from '../Utils/component/workflow-dialog/workflow-dialog';
import { ProcessType, WorkflowDTO } from '../workflow/workflow';
import { Workflow } from './model';
import { DivTwoEqualPartitionComponent } from "../Utils/css/div-two-equal-partition/div-two-equal-partition.component";
import { RecordtableComponent } from "../Utils/component/recordtable/recordtable";
import { MatDivider } from "@angular/material/divider";
import { RouterModule } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";




@Component({
  selector: 'app-settings',
  imports: [
    TitleComponent,
    SidenavComponent,
    HeaderComponent,
    FooterComponent,
    TabsComponent,
    FabButtonComponent,
    CommonModule,
    DivOnePartition,
    NoDataFound,
    TableComponent,
    DeleteDialogComponent,
    DropdownselectionComponent,
    ButtonComponent,
    DivTwoEqualPartitionComponent,
    RecordtableComponent,
    MatDivider,
    RouterModule,
    MatIconModule
],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
})
export class Settings implements OnInit {
  constructor(
    private dialog: MatDialog,
    private settingService: SettingService,
    private alertService: AlertService,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.role = true;
    this.findRolePage();
  }

  role: boolean = false;
  permission: boolean = false;
  workflow: boolean = false;
  levels: boolean = false;

titleHeader = 'Settings';
menu: MenuItem[] = [
  {
    label: 'System Setting',
    icon: 'setting',
  },
  {
    label: 'User Setting',
    icon: 'seting',
    route: '/usersetting' 
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
  tabs = [
    {
      label: 'Roles',
      icon: 'role',
    },
    {
      label: 'Permissions',
      icon: 'permission',
    },
    {
      label: 'Workflows',
      icon: 'workflow',
    },
    {
      label: 'Levels',
      icon: 'levels',
    },
  ];
  selectedTabIndex = 0;
  selectedIndexChange(index: number) {
    this.selectedTabIndex = index;
    console.log('Selected tab index:', index);
    this.role = false;
    this.permission = false;
    this.workflow = false;
    this.levels = false;

    if (index === 0) {
      this.role = true;
    } else if (index === 1) {
      this.permission = true;
      this.findRolesForPermission()
      this.findProcesses();
    } else if (index === 2) {
      this.workflow=true;
      this.findWorkflowRole();
      this.findWorkflowLevels();
      this.findWorkflowProcesses();
      this.findDistinctProcessTypes();
    } else if (index === 3) {
      this.levels = true;
      this.findLeavePage();
    }
  }

  /***************************************************************************** ROLES *****************************************************************/
  roles: Role[] = [];
  dataSourseRole = new MatTableDataSource<any>();
  @ViewChild('paginatorRole') paginatorRole!: MatPaginator;
  ngAfterViewInitRole() {
    this.dataSourseRole.paginator = this.paginatorRole;
  }
  roleFormFields: FormField[] = [
    { name: 'name', placeholder: 'Name', type: 'text', required: true },
    { name: 'code', placeholder: 'Code', type: 'text', required: true },
    { name: 'description', placeholder: 'Description', type: 'textarea', required: true },
  ];
  addRoleDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '1200px',
      data: {
        formTitle: 'Add New Role',
        fields: this.roleFormFields,
        action: 'Add',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result) {
        console.log('Form Data:', result);
        const roleDto: RoleDto = {
          name: result.name,
          code: result.code,
          description: result.description,
        };
        this.settingService.saveRole(roleDto).subscribe({
          next: (res) => {
            console.log('Role saved successfully:', res);
            this.roles = [...this.roles, res.data];
            this.dataSourseRole.data = this.roles;
            console.log('Updated list of roles:', this.roles);
            this.dataSourseRole.paginator = this.paginatorRole;
            this.alertService.show('success', 'success');
          },
          error: (err) => {
            console.error('Error saving role:', err);
          },
        });
      }
    });
  }

  editRoleDialog(role: Role) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '1200px',
      data: {
        formTitle: 'Update Role',
        fields: this.roleFormFields,
        formData: [role],
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result) {
        console.log('Form Data:', result);
        const roleDto: RoleDto = {
          uid: role.uid,
          name: result.name,
          code: result.code,
          description: result.description,
        };
        this.settingService.saveRole(roleDto).subscribe({
          next: (res) => {
            console.log('Role saved successfully:', res);
            const updatedRole = res.data;

            const index = this.roles.findIndex((item) => item.uid === updatedRole.uid);

            if (index !== -1) {
              this.roles[index] = updatedRole;
            } else {
              this.roles.push(updatedRole);
            }
            this.dataSourseRole.data = [...this.roles];

            console.log('Updated list of roles:', this.roles);
            this.dataSourseRole.paginator = this.paginatorRole;
            this.alertService.show('success', 'success');
          },
          error: (err) => {
            console.error('Error saving role:', err);
          },
        });
      }
    });
  }

  currentPageRole: number = 0;
  searchParamRole: string = '';
  paramsRole: PageableParam = {
    searchParam: this.searchParamRole,
    page: this.currentPageRole,
    size: 100,
    sortBy: 'createdAt',
    direction: 'ASC',
  };

  findRolePage() {
    this.settingService.findRolePage(this.paramsRole).subscribe({
      next: (res) => {
        console.log('Page of Roles:', res);
        this.roles = res.data;
        this.dataSourseRole.data = this.roles;
        this.dataSourseRole.paginator = this.paginator;
      },
      error: (err) => {
        console.error('Error fetching page of Role:', err);
      },
    });
  }

  onSearchRole(searchValue: string) {
    const params: PageableParam = {
      searchParam: searchValue,
      page: 0,
      size: 100,
      sortBy: 'createdAt',
      direction: 'ASC',
    };
    this.settingService.findRolePage(params).subscribe({
      next: (res) => {
        console.log('Page of levels:', res);
        this.roles = res.data;
        this.dataSourseRole.data = this.roles;
        this.dataSourseRole.paginator = this.paginator;
      },
      error: (err) => {
        console.error('Error fetching page of Role:', err);
      },
    });
  }

  onEditRole(role: Role) {
    const dialodRef = this.dialog.open(DialogComponent, {
      width: '1200px',
      data: {
        fields: this.roleFormFields,
        formData: role,
        formTitle: 'Edit Role',
      },
    });

    dialodRef.afterClosed().subscribe((result) => {
      if (result) {
        const roleDto: RoleDto = {
          uid: result.uid,
          name: result.name,
          code: result.code,
          description: result.description,
        };
        this.settingService.saveRole(roleDto).subscribe({
          next: (res) => {
            console.log('Role updated successfully:', res);
            const updatedRole = res.data;
            const index = this.roles.findIndex((item) => item.uid === updatedRole.uid);
            if (index !== -1) {
              this.roles[index] = updatedRole;
            } else {
              this.roles.push(updatedRole);
            }
            this.dataSourseRole.data = [...this.roles];
            this.dataSourseRole.paginator = this.paginatorRole;
            this.alertService.show('success', 'success');
          },
          error: (err) => {
            console.error('Error updating role:', err);
          },
        });
      }
    });
  }


showDeleteRole: boolean = false;
roleUid:string='';
roleToDelete:Level={};
onRequestToDeleteRole(role:Role){
this.showDeleteRole=true;
this.roleUid = role.uid !;

}

  deleteRole() {
  this.showDeleteRole=false;
   console.log('Role to delete 1:', this.roleUid);
    this.settingService.deleteRole(this.roleUid).subscribe({
      next: (res) => {
        console.log('Role to delete:', this.roleUid);
        console.log('Role deleted successfully:', res);
        this.roles = this.roles.filter((item) => item.uid !== this.roleUid);
        this.dataSourseRole.data = [...this.roles];
        this.dataSourseRole.paginator = this.paginator;
        this.alertService.show('success', 'success');
        this.roleUid = '';
      },
      error: (err) => {
        console.error('Error deleting level:', err);
      },
    });
  }

oncDeleteRoleCancelled(){
  this.showDeleteRole=false;
}


/****************************************************************************  PERMISSIONS********************************************************** */

processes:any[]=[];
rolesForPermisions: any[]=[];
selectedProcess = '';
selectedRole = '';
findProcesses(){
  this.settingService.findProcesses().subscribe({
    next:(res)=>{
      console.log('List of processes:', res);
      this.processes = res.data;
      this.processes = this.processes.map(proc=>{
        return {label:proc.name, value:proc.name}
      })
      console.log('Mapped processes:', this.processes);
    },
    error:(err)=>{
      console.error('Error fetching list of processes:', err);
    }
  });
}

  permissionsByModule: Permission[] = [];
  onProcessChange(value: string) {
    console.log('Selected Process:', value);
    this.selectedProcess = value;
    this.settingService.findPermissionsByModule(this.selectedProcess).subscribe({
      next:(res)=>{
        this.permissionsByModule = res.data;
        console.log('Permissions Found:', this.permissionsByModule);
      },
      error:(err)=>{
        console.error('Error fetching permissions:', err);
      }
    });
  }
  permissionsByRole: Permission[] = [];
  onRoleChange(value: string) {
    console.log('Selected Role:', value);
    this.selectedRole = value;
    this.settingService.findPermissionByRoleUID(value).subscribe({
      next:(res)=>{
        this.permissionsByRole = res.data;
        console.log('Role Details:', this.permissionsByRole);
      },
      error:(err)=>{
        console.error('Error fetching role details:', err);
      }
    })
  }
showPermissions:boolean=false;
loadCompiledPermissions(){
this.showPermissions=true;
}

checkIfRoleContainPermission(permission: Permission): boolean {
  if (!permission || !this.permissionsByRole) return false;

  return this.permissionsByRole.some(p => p && p.uid === permission.uid);
}

onPermissionToggle(permission: Permission, event: Event) {
  const checked = (event.target as HTMLInputElement).checked;

  if (checked) {
    if (!this.permissionsByRole.some(p =>p && p.uid === permission.uid)) {
      this.permissionsByRole.push(permission);
      console.log('Permission by Role', this.permissionsByRole)
    }
  } else {
    this.permissionsByRole = this.permissionsByRole.filter(p =>p && p.uid !== permission.uid);
    console.log('Permission by Role', this.permissionsByRole)
  }
}


saveRoleAndPermissions(){
const assignPermissionToRoleDto:AssignPermissionToRoleDto={
  roleUID: this.selectedRole,
  permissions: this.permissionsByRole
}

this.settingService.assignPermissionToRole(assignPermissionToRoleDto).subscribe({
  next: (res)=> {
    if(res){
      this.alertService.show('success', 'success');
      this.showPermissions=false;
   
      this.selectedProcess = '';
      this.selectedRole = '';
      this.permissionsByModule=[];
      this.permissionsByRole=[];
      console.log('Permissions Saved', res.data)
    }
  },

  error: (err)=>{
    console.error('Error occured', err)
  },
})

console.log('Permissions To Save', this.permissionsByRole)
}

findRolesForPermission(){
this.settingService.findRoles().subscribe({
  next: (res)=>{
    console.log('Roles Found', res.data)
    this.rolesForPermisions = res.data
    this.rolesForPermisions = this.rolesForPermisions.map(role=>{
      return {label:role.code, value:role.uid}
    })
    console.log('Mapped Roles', this.rolesForPermisions)  
  },
  error: (err)=>{
      console.error('Error in Fetching Roles',err);
    }
  
})
}

  /***************************************************************************** LEVELS ************************************************************* */
  listOfLevels: Level[] = [];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  levelFormFields: FormField[] = [
    { name: 'name', placeholder: 'Name', type: 'text', required: true },
    { name: 'code', placeholder: 'Code', type: 'text', required: true },
    { name: 'description', placeholder: 'Description', type: 'textarea', required: true },
  ];

  tableConfig = {
    displayedColumns: ['name', 'code', 'description'],
    columnHeaderMap: {
      fullName: 'Name',
      email: 'Code',
      gender: 'Description',
    },
  };

  addLevelDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '1200px',
      data: {
        formTitle: 'Add New Level',
        fields: this.levelFormFields,
        action: 'Add',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result) {
        console.log('Form Data:', result);
        const levelDto: LevelDto = {
          name: result.name,
          code: result.code,
          description: result.description,
        };
        this.settingService.saveLevel(levelDto).subscribe({
          next: (res) => {
            console.log('Level saved successfully:', res);
            this.listOfLevels = [...this.listOfLevels, res.data];
            this.dataSource.data = this.listOfLevels;
            console.log('Updated list of levels:', this.listOfLevels);
            this.dataSource.paginator = this.paginator;
            this.alertService.show('success', 'success');
          },
          error: (err) => {
            console.error('Error saving level:', err);
          },
        });
      }
    });
  }
  currentPage: number = 0;
  searchParam: string = '';
  params: PageableParam = {
    searchParam: this.searchParam,
    page: this.currentPage,
    size: 100,
    sortBy: 'createdAt',
    direction: 'ASC',
  };

  onSearch(searchValue: string) {
    const params: PageableParam = {
      searchParam: searchValue,
      page: 0,
      size: 100,
      sortBy: 'createdAt',
      direction: 'ASC',
    };
    this.settingService.findLeavePage(params).subscribe({
      next: (res) => {
        console.log('Page of levels:', res);
        this.listOfLevels = res.data;
        this.dataSource.data = this.listOfLevels;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.error('Error fetching page of levels:', err);
      },
    });
  }

  findLeavePage() {
    this.settingService.findLeavePage(this.params).subscribe({
      next: (res) => {
        console.log('Page of levels:', res);
        this.listOfLevels = res.data;
        this.dataSource.data = this.listOfLevels;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.error('Error fetching page of levels:', err);
      },
    });
  }

  levelData: Level = {};
  editLevelDialog(level: Level) {
    this.levelData = level;
    console.log('Editing level:', this.levelData);
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '1200px',
      data: {
        formTitle: 'Update Level',
        fields: this.levelFormFields,
        formData: [this.levelData],
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result) {
        console.log('Form Data:', result);
        const levelDto: LevelDto = {
          uid: level.uid,
          name: result.name,
          code: result.code,
          description: result.description,
        };
        this.settingService.saveLevel(levelDto).subscribe({
          next: (res) => {
            console.log('Level saved successfully:', res);
            const updatedLevel = res.data;

            const index = this.listOfLevels.findIndex((item) => item.uid === updatedLevel.uid);

            if (index !== -1) {
              this.listOfLevels[index] = updatedLevel;
            } else {
              this.listOfLevels.push(updatedLevel);
            }
            this.dataSource.data = [...this.listOfLevels];

            console.log('Updated list of levels:', this.listOfLevels);
            this.dataSource.paginator = this.paginator;
            this.alertService.show('success', 'success');
          },
          error: (err) => {
            console.error('Error saving level:', err);
          },
        });
      }
    });
  }
  showDeleteLevel: boolean = false;
  levelUid: string = '';
  levelToDelete: Level = {};
  onRequestToDeleteLevel(level: Level) {
    this.showDeleteLevel = true;
    this.levelUid = level.uid!;
  }

  deleteLevel() {
    this.showDeleteLevel = false;
    console.log('Level to delete 1:', this.levelUid);
    this.settingService.deleteLevel(this.levelUid).subscribe({
      next: (res) => {
        console.log('Level to delete:', this.levelUid);
        console.log('Level deleted successfully:', res);
        this.listOfLevels = this.listOfLevels.filter((item) => item.uid !== this.levelUid);
        this.dataSource.data = [...this.listOfLevels];
        this.dataSource.paginator = this.paginator;
        this.alertService.show('success', 'success');
        this.levelUid = '';
      },
      error: (err) => {
        console.error('Error deleting level:', err);
      },
    });
  }

  oncDeleteCancelled() {
    this.showDeleteLevel = false;
  }

/**************************************************************************  WORKFLOW *********************************************** */
workflowssss:any[]=[];
workflowFormFields:FormField[]=[

 {
      name: 'processType',
      placeholder: 'Process',
      type: 'select',
      required: true,
      options: [],
      onChange: (val) => {
        if (val) {
          this.findProcessFlowActionsByProcessType(val);
        }
      },
    },
  {
      name: 'sequence',
      placeholder: 'Sequence',
      type: 'number',
      required: true,
    },
 {
      name: 'roles',
      label: 'Roles',
      placeholder: ' Roles',
      type: 'checkbox-group',
      required: true,
      options: [],
    },

 {
      name: 'levels',
      label: 'Levels',
      placeholder: 'Levels',
      type: 'checkbox-group',
      required: true,
      options: [],
    },

    {
      name: 'actions',
      label: 'Actions',
      placeholder: ' Actions',
      type: 'checkbox-group',
      required: true,
      options: [],
    },

  {
      name: 'status',
      placeholder: '',
      type: 'radio',
      required: true,
      options: [
        { label: 'start', value: 'start' },
        { label: 'progress', value: 'progress' },
        { label: 'end', value: 'end' },
      ],
    },
   
];
workflowForms: WorkflowDTO[] = [];
workflows:Workflow[]=[];
 dataSourceWorkflow = new MatTableDataSource<any>();
  @ViewChild('paginatorWorkflow') paginatorWorkflow!: MatPaginator;
  ngAfterViewInitWorkflow() {
    this.dataSourceWorkflow.paginator = this.paginatorWorkflow;
  }
addWorkflowDialog() {
  this.workflowForms = [{}]; 
  const dialogRef = this.dialog.open(WorkflowDialog, {
    width: '1200px',
    data: {
      formTitle: 'Workflow Setting',
      fields: this.workflowFormFields,
      formData: this.workflowForms,
      showAddButton: true,
      showDeleteButton: true,
      showSaveALLButton: true,
    }
  });
  const instance = dialogRef.componentInstance;
  instance.addFormEvent.subscribe(() => this.workflowForms.push({}));
  instance.deleteFormEvent.subscribe(i => this.workflowForms.splice(i, 1));
  dialogRef.afterClosed().subscribe(result => {
  if (result) {
    this.workflowForms = result; 
    console.log('Final forms submitted to Save:', this.workflowForms);
    this.settingService.saveWorkflow(this.workflowForms).subscribe({
      next:(res)=>{
        if(res.data){
          this.alertService.show('success', 'success')
          this.dataSourceWorkflow.data=res.data
          this.cdr.detectChanges();
          console.log('Workflows saved', this.dataSourceWorkflow)
        }
      },
      error:(err)=>{console.error('error', err)}
    })
  }
});
}

workflowRoles:Role[]=[];
findWorkflowRole(){
this.settingService.findRoles().subscribe({
  next:(res)=>{
    if(res){
    const optionsRole = res.data.map((w: { name: any; uid: any; }) => ({
          label: w.name,
          value: w.uid
        }));
    const roleFields = this.workflowFormFields.find(field=> field.name==='roles');
    if(roleFields){
        roleFields.options = optionsRole;
      }
    }
  },
});
}

findWorkflowLevels(){
this.settingService.findLevels().subscribe({
    next: (res)=>{
      if(res){
        const optionsLevel = res.data?.map(l =>({
            label: l.name,
            value: l.uid,
        }));

      const fieldLevel =  this.workflowFormFields.find(field=> field.name==='levels');
      if(fieldLevel){
        fieldLevel.options = optionsLevel;
      }
      }
    },
    error: (error)=>{
      console.error('Error Occurred', error);
    }
  });
}

findWorkflowProcesses(){
this.settingService.findProcesses().subscribe({
next:(res)=>{
  if(res){
    console.log("Process", res.data)
    const optionsProcess = res.data.map((p: { processType: any; uid: any; }) => ({
    label: p.processType,
    value: p.processType,
  }));

  const processField = this.workflowFormFields.find(field=>field.name === 'processType');
  if(processField){
      processField.options = optionsProcess;
    }
  }
},
error: (err)=>{console.error('Error', err)}
});
}


findProcessFlowActionsByProcessType(processType:ProcessType){
this.settingService.findProcessFlowActionsByProcessType(processType).subscribe({
  next: (res)=>{
    if(res){
      const optionsAction = res.data?.map(a=>({
        label: a.actionType,
        value: a.uid,
      }));
      const actionField = this.workflowFormFields.find(field=> field.name === 'actions');
      if(actionField){
        actionField.options = optionsAction;
      }
    }
  },

  error:(e)=>{console.error(e)}
})
}


tableConfigWorkflow = {
    displayedColumns: ['processType', 'sequence', 'status'],
    columnHeaderMap: {
      processType: 'Process Type',
      sequence: 'Sequence',
      status: 'Status',
    },
  };

onDeleteRequestWorkflow(workflow:Workflow){

if(workflow){
    this.workflowUID=workflow.uid!;
    this.showDeleteWorkflowDialog=true;
  }
}
confirmDeleteWorkflow(){
this.deleteWorkflowByUID(this.workflowUID);
 this.showDeleteWorkflowDialog=false;
}
showDeleteWorkflowDialog:boolean=false;

cancelDeleteWorkflow(){
  this.workflowUID=''
  this.showDeleteWorkflowDialog=false;
}
workflowUID:string='';
deleteWorkflowByUID(workflowUid:string){
this.settingService.deleteWorkflowByUID(workflowUid).subscribe({
  next:(res)=>{
    if(res.data){
      this.alertService.show('success', 'success')
      const updated = this.workflowsData.filter(d=> d.uid !== res.data.uid);
      this.workflowsData = updated;
      this.cdr.detectChanges()
    }
  },
  error: (e)=>{console.error('Error Occurred', e)}
});
}

recordColumns = [
  { field: 'processType', header: 'Process Flow ' },
  { field: 'description', header: 'Description' },
];
processType:any[]=[];
findDistinctProcessTypes(){
  this.settingService.findDistinctProcessTypes().subscribe({
  next:(res)=>{
    if(res.data){
      console.log('Process Type:', res.data);
      this.processType = res.data;
    }
  }
})
}

onClickProcess(process:any){
this.workflowsData=[];
if(process){
    this.findWorkflowByProcessType(process.processType);
  }
}

workflowsData:Workflow[]=[]
findWorkflowByProcessType(processType:ProcessType){
  this.settingService.findWorkflowByProcessType(processType).subscribe({
    next: (res)=>{
      if(res.data){
        console.log("Workflows Found", res.data);
        this.workflowsData = res.data;
      }
    },
    error: (err)=>{console.error('Error Occurred', err)}
  })
}

openWorkflowEditDialog(workflow:Workflow){
  const dialogRef = this.dialog.open(WorkflowDialog, {
    width: '1200px',
    data: {
      formTitle: 'Workflow Setting',
      fields: this.workflowFormFields,
      formData: [workflow],
      showAddButton: true,
      showDeleteButton: true,
    }
  });
  dialogRef.afterClosed().subscribe((result)=>{
    if(result){
      const workflowDto:WorkfowDto={
        uid:result.uid,
        processType: result.processType,
        status:result.status,
        actions:result.actions,
        levels: result.levels,
        roles:result.roles,
        sequence:result.sequence
      }

      this.settingService.updatingWorkflow(workflowDto).subscribe({
        next:(res)=>{
          if(res.data){
            console.log('Data Updated For Workflow', res.data);
            this.alertService.show('success', 'success');
          }
        },
        error:(error)=>{console.error('Error Occurred when saving or updating workflow')}
      })
    }
  })
}
workflowDataDto:WorkflowDTO[] = [];
openAllWorkflowEditDialog(){
  const dialogRef = this.dialog.open(WorkflowDialog, {
    width: '1200px',
    data: {
      formTitle: 'Workflow Setting',
      fields: this.workflowFormFields,
      formData: this.workflowsData,
      showAddButton: true,
      showDeleteButton: true,
    }
  });
dialogRef.afterClosed().subscribe((result)=>{
    if(result){
      this.workflowForms=[];
      this.workflowForms = result.data
      this.settingService.saveWorkflow(this.workflowDataDto).subscribe({
        next:(res)=>{
          if(res.data){
            console.log("Updated Data Fresh Data", res.data)
          }
        }
      })
    }
  })
}
}
