import { Component, Input, Output, EventEmitter  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Router, RouterModule } from '@angular/router';
import { IconRegistryService } from '../../services/icon-registry.service';

export interface MenuItem {
  label: string;
  icon?: string;
  route?: string;
  action?: string;
}

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [RouterModule, MatListModule, MatIconModule, MatToolbarModule, MatSidenavModule, CommonModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {
  imagePath: string = '';

  @Input() menuItems: MenuItem[] = [];
  @Output() menuItemClicked = new EventEmitter<MenuItem>();

  constructor(private router: Router, private iconRegistry: IconRegistryService) {}

  onItemClick(item: MenuItem) {
    if (item.route) {
      this.router.navigate([item.route]); // navigate to route
    }

    if (item.action) {
      this.menuItemClicked.emit(item); // emit to parent if needed
    }
  }

  goDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
