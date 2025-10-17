import { User } from "../settings/model";

 export interface WorkflowDTO{
    personnelUid?:string;
    processType?:ProcessType;
    registrationUid?:string;
    
}

export enum ProcessType {
  REGISTRATION = 'REGISTRATION',
  
}

export interface ProcessFlowDTO{
   refUid:string
   comment:string
   processType:ProcessType
   action:string
}

export interface Action{
name?: string
processType?: ProcessType
uid?: string
}

export interface ProcessFlowHistory{
comment?: string
createdAt?: Date
createdBy?: User
processType?:ProcessType
status?: string
uid?: string
}