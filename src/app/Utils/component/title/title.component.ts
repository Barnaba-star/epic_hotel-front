import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { IconRegistryService } from '../../services/icon-registry.service';
import { MatIcon } from '@angular/material/icon';
import { MatFormField } from '@angular/material/form-field';
import { Authentication } from '../../services/authentication';
import { MatMenuItem } from '@angular/material/menu';
import { Location } from '@angular/common';
import { PreviousRouteService } from '../../services/previous-route-service';
import { StorageService } from '../../services/storage';
import { MatDivider } from '@angular/material/divider';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog';
import { FormField } from '../../models/form-field';
import { LoginService } from '../../../login/login-service';
import { AlertService } from '../../services/alert';
import { MatCard } from "@angular/material/card";
import { MatSelectModule } from "@angular/material/select";
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-title',
  imports: [MatToolbarModule, CommonModule, MatIcon, MatDivider,  MatSelectModule],
  templateUrl: './title.component.html',
  styleUrl: './title.component.css',
})
export class TitleComponent implements OnInit {
  @Input() titleHeader: string = '';
  @Input() showBackButton: boolean = false;
  @Input() showLogout: boolean = false;
  @Input() showProfile: boolean = false;
  @Input() customButtons: { icon: string; tooltip: string; id: string }[] = [];
  @Input() loggedUserEmail: string = '';
  @Input() loggedUserRoles: string[] = [];

  name: string = 'Barry | Herman';
  username: string = '';
  role: string = '';
  show: boolean = false;
  

  @Output() backClick = new EventEmitter<void>();
  @Output() logoutClick = new EventEmitter<void>();
  @Output() profileClick = new EventEmitter<void>();
  @Output() customButtonClick = new EventEmitter<string>();

  constructor(
    private router: Router,
    private iconRegistry: IconRegistryService,
    private authService: Authentication,
    private location: Location,
    private priv: PreviousRouteService,
    private auth: Authentication,
    private storage: StorageService,
    private dialog: MatDialog,
    private loginService: LoginService,
    private alertService:AlertService
  ) { }

  onBack(): void {
    const prev = this.priv.getPreviousUrl();

    if (prev.includes('/login')) {
      this.auth.removeToken();
    } else {
      this.location.back();
    }
  }

  onLogout(): void {
    this.router.navigate(['/login']);
    this.auth.removeToken();
  }
  showCard: boolean = false;

  onShow() {
    this.show = !this.show;
  }

  goToPersonnel() {
    this.router.navigate(['/personnel']);
  }

  ngOnInit(): void {
    this.username = this.authService.getUsername();
    this.role = this.authService.getRoles();
  }
  changePassword() {
   this.router.navigate(['/changePassword'])
  }




}
