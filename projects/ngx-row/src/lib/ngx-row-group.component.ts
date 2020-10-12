import {
    AfterContentChecked,
    AfterContentInit,
    Component,
    ContentChildren,
    Input,
    OnInit,
    QueryList
} from '@angular/core';
import {NgxRowDirective} from "./ngx-row.directive";
import { v4 as uuidv4 } from 'uuid';
import {RowStylePros} from "./row-style-pros";

@Component({
    selector: 'ngx-row-group',
    template: `
        <ng-content></ng-content>
    `,
    styles: []
})
export class NgxRowGroupComponent extends RowStylePros implements OnInit, AfterContentChecked {

    @Input()
    focusColor = '#E6E6E6';

    @Input()
    passColor = '#F0F0F0';

    @Input()
    backgroundColor: string;

    @Input()
    name: string = uuidv4();

    @ContentChildren(NgxRowDirective)
    set rows(rows: QueryList<NgxRowDirective>) {
        rows.forEach(row => {
            row.groupData = this;
            row.subscribe();
        });
    }

    constructor() {
        super();
    }

    ngOnInit(): void {
    }

    ngAfterContentInit(): void {
    }

    ngAfterContentChecked(): void {
    }

}
