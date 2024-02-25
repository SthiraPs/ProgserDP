import { Component, ViewChild } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import {
    NgForm,
    UntypedFormGroup,
    UntypedFormBuilder,
    Validators,
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FuseAlertComponent, FuseAlertType } from '@fuse/components/alert';
import { SignInService } from '../../services/sign-in.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-sign-in-popup',
    standalone: true,
    imports: [
        RouterLink,
        FuseAlertComponent,
        NgIf,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatProgressSpinnerModule,
    ],
    templateUrl: './sign-in-popup.component.html',
    styleUrl: './sign-in-popup.component.scss',
})
export class SignInPopupComponent {
    @ViewChild('signInNgForm') signInNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    signInForm: UntypedFormGroup;
    showAlert: boolean = false;

    constructor(
        private _signInService: SignInService,
        private _formBuilder: UntypedFormBuilder,
        public matDialogRef: MatDialogRef<SignInPopupComponent>
    ) {}

    ngOnInit(): void {
        // Create the form
        this.signInForm = this._formBuilder.group({
            email: [
                'sithirasenanayake@gmail.com',
                [Validators.required, Validators.email],
            ],
            password: ['1234', Validators.required],
            rememberMe: [''],
        });
    }

    signIn(): void {
        // Return if the form is invalid
        if (this.signInForm.invalid) {
            return;
        }

        this.signInForm.disable();
        this.showAlert = false;

        this._signInService.signIn(this.signInForm.value).subscribe(
            (res) => {
                this.matDialogRef.close();
            },
            (response) => {
                this.signInForm.enable();
                this.signInNgForm.resetForm();
                this.alert = {
                    type: 'error',
                    message: 'Invalid credentials!',
                };

                this.showAlert = true;
            }
        );
    }
}
