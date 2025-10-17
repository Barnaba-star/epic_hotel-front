import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProcessFlowDTO, ProcessType } from './workflow';
import { Observable } from 'rxjs';
import { Response, ResponseList } from '../Utils/models/responces';
import { environment } from '../Utils/enviroments/environment';


@Injectable({
  providedIn: 'root'
})
export class WorkflowService {
constructor(private http:HttpClient){}
private baseURL = environment.baseApiUrl;
private workflowURL = `${this.baseURL}/workflow`
private processFlowHistoryURL = `${this.baseURL}/processFlow`


forwardOrRollbackProcess(processFlowDTO: ProcessFlowDTO): Observable<Response<any>> {
  return this.http.post<Response<any>>(`${this.workflowURL}/forwardOrRollbackProcess`, processFlowDTO);
}

findWorkflowActionsByProcessAndRole(processType:ProcessType):Observable<ResponseList<any>>{
  return this.http.get<ResponseList<any>>(`${this.workflowURL}/findWorkflowActionsByProcessAndRole/${processType}`)
}


findProcessFlowHistory(refUID:string, processType:ProcessType):Observable<ResponseList<any>>{
return this.http.get<ResponseList<any>>(`${this.processFlowHistoryURL}/findProcessFlowHistory/${refUID}/${processType}`)
}

}
