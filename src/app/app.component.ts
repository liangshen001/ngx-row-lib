import {Component} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'ngx-row-lib';

    focusColor: string;
    passColor: string;

    list = [undefined, undefined, undefined, undefined, undefined, undefined];

    add() {
        this.list.push();
    }
}
