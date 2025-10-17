import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-recordtable',
  templateUrl: './recordtable.html',
  styleUrls: ['./recordtable.css'],
  standalone: true,
  imports: [CommonModule, MatIconModule],
  
})
export class RecordtableComponent {
  @Input() columns: { field: string; header: string }[] = [];
  @Input() data: any[] = [];
  @Input() showView: boolean = false;
  @Input() showEdit: boolean = false;
  @Input() showDelete: boolean = false;
  @Input() showDoc: boolean = false;

  @Output() viewRecord = new EventEmitter<any>(); 
  @Output() editRecord = new EventEmitter<any>();
  @Output() deleteRecord = new EventEmitter<any>();
  @Output() openDoc = new EventEmitter<any>();

onView(row: any) {
    this.viewRecord.emit(row); 
}
onEdit(row: any) {
this.editRecord.emit(row);
}
onDelete(row: any) {
this.deleteRecord.emit(row);  
}

onOpenDoc(row: any){
this.openDoc.emit(row);
}


getIndex(row: any): number {
  return this.data.indexOf(row) + 1;
}


}
