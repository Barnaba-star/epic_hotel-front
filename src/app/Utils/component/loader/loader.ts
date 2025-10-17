
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderService } from '../../services/loader-service';

@Component({
    selector: 'app-loader',
    imports: [CommonModule],
    templateUrl: './loader.html',
    styleUrls: ['./loader.css']
})
export class LoaderComponent {
  constructor(public loaderService: LoaderService) {}
}
