import { Component } from '@angular/core';
import {
    CommonModule,
    CurrencyPipe,
    NgClass,
    NgFor,
    NgIf,
} from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { FuseAlertComponent } from '@fuse/components/alert';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from 'app/modules/auth/register/components/register.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatRippleModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { TranslocoModule } from '@ngneat/transloco';
import { NgApexchartsModule } from 'ng-apexcharts';
import { UserModel } from 'app/modules/auth/register/model/user.model';
import { RegisterService } from 'app/modules/auth/register/services/register.service';

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    title: ApexTitleSubtitle;
};

@Component({
    selector: 'app-admin-panel',
    standalone: true,
    imports: [
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

    templateUrl: './admin-panel.component.html',
    styleUrl: './admin-panel.component.scss',
})
export class AdminPanelComponent {
    public chartOneOptions: Partial<ChartOptions>;

    listOfUsers: UserModel[];
    filteredListOfUsers: UserModel[];

    constructor(
        private _matDialog: MatDialog,
        private _registerService: RegisterService
    ) {}

    ngOnInit() {
        this.loadListOfUsers();

        this.loadChartOne();
    }

    loadListOfUsers() {
        this._registerService.getUsers().subscribe((res: UserModel[]) => {
            this.listOfUsers = res;
        });
    }

    onClickCreateUser() {
        const dialogRef = this._matDialog.open(RegisterComponent);

        dialogRef.afterClosed().subscribe((result) => {
            console.log('Compose dialog was closed!');
        });
    }

    filterTagsInputKeyDown(event): void {}

    filterTags(event): void {
        const value = event.target.value.toLowerCase();

        // Filter the tags
        this.filteredListOfUsers = this.listOfUsers.filter((tag) =>
            tag.email.toLowerCase().includes(value)
        );

        console.log(this.filteredListOfUsers);
    }

    loadChartOne() {
        this.chartOneOptions = {
            series: [
                {
                    name: 'User Activity',
                    data: [12, 41, 23, 51, 12, 34, 43, 76, 45],
                },
            ],
            chart: {
                height: 300,
                type: 'line',
            },
            title: {
                text: 'Online History',
            },
            xaxis: {
                categories: ['Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat', 'Sun'],
            },
        };
    }
}
