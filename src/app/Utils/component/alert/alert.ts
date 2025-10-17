import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../services/alert';
import { AlertType } from '../../services/alert';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.html',
    imports: [CommonModule],
    styleUrls: ['./alert.css']
})
export class AlertComponent implements OnInit {
  show = false;
  type: AlertType = 'info';
  message = '';

  constructor(private alertService: AlertService) {}

  ngOnInit() {
    this.alertService.alertState$.subscribe(alert => {
      this.type = alert.type;
      this.message = alert.message;
      this.show = true;
      setTimeout(() => this.show = false, 2000);
    });
  }
get icon(): string {
    switch (this.type) {
      case 'success': return '✓';
      case 'error': return '✕';
      case 'info': return 'ℹ';
      case 'warning': return '⚠';
    }
  }

  get cssClass(): string {
  return `alert-box alert-${this.type}`;
}


  close() {
    this.show = false;
  }
}