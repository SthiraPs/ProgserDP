import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
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

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [
        MatButtonModule,
        MatIconModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        NgIf,
    ],

    templateUrl: './register.component.html',
    styleUrl: './register.component.scss',
})
export class RegisterComponent {
    composeForm: FormGroup;

    constructor(
        private _formBuilder: FormBuilder,
        public matDialogRef: MatDialogRef<RegisterComponent>,
        private _registerService: RegisterService,
        private _notificationService: NotificationService
    ) {}

    ngOnInit() {
        this.composeForm = this._formBuilder.group({
            fullName: ['', [Validators.required, Validators.email]],
            email: ['', Validators.email], // Add email validator for cc and bcc as well
            password: ['', Validators.email],
            department: [''],
        });
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
}
