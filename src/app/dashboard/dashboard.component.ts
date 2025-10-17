import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { IconRegistryService } from '../Utils/services/icon-registry.service';
import { Router, RouterModule } from '@angular/router';
import { MatDivider } from "@angular/material/divider";
import { TitleComponent } from "../Utils/component/title/title.component";

@Component({
    selector: 'app-dashboard',
    imports: [CommonModule, MatCardModule, MatIconModule, RouterModule, TitleComponent],
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
constructor(private iconRegistry: IconRegistryService, private route:Router){}
 cards = [

  {
    title: 'Settings',
    icon: 'setting',
    img: 'assets/icons/set.svg',
    description: 'Create your account quickly and securely to join our community and access all features.',
    route: '/settings'
  },

];

goTo(route: string) {
  this.route.navigate([route]);
}

}
