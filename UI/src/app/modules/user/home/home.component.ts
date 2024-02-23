import { Component, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ApexOptions } from 'apexcharts';
import { Subject } from 'rxjs';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NgIf, NgFor, NgClass, TitleCasePipe, DatePipe } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
    CdkDrag,
    CdkDragDrop,
    CdkDragHandle,
    CdkDragPreview,
    CdkDropList,
    moveItemInArray,
} from '@angular/cdk/drag-drop';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { DepartmentService } from 'app/modules/other/services/department.service';
import { DepartmentModel } from 'app/modules/other/model/department.model';
import { SignInService } from 'app/modules/auth/sign-in/services/sign-in.service';
import { MatDialog } from '@angular/material/dialog';
import { SignInPopupComponent } from 'app/modules/auth/sign-in/components/sign-in-popup/sign-in-popup.component';

@Component({
    selector: 'landing-home',
    templateUrl: './home.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        MatSidenavModule,
        RouterOutlet,
        NgIf,
        MatButtonModule,
        MatTooltipModule,
        MatIconModule,
        CdkDropList,
        NgFor,
        CdkDrag,
        NgClass,
        CdkDragPreview,
        CdkDragHandle,
        RouterLink,
        TitleCasePipe,
        DatePipe,
    ],
})
export class LandingHomeComponent {
    data: any;
    accountBalanceOptions: ApexOptions;

    recentTransactionsDataSource: MatTableDataSource<any> =
        new MatTableDataSource();
    recentTransactionsTableColumns: string[] = [
        'transactionId',
        'date',
        'name',
        'amount',
        'status',
    ];

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _router: Router,
        private _departmentService: DepartmentService,
        private _signInService: SignInService,
        private _matDialog: MatDialog,

    ) {
    }

    ngOnInit(): void {
        this.loadDepartments();
    }

    private _prepareChartData(): void {
        // Account balance
        this.accountBalanceOptions = {
            chart: {
                animations: {
                    speed: 400,
                    animateGradually: {
                        enabled: false,
                    },
                },
                fontFamily: 'inherit',
                foreColor: 'inherit',
                width: '100%',
                height: '100%',
                type: 'area',
                sparkline: {
                    enabled: true,
                },
            },
            colors: ['#A3BFFA', '#667EEA'],
            fill: {
                colors: ['#CED9FB', '#AECDFD'],
                opacity: 0.5,
                type: 'solid',
            },
            series: this.data.accountBalance.series,
            stroke: {
                curve: 'straight',
                width: 2,
            },
            tooltip: {
                followCursor: true,
                theme: 'dark',
                x: {
                    format: 'MMM dd, yyyy',
                },
                y: {
                    formatter: (value): string => value + '%',
                },
            },
            xaxis: {
                type: 'datetime',
            },
        };
    }

    createTask(type: 'task' | 'section'): void {
        // Create the task
    }

    loadDepartments() {
        this._departmentService
            .getDepartments()
            .subscribe((res: DepartmentModel[]) => {});
    }
}
