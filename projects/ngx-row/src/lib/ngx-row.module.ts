import { NgModule } from '@angular/core';
import {NgxRowDirective} from "./ngx-row.directive";
import {NgxRowGroupComponent} from "./ngx-row-group.component";



@NgModule({
  declarations: [NgxRowDirective, NgxRowGroupComponent],
  imports: [
  ],
  exports: [NgxRowGroupComponent, NgxRowDirective]
})
export class NgxRowModule { }
