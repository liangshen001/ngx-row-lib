import {
    ChangeDetectorRef,
    Directive,
    ElementRef,
    EventEmitter,
    HostBinding,
    HostListener,
    Input,
    OnDestroy,
    OnInit,
    Output
} from '@angular/core';

import {Subscription} from 'rxjs';
import {NgxRowService} from './ngx-row.service';
import {ChangeDetection} from "@angular/cli/lib/config/schema";
import {RowStylePros} from "./row-style-pros";

@Directive({
    selector: '[ngxRow]',
    exportAs: 'ngxRow'
})
export class NgxRowDirective extends RowStylePros implements OnInit, OnDestroy {

    _groupName: string;

    get groupName() {
        return this._groupName || this.groupData.name;
    }

    @Input()
    set groupName(groupName: string) {
        if (groupName && groupName !== this.groupName) {
            this._groupName = groupName;
            this.subscribe();
        }
    }

    @Input()
    focusable = true;

    @Input()
    selected: boolean = false;

    @Output()
    selectedChange = new EventEmitter<boolean>();

    @Input()
    focusColor: string;

    @Input()
    passColor: string;

    @Input()
    backgroundColor: string;

    @Input()
    value: string;

    @Output()
    passChange = new EventEmitter<boolean>();

    @HostBinding('style.backgroundColor')
    get styleBackgroundColor() {
        return this.selected && this.focusable ? (this.focusColor || this.groupData.focusColor || '#E6E6E6')
            : (this.pass ? (this.passColor || this.groupData.passColor || '#F0F0F0')
                : (this.backgroundColor || (this.groupData.backgroundColor)));
    }

    groupData: RowStylePros & {
        name?: string;
    } = {};

    private _sub: Subscription;

    pass = false;

    constructor(private element: ElementRef,
                private changeDetectorRef: ChangeDetectorRef,
                private rowService: NgxRowService) {
        super();
    }

    ngOnInit(): void {
        this.element.nativeElement.setAttribute('tabindex', -1);
        this.element.nativeElement.style.outline = 0;
    }

    ngOnDestroy(): void {
        this._sub && this._sub.unsubscribe();
    }

    @HostListener('click')
    focus() {
        if (this.focusable && this.groupName) {
            this.rowService.selectElement(this.groupName, this.element);
        }
    }

    @HostListener('mouseenter')
    mouseenter() {
        this.pass = true;
        this.passChange.emit(this.pass);
    }

    @HostListener('mouseleave')
    mouseleave() {
        this.pass = false;
        this.passChange.emit(this.pass);
    }

    setGroupName(groupName: string) {
        this.groupName = groupName;
    }

    subscribe() {
        if (this.focusable) {
            this._sub && this._sub.unsubscribe();
            this._sub = this.rowService.subscribe(this.groupName).subscribe(ele => {
                if (ele === this.element && !this.selected) {
                    if (!this.selected) {
                        this.selectedChange.emit(true);
                    }
                    this.selected = true;
                } else {
                    if (this.selected) {
                        this.selectedChange.emit(false);
                    }
                    this.selected = false;
                }
            });
        }
    }
}
