import { Component, Input, ViewChild } from '@angular/core';
import {
    CommonModule,
    CurrencyPipe,
    NgClass,
    NgFor,
    NgIf,
} from '@angular/common';
import { ApexOptions } from 'apexcharts';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TranslocoModule } from '@ngneat/transloco';
import { ChartComponent, NgApexchartsModule } from 'ng-apexcharts';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { Router } from '@angular/router';
import { DashboardService } from '../service/dashboard.service';
import { User } from 'app/layout/layouts/components/user/services/user.types';
import { DepartmentModel } from 'app/modules/other/model/department.model';
import { DepartmentService } from 'app/modules/other/services/department.service';
import { SignInService } from 'app/modules/auth/sign-in/services/sign-in.service';

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    title: ApexTitleSubtitle;
};

@Component({
    selector: 'app-dashboard',
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
    ],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
    public chartOneOptions: Partial<ChartOptions>;
    public chartTwoOptions: Partial<ChartOptions>;
    public chartThreeOptions: Partial<ChartOptions>;
    public chartFourOptions: Partial<ChartOptions>;

    users: User[];

    recentTransactionsDataSource: MatTableDataSource<any> =
        new MatTableDataSource();
    recentTransactionsTableColumns: string[] = [
        'transactionId',
        'date',
        'name',
        'amount',
        'status',
    ];

    constructor(
        private _dashboardService: DashboardService,
        private _router: Router,
        private _departmentService: DepartmentService
    ) {}

    ngOnInit(): void {
        this.loadChartOne();
        this.loadChartTwo();
        this.loadChartThree();
        this.loadChartFour();

        this.loadDepartments();
    }

    loadChartOne() {
        this._dashboardService.getUsers().subscribe((res) => {
            this.users = res;
            this.chartOneOptions = {
                series: [
                    {
                        name: 'My-series',
                        data: [12, 41, 23, 51, 12, 34, 43, 76, 45],
                    },
                ],
                chart: {
                    height: 300,
                    type: 'bar',
                },
                title: {
                    text: 'My First Angular Chart',
                },
                xaxis: {
                    categories: [
                        'Jan',
                        'Feb',
                        'Mar',
                        'Apr',
                        'May',
                        'Jun',
                        'Jul',
                        'Aug',
                        'Sep',
                    ],
                },
            };
            this.recentTransactionsDataSource.data = res;
        });
    }

    loadChartTwo() {
        this._dashboardService.getUsers().subscribe((res) => {
            this.users = res;
            this.chartTwoOptions = {
                series: [
                    {
                        name: 'Non Violated',
                        data: [20, 30, 10, 20, 16, 40, 34, 54, 23],
                        color: '#00a550',
                    },
                    {
                        name: 'SLA Violated',
                        data: [4, 7, 2, 9, 6, 8, 6, 6, 7],
                        color: '#eb4034',
                    },
                ],
                chart: {
                    height: 300,
                    type: 'bar',
                    stacked: true,
                },
                title: {
                    text: 'My First Angular Chart',
                },
                xaxis: {
                    categories: [
                        'Jan',
                        'Feb',
                        'Mar',
                        'Apr',
                        'May',
                        'Jun',
                        'Jul',
                        'Aug',
                        'Sep',
                    ],
                },
            };
        });
    }

    loadChartThree() {
        this._dashboardService.getUsers().subscribe((res) => {
            this.users = res;
            this.chartThreeOptions = {
                series: [
                    {
                        name: 'Product A',
                        data: [40, 70, 20, 90, 36, 80, 45, 65, 23],
                    },
                    {
                        name: 'Product B',
                        data: [20, 30, 10, 20, 16, 40, 45, 23, 23],
                    },
                    {
                        name: 'Product B',
                        data: [34, 22, 10, 45, 5, 66, 12, 43, 12],
                    },
                ],
                chart: {
                    height: 300,
                    type: 'bar',
                    stacked: true,
                },
                title: {
                    text: 'My First Angular Chart',
                },
                xaxis: {
                    categories: [
                        'Jan',
                        'Feb',
                        'Mar',
                        'Apr',
                        'May',
                        'Jun',
                        'Jul',
                        'Aug',
                        'Sep',
                    ],
                },
            };
        });
    }

    loadChartFour() {
        this._dashboardService.getUsers().subscribe((res) => {
            this.users = res;
            this.chartFourOptions = {
                series: [
                    {
                        name: 'Product A',
                        data: [
                            2, 3, 4, 2, 3, 5, 6, 2, 2, 3, 4, 2, 3, 5, 6, 2, 2,
                            3, 4, 2, 3, 5, 6, 2,
                        ],
                    },
                    {
                        name: 'Product B',
                        data: [
                            20, 30, 10, 20, 16, 40, 45, 23, 23, 56, 36, 23, 45,
                            65, 34, 90, 36, 80, 45, 65, 23,
                        ],
                    },
                ],
                chart: {
                    height: 300,
                    type: 'line',
                    stacked: false,
                },
                title: {
                    text: 'My First Angular Chart',
                },

                xaxis: {
                    categories: [
                        'Jan',
                        'Feb',
                        'Mar',
                        'Apr',
                        'May',
                        'Jun',
                        'Jul',
                        'Aug',
                        'Sep',
                    ],
                },
            };
        });
    }

    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    loadDepartments() {
        this._departmentService
            .getDepartments()
            .subscribe((res: DepartmentModel[]) => {});
    }
}
