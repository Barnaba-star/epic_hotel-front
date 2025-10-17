import { Component, OnInit, signal, ChangeDetectionStrategy, Input, EventEmitter, Output, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { TabsComponent } from '../../Utils/component/tabs/tabs.component';
import { StorageService } from '../../Utils/services/storage';

import { Authentication } from '../../Utils/services/authentication';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatDivider } from '@angular/material/divider';
import { MatExpansionModule } from "@angular/material/expansion";
import { ActionPanelComponent } from "../../Utils/component/action-panel/action-panel.component";
import { MatInputModule } from "@angular/material/input";
import { FormsModule } from '@angular/forms';
import { Action, ProcessFlowDTO, ProcessType } from '../workflow';
import { WorkflowService } from '../workflow-service';
import { AlertService } from '../../Utils/services/alert';

import { Attachment } from '../../Utils/models/attachments';
import { RecordtableComponent } from "../../Utils/component/recordtable/recordtable";
import { AttachmentViewerDialogComponent } from '../../Utils/component/attachment-viewer-dialog-component/attachment-viewer-dialog-component';
import { MatDialog } from '@angular/material/dialog';

import { Router } from '@angular/router';


@Component({
  selector: 'app-process-flow',
  imports: [TabsComponent, MatIconModule, CommonModule, MatDivider, MatExpansionModule, MatInputModule, FormsModule, MatExpansionModule],
  templateUrl: './process-flow.html',
  styleUrl: './process-flow.css',
 
})
export class ProcessFlow implements OnInit {
 readonly panelOpenState = signal(false);
person: any;
triggerFileInput() {
throw new Error('Method not implemented.');
}

  constructor(
    private storageService: StorageService,

    private authService: Authentication,
    private workflowService:WorkflowService,
    private alertService:AlertService,
    private dialog:MatDialog,
    private cdr: ChangeDetectorRef,
    private route:Router
  ) {}
  ngOnInit(): void {

    this.loggedUserRole = this.authService.getRoles();
    if (this.storageService.has('registration')) {
      this.loadRegistrationWorkflow();
    }
  }




  completeProcess() {
    console.log('Actions Completed')

  }


  tabs = [
    {
      label: 'Summary',
      icon: 'summary',
    },
    {
      label: 'Action',
      icon: 'action',
    },
    {
      label: 'History',
      icon: 'history',
    },
    {
      label: 'Personnel',
      icon: 'person',
    },
  ];
  selectedTabIndex = 0;
  onSelectedTabChange(index: number) {
    this.selectedTabIndex = index;

    if (this.selectedTabIndex === 0) {
      console.log('Selected Tab Index', this.selectedTabIndex);
 this.actionCompletion = false;
    }
    if (this.selectedTabIndex === 1) {
      console.log('Selected Tab Index', this.selectedTabIndex);
 this.actionCompletion = false;
    }
    if (this.selectedTabIndex === 2) {
      console.log('Selected Tab Index', this.selectedTabIndex);
      this.findProcessFlowHistory();
       this.actionCompletion = false;
    }
    if (this.selectedTabIndex === 3) {
      console.log('Selected Tab Index', this.selectedTabIndex);
       this.actionCompletion = false;
    }
  }

  @Input() actionsData: Action[] = [];
  @Output() actionSelected = new EventEmitter<any>();

  takeAction(action: any) {
    this.actionSelected.emit(action);
  }




  processType: ProcessType =ProcessType.REGISTRATION;
  processFlowRole: string = '';
  loggedUserRole: string = '';
  processFlowPersonnelUID: string = '';
  workflowStatus:string='';
  actionMode:boolean=false;
  actionCompletion:boolean=false;
  actionComment:string='';
  refUID:string='';
  action:string='';
  processNO:string='';
  attachments:Attachment[]=[];

 imageUrl: string | null = null;
 regNumber:string='';

 completeAction() {
    this.actionCompletion = true;
  }

  loadRegistrationWorkflow() {
    this.processFlowRole=''
    const processFlowData = this.storageService.load<any>('registration');
  
  }
submitAction(){
this.forwardOrRollbackProcess();
this.actionMode=false
console.log('Comment', this.actionComment)
this.actionComment=''

}
cancelAction(){
this.actionMode=false
this.actionCompletion=false
console.log('Comment', this.actionComment)
this.actionComment=''
}
forward(){
this.actionMode=true
this.action = 'forward'

}
rollback(){
this.actionMode=true
this.action='rollback'
this.actionCompletion=false;
}



forwardOrRollbackProcess(){
const processFlowDTO:ProcessFlowDTO={
  refUid:this.refUID,
  comment: this.actionComment,
  processType: this.processType,
  action: this.action
}
this.workflowService.forwardOrRollbackProcess(processFlowDTO).subscribe({
  next:(res)=>{
   if(res.data){
      this.processFlowRole=''
      this.processFlowRole = res.data.roles[0].name
      console.log('Workflow', res.data)
      this.alertService.show('success', 'success')
    }
  },
  error:(err)=>{console.error('Error occurred', err)}
})
}


 tableColumnsDepenants = [
    { field: 'firstName', header: 'First Name:' },
    { field: 'lastName', header: 'Last Name:' },
    { field: 'relationShip', header: 'Relation Ship' },
  ];


  tableColumnsAttachments = [
    { field: 'name', header: 'Name:' },
  ];



  tableColumnsPayments = [
    { field: 'paymentType', header: 'Type:' },
    { field: 'paymentDate', header: 'Date:' },
    { field: 'amount', header: 'Amount' },
  ];


 
historyData:any[]=[];
findProcessFlowHistory() {
  this.workflowService.findProcessFlowHistory(this.refUID, ProcessType.REGISTRATION).subscribe({
    next: (res) => {
      if (res.data) {
        console.log('Process Flow History', res.data);
        if (Array.isArray(res.data)) {
          const history: any[] = res.data.map((h,index) => ({
            index: index + 1,
            status: h.status,
            comment: h.comment,
            processType: h.processType,
            createdAt: h.createdAt,
            time: new Date().toISOString(),
            role: h.createdBy.roles[0].name,
            firstName: h.createdBy.personnel.fullName
          }));
          this.historyData=history;
          console.log('Mapped History:', this.historyData); 
        }
      }
    },
    error: (err) => {
      console.error('Error Occurred', err);
    }
  });
}




}


