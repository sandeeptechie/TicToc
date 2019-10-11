import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import {BoardComponent} from './board.component';
import {CellComponent} from './cell.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, HelloComponent, BoardComponent, CellComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
