import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AssignPermissionToRoleDto, AssignUserRoleDTO, LevelDto, RoleDto, UserSettingDTo } from './model';
import { Observable } from 'rxjs';
import { PageableParam, Response, ResponseList, ResponsePage } from '../Utils/models/responces';
import { ProcessType, WorkflowDTO } from '../workflow/workflow';
import { environment } from '../Utils/enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class SettingService {
constructor(private http:HttpClient){}
private baseURL = environment.baseApiUrl;
private levelUrl = `${this.baseURL}/level`
private roleUrl = `${this.baseURL}/role`
private processUrl = `${this.baseURL}/process`
private processFlowUrl = `${this.baseURL}/processFlow`
private workflowUrl = `${this.baseURL}/workflow`
private userSettingUrl =`${this.baseURL}/userSetting`

/*************************************************************************************************************************** LEVEL METHODS********************************************* */

saveLevel(levelDto: LevelDto):Observable<Response<any>>{
return this.http.post<Response<any>>(`${this.levelUrl}/saveLevel`, levelDto)
}

findLevelByUID(levelUid:string):Observable<Response<any>>{
  return this.http.get<Response<any>>(`${this.levelUrl}/findLevelByUID/${levelUid}`)
}

deleteLevel(levelUid:string):Observable<Response<any>>{
  return this.http.post<Response<any>>(`${this.levelUrl}/deleteLevel/${levelUid}`, null)
}

findLeavePage(pageableParam:PageableParam):Observable<ResponsePage<any>>{
  return this.http.post<ResponsePage<any>>(`${this.levelUrl}/findLevelPage`, pageableParam)
}

findLevels():Observable<ResponseList<any>>{
  return this.http.get<ResponseList<any>>(`${this.levelUrl}/findLevels`)
}

/**************************************************************************************************************************** ROLE METHODS********************************************* */
saveRole(roleDto:RoleDto):Observable<Response<any>>{
  return this.http.post<Response<any>>(`${this.roleUrl}/saveRole`, roleDto)
  }
  
  findRoleByUID(roleUid:string):Observable<Response<any>>{
    return this.http.get<Response<any>>(`${this.roleUrl}/findRoleByUID/${roleUid}`)
  }
  
  deleteRole(roleUid:string):Observable<Response<any>>{
    return this.http.post<Response<any>>(`${this.roleUrl}/deleteRole/${roleUid}`, null)
  }
  
  findRolePage(pageableParam:PageableParam):Observable<ResponsePage<any>>{
    return this.http.post<ResponsePage<any>>(`${this.roleUrl}/findRolePage`, pageableParam)
  }

 findRoles():Observable<Response<any>>{
    return this.http.get<Response<any>>(`${this.roleUrl}/findRoles`)
  }

/************************************************************************************************************************* PROCESS METHODS. ********************************************* */
  findProcesses():Observable<Response<any>>{
    return this.http.get<Response<any>>(`${this.processUrl}/findProcesses`)
  }


/************************************************************************************************************************* PERMISSIONS METHODS. ********************************************* */
findPermissionsByModule(moduleName:string):Observable<Response<any>>{
  return this.http.get<Response<any>>(`${this.roleUrl}/findPermissionsByModule/${moduleName}`)  
}

findPermissionByRoleUID(roleUID:string):Observable<Response<any>>{
  return this.http.get<Response<any>>(`${this.roleUrl}/findPermissionByRoleUID/${roleUID}`)   
}

assignPermissionToRole(assignPermissionToRole:AssignPermissionToRoleDto):Observable<Response<any>>{
  return this.http.post<Response<any>>(`${this.roleUrl}/assignPermissionToRole`, assignPermissionToRole)
}

/*************************************************************************************************************************** PROCESS FLOW METHODS***************************************** */
findProcessFlowActionsByProcessType(processType:ProcessType):Observable<ResponseList<any>>{
  return this.http.get<ResponseList<any>>(`${this.processFlowUrl}/findProcessFlowActionsByProcessType/${processType}`)
}

findDistinctProcessTypes():Observable<ResponseList<any>>{
  return this.http.get<ResponseList<any>>(`${this.processFlowUrl}/findDistinctProcessTypes`)
}

/******************************************************************************************************************************* WORKFLOW METHODS********************************************* */

saveWorkflow(workflowDto:WorkflowDTO[]):Observable<ResponseList<any>>{
  return this.http.post<ResponseList<any>>(`${this.workflowUrl}/saveWorkflow`, workflowDto)
}

deleteWorkflowByUID(workflowUID:string):Observable<Response<any>>{
 return this.http.post<Response<any>>(`${this.workflowUrl}/deleteWorkflowByUID/${workflowUID}`, null)
}

findWorkflowByProcessType(processType:ProcessType):Observable<ResponseList<any>>{
  return this.http.get<ResponseList<any>>(`${this.workflowUrl}/findWorkflowByProcessType/${processType}`)
}

updatingWorkflow(workflowDto:WorkflowDTO):Observable<Response<any>>{
  return this.http.post<Response<any>>(`${this.workflowUrl}/updatingWorkflow`, workflowDto)
}


/*******************************************************************************************************************************. USER SETTING METHODS*************************************** */
registerNewUser(userSettingDTO:UserSettingDTo):Observable<Response<any>>{
return this.http.post<Response<any>>(`${this.userSettingUrl}/registerNewUser`, userSettingDTO)
}

deleteUser(userUID:string):Observable<Response<any>>{
return this.http.post<Response<any>>(`${this.userSettingUrl}/deleteUser/${userUID}`, null)
}

findUserByUID(userUID:string):Observable<Response<any>>{
return this.http.get<Response<any>>(`${this.userSettingUrl}/findUserByUID/${userUID}`)
}

findUserPAGE(pageableParam:PageableParam):Observable<ResponsePage<any>>{
return this.http.post<ResponsePage<any>>(`${this.userSettingUrl}/findUserPAGE`, pageableParam)
}

assignOrUnAssignUserRole(assignUserRoleDTO:AssignUserRoleDTO):Observable<Response<any>>{
return this.http.post<Response<any>>(`${this.userSettingUrl}/assignOrUnAssignUserRole`, assignUserRoleDTO)
}

enableOrDisableAccount(userUID: string, enable:boolean):Observable<Response<any>>{
return this.http.post<Response<any>>(`${this.userSettingUrl}/enableOrDisableAccount/${userUID}/${enable}`, null);
}


}
