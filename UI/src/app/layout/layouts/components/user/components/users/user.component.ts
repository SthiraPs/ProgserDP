import { BooleanInput } from '@angular/cdk/coercion';
import { NgClass, NgIf } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
    inject,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { UserService } from 'app/layout/layouts/components/user/services/user.service';
import { User } from 'app/layout/layouts/components/user/services/user.types';
import { GravatarService } from 'app/modules/auth/register/services/gravatar.service';
import { SignInService } from 'app/modules/auth/sign-in/services/sign-in.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'user',
    templateUrl: './user.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs: 'user',
    standalone: true,
    imports: [
        MatButtonModule,
        MatMenuModule,
        NgIf,
        MatIconModule,
        NgClass,
        MatDividerModule,
    ],
})
export class UserComponent implements OnInit, OnDestroy {
    static ngAcceptInputType_showAvatar: BooleanInput;
    private _userService = inject(UserService);

    @Input() showAvatar: boolean = true;
    user: User;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _signInService: SignInService,
        private _gravatarService: GravatarService
    ) {}

    async ngOnInit(): Promise<void> {
        await this._userService.user$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((user: User) => {
                if (user == null) {
                    this.showAvatar = false;
                } else {
                    this.showAvatar = true;

                    this.user = user;
                }
                this._changeDetectorRef.markForCheck();
            });
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    updateUserStatus(status: string): void {
        if (!this.user) {
            return;
        }
        this.user.status = status;

        // Update the user
        this._userService.update(this.user).subscribe();
    }

    signOut(): void {
        this._signInService.signOut();
        this._router.navigate(['/sign-in']);
    }
}
