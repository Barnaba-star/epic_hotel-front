import { CommonModule } from '@angular/common';
import { Component, Inject, Input, TemplateRef, EventEmitter, Output, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { FormComponent } from '../form/form';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { ButtonComponent } from '../button/button';

import { MatFormFieldModule } from '@angular/material/form-field';
import { FormField } from '../../models/form-field';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';


@Component({
    selector: 'app-dialog',
    imports: [
    MatDialogModule,
    CommonModule,
    FormComponent,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    FormComponent,
],
    templateUrl: './dialog.html',
    styleUrls: ['./dialog.css']
})
export class DialogComponent implements AfterViewInit {
  @ViewChildren(FormComponent) forms!: QueryList<FormComponent>;
  @Input() template!: TemplateRef<any>;
  @Output() addFormEvent = new EventEmitter<void>();
  @Output() deleteFormEvent = new EventEmitter<number>();

  fields: FormField[] = [];
  formTitle = '';

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    if (!this.data.formData) {
      this.data.formData = [{}];
    }

    this.fields = this.data.fields || [];
    this.formTitle = this.data.formTitle || '';
  }

 ngAfterViewInit() {
  this.forms.changes.subscribe(() => {
    if (this.data.formData && this.forms.length > 0) {
      const formInstance = this.forms.first;
      formInstance.patchForm(this.data.formData[0]); 
    }
  });

  if (this.data.formData && this.forms.length > 0) {
    const formInstance = this.forms.first;
    formInstance.patchForm(this.data.formData[0]); 
  }
}


  onSubmit() {
    if (!this.forms || this.forms.length === 0) {
      this.dialogRef.close(null);
      return;
    }

    const formData = this.forms.first.getFormValue();
    this.dialogRef.close(formData);
  }

  saveAllForms() {
    if (!this.forms || this.forms.length === 0) {
      return;
    }

    const allData = this.forms.map(formComp => formComp.getFormValue());
    this.dialogRef.close(allData);
  }

  addForm() {
    this.addFormEvent.emit();
  }

  deleteForm() {
    if (this.data.formData && this.data.formData.length > 0) {
      this.data.formData.pop();
    }
  }

  onClose() {
    this.dialogRef.close();
  }

onSubmitFromChild(formData: any) {
  this.dialogRef.close(formData);
}

}
