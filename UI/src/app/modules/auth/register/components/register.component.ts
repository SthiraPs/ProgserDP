import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {
    CommonModule,
    CurrencyPipe,
    NgClass,
    NgFor,
    NgForOf,
    NgIf,
} from '@angular/common';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { FuseAlertComponent } from '@fuse/components/alert';
import { MatDialogRef } from '@angular/material/dialog';
import { RegisterService } from '../services/register.service';
import { NotificationService } from 'app/modules/other/services/notification.service';
import { ResponseModel } from 'app/modules/other/model/response.model';
import { RoleService } from 'app/modules/other/services/role.service';
import { DepartmentService } from 'app/modules/other/services/department.service';
import { DepartmentModel } from 'app/modules/other/model/department.model';
import { RoleModel } from 'app/modules/other/model/role.model';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatRippleModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { TranslocoModule } from '@ngneat/transloco';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        NgIf,
        NgFor,
        NgForOf,
        MatSelectModule,
        MatIconModule,
        TranslocoModule,
        MatRippleModule,
        MatMenuModule,
        MatTabsModule,
        MatButtonToggleModule,
        MatTableModule,
        NgClass,
        CurrencyPipe,
    ],

    templateUrl: './register.component.html',
    styleUrl: './register.component.scss',
})
export class RegisterComponent {
    composeForm: FormGroup;
    rolesList: RoleModel[];
    departmentsList: DepartmentModel[];

    constructor(
        private _formBuilder: FormBuilder,
        public matDialogRef: MatDialogRef<RegisterComponent>,
        private _registerService: RegisterService,
        private _roleService: RoleService,
        private _departmentService: DepartmentService,
        private _notificationService: NotificationService,
    ) {}

    ngOnInit(): void {
        this.composeForm = this._formBuilder.group({
            fullName: ['', [Validators.required, Validators.email]],
            email: ['', Validators.email], // Add email validator for cc and bcc as well
            password: ['', Validators.email],
            department: [''],
            role: [''],
        });

        this.loadDepartments();
        this.loadRoles();
    }

    onCloseWindow() {
        this.matDialogRef.close();
    }

    onClickCreateUser() {
        this._registerService
            .createUser(this.composeForm.value)
            .subscribe((res: ResponseModel) => {
                if (res.success) {
                    this._notificationService.showSuccessMessage(res.message);
                    this.matDialogRef.close();
                } else {
                    this._notificationService.showErrorMessage(res.message);
                }
            });
    }

    loadDepartments() {
        this._departmentService
            .getDepartments()
            .subscribe((res: DepartmentModel[]) => {
                this.departmentsList = res;
                console.log(this.departmentsList);
            });
    }

    loadRoles() {
        this._roleService.getRoles().subscribe((res: RoleModel[]) => {
            this.rolesList = res;
        });
    }
}
