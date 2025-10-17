import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { provideHttpClient } from '@angular/common/http';
import { IconRegistryService } from '../Utils/services/icon-registry.service';
import { Router } from '@angular/router';


@Component({
    selector: 'app-landing',
    imports: [
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatIconModule
    ],
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.css'] // ✅ plural
})
export class LandingComponent {
  constructor(private iconRegistry: IconRegistryService, private route:Router) {}

  navigateToLogin() {
    this.route.navigate(['/login']);
  }
}
