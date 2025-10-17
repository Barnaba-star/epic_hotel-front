import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Authentication } from '../../services/authentication';



@Component({
    selector: 'app-header',
    imports: [MatToolbarModule],
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export default class HeaderComponent implements OnInit {
  constructor(private router: Router, private authService:Authentication) {}
  @Input() title: string = '';
  @Input() loggedUserEmail: string = '';
  @Input() loggedUserRoles: string[] = [];

  darkMode = false;



  onLogout(): void {
    this.router.navigate(['/login']);
    this.authService.removeToken();
  }

  showCard: boolean = false;
  onProfile(): void {
    this.showCard = !this.showCard;
  }
  ngOnInit(): void {
    
  }



}
