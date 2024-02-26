import { Component } from '@angular/core';
import {
    CommonModule,
    CurrencyPipe,
    NgClass,
    NgFor,
    NgIf,
} from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatOptionModule, MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { TranslocoModule } from '@ngneat/transloco';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-requests',
    standalone: true,
    imports: [
        CommonModule,
        TranslocoModule,
        MatIconModule,
        MatButtonModule,
        MatRippleModule,
        MatMenuModule,
        MatTabsModule,
        MatButtonToggleModule,
        NgApexchartsModule,
        NgFor,
        NgIf,
        MatTableModule,
        NgClass,
        CurrencyPipe,
        MatSelectModule,
        MatOptionModule,
        NgClass,
        MatFormFieldModule,
        FormsModule,
    ],
    templateUrl: './requests.component.html',
    styleUrl: './requests.component.scss',
})
export class RequestsComponent {
    recentTransactionsDataSource: MatTableDataSource<any> =
        new MatTableDataSource();
    recentTransactionsTableColumns: string[] = [
        'transactionId',
        'date',
        'name',
        'amount',
        'status',
    ];
    formFieldHelpers: string[] = [''];

    constructor(private _router: Router) {}

    ngOnInit(): void {}

    trackByFn(index: number, item: any): any {
        return item.id || index;
    }
}
