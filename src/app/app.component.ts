import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AlertComponent } from "./Utils/component/alert/alert";
import { LoaderComponent } from "./Utils/component/loader/loader";

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, AlertComponent, LoaderComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'na7';
}
