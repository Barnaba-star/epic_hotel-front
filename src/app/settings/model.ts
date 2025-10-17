import { ProcessType } from "../workflow/workflow";

export interface Model {
}

export interface Role {
  uid?: string;
  name?: string;
  description?: string;
  code?: string;
}

export interface RoleDto {
  uid?: string;
  name?: string;
  description?: string;
  code?: string;
}
export interface Level {
  uid?: string;
  name?: string;
  description?: string;
  code?: string;
}

export interface LevelDto {
  uid?: string;
  name?: string;
  description?: string;
  code?: string;
}

export interface Permission {
  uid?: string;
  name?: string;
  group?: string;
  module?: string;
}

export interface AssignPermissionToRoleDto {
    roleUID?:string;
   permissions?:Permission[]
}

export interface WorkfowDto{
  uid?: string;
  sequence?: number;
  actions?: string[];
  roles?:string[];
  levels?: string[];
  processType?:ProcessType;
  status?:string;
}

export interface Workflow{
uid?:string,
sequence?:number,
processType:ProcessType,
levels?:Level[],
roles?:Role[],
actions?:Action[],
}

export interface Action{
uid?:string,
processType?:ProcessType
name?:string

}

 export interface UserSettingDTo {
    uid?: string,
    username?: string,
    password?:string,
    roleUIDS?:string[]
    levelUIDS?:string[]
    isRoot?: boolean
    tenantId?:string
    personnelUID?: string
}

 export interface User {
    uid?: string,
    username?: string,
    role?:string
    level?:string
    isRoot?: boolean
    tenantId?:string
    personnel?: string
    isBlocked?:boolean
    checked?: boolean
}

export interface AssignUserRoleDTO{
   userUID:string,
   roleUIDS:string[],
}