import {Component, Input, Output, EventEmitter, HostListener} from '@angular/core';

@Component({
  selector: 'my-cell',
  template: `<div>{{value}}</div>`,
  styles: [
    `div {background-color: skyblue; cursor: pointer; float: left; margin: 0 4px 4px 0; color: black; font-family: Helvetica; padding: 6px 30px 20px 40px; height: 50px; width: 50px; font-size: 50px;}`
  ]
})
export class CellComponent {
  @Input() value: string;
  @Output('userClick') click = new EventEmitter<string>();

  @HostListener('click')
  clickHandler() {
    this.click.emit('');
  }
}
