import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatIcon } from "@angular/material/icon";

@Component({
    selector: 'app-delete-dialog',
    imports: [CommonModule],
    templateUrl: './delete-dialog.html',
    styleUrls: ['./delete-dialog.css']
})
export class DeleteDialogComponent {
  @Input() message: string = 'Are you sure you want to delete this item?';
  @Input() icon?: string;
  @Input() data: any;


  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onConfirm() {
    this.confirm.emit(this.data);
  }

  onCancel() {
    this.cancel.emit();
  }
}
