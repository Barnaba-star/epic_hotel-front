import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-chart', // hii inafanya component iwe reusable standalone
    imports: [CommonModule, NgxChartsModule],
    templateUrl: './chart.html',
    styleUrls: ['./chart.css']
})
export class ChartComponent {

  @Input() data: any[] = [];         // data ya chart
  @Input() view: [number, number] = [700, 400];
  @Input() colorScheme: any = { domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'] };
  @Input() showLegend: boolean = true;
  @Input() showLabels: boolean = true;
  @Input() animations: boolean = true;
  @Input() xAxis: boolean = true;
  @Input() yAxis: boolean = true;
  @Input() showXAxisLabel: boolean = true;
  @Input() showYAxisLabel: boolean = true;
  @Input() xAxisLabel: string = 'X Axis';
  @Input() yAxisLabel: string = 'Y Axis';

  @Output() selectData = new EventEmitter<any>();
  @Output() activateData = new EventEmitter<any>();
  @Output() deactivateData = new EventEmitter<any>();

  onSelect(event: any) {
    this.selectData.emit(event);
  }

  onActivate(event: any) {
    this.activateData.emit(event);
  }

  onDeactivate(event: any) {
    this.deactivateData.emit(event);
  }

}
