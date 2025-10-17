import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class Authentication {
constructor(private cookieService:CookieService){}
private jwtHelper = new JwtHelperService();

 createHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    const token = this.cookieService.get('jwt_token');
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

setToken(token: string): void {
    this.cookieService.set('jwt_token', token, 7, '/');
     
  }
 getToken(): string {
  const rawToken = this.cookieService.get('jwt_token');
  return rawToken?.replace(/^"(.*)"$/, '$1');
}


removeToken(): void {
  this.cookieService.delete('jwt_token');
}

getUsername(): string {
  const token = this.getToken();
  if (!token) {
    console.log('No Token Found');
    return '';
  }
  const decodedToken = this.jwtHelper.decodeToken(token);
  const username = decodedToken.sub; 
  console.log('Username:', username);
  return username;
}

getRoles(): string{
const token = this.getToken();
if(!token){
 return '';
}
const decodedToken = this.jwtHelper.decodeToken(token);
const roles:string[] = decodedToken.roles || [];
const rolesAsString = roles.join();
console.log('Role:', roles);
return rolesAsString;
}

getPermissions():string{
  const token = this.getToken();
  if(!token){
    return '';
  }
  const decodedToken = this.jwtHelper.decodeToken(token);
  const permissions:string[] =  decodedToken.permissions;
  const permissionsAsString = permissions.join();
  console.log('Permissions', permissions);
  return permissionsAsString;
}

getTenantId(): string {
  const token = this.getToken();
  if (!token) {
    console.log('No Token Found');
    return '';
  }
  const decodedToken = this.jwtHelper.decodeToken(token);
  const tenantId = decodedToken.tenantId; 
  console.log('Username:', tenantId);
  return tenantId;
}

getActions():string{
  const token = this.getToken();
  if(!token){
    return '';
  }
  const decodedToken = this.jwtHelper.decodeToken(token);
  const actions:string[] =  decodedToken.actions;
  const actionsAsString = actions.join();
  console.log('Actions', actions);
  return actionsAsString;
}

  
}
