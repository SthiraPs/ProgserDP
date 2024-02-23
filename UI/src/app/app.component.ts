import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterOutlet } from '@angular/router';
import { SignInService } from './modules/auth/sign-in/services/sign-in.service';
import { SignInPopupComponent } from './modules/auth/sign-in/components/sign-in-popup/sign-in-popup.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [RouterOutlet],
})
export class AppComponent {
    private tokenRefreshThreshold = 60000;
    private userActivityTimer;

    private inactivityThreshold = 1 * 60 * 1000; // 5 minutes in milliseconds
    private inactivityTimer;

    constructor(
        private _signInService: SignInService,
        private _matDialog: MatDialog
    ) {
        this.startActivityListener();
    }

    //#region Refresh Token
    startActivityListener() {
        window.addEventListener('click', () => this.resetTimer());
        this.resetTimer();
    }

    resetTimer() {
        clearTimeout(this.userActivityTimer);
        clearTimeout(this.inactivityTimer);

        this.inactivityTimer = setTimeout(
            () => this.markUserOffline(),
            this.inactivityThreshold
        );

        this.userActivityTimer = setTimeout(
            () => this.refreshTokenIfNeeded(),
            5000
        );
    }

    markUserOffline() {
        const email = localStorage.getItem('email');
        if (email !== null && email !== '') {
            const dialogRef = this._matDialog.open(SignInPopupComponent);

            this._signInService.markUserOffline().subscribe((res) => {});
        }
    }

    refreshTokenIfNeeded() {
        const token = localStorage.getItem('accessToken');
        const refreshTime = new Date().getTime() + this.tokenRefreshThreshold;
        const expirationTime = this.getTokenExpirationDate(token);

        console.log(expirationTime);
        if (expirationTime !== null) {
            if (refreshTime > expirationTime.getTime()) {
                this._signInService.signInUsingToken().subscribe((res) => {});
            }
        }
    }

    getTokenExpirationDate(token: string): Date {
        if (!token) {
            return null;
        }

        const decodedToken = this.decodeToken(token);
        if (!decodedToken.exp) {
            return null;
        }

        const expirationDate = new Date(0);
        expirationDate.setUTCSeconds(decodedToken.exp);

        return expirationDate;
    }

    decodeToken(token: string) {
        try {
            const base64Url = token.split('.')[1]; // JWT is composed of 3 parts, separated by dots. The second part is the payload
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Replace non-url safe characters
            const jsonPayload = decodeURIComponent(
                window
                    .atob(base64)
                    .split('')
                    .map(function (c) {
                        return (
                            '%' +
                            ('00' + c.charCodeAt(0).toString(16)).slice(-2)
                        );
                    })
                    .join('')
            );

            return JSON.parse(jsonPayload);
        } catch (e) {
            return null;
        }
    }
    //#endregion
}
