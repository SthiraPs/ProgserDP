import { NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { FuseFullscreenComponent } from '@fuse/components/fullscreen';
import { FuseLoadingBarComponent } from '@fuse/components/loading-bar';
import {
    FuseHorizontalNavigationComponent,
    FuseNavigationItem,
    FuseNavigationService,
    FuseVerticalNavigationComponent,
} from '@fuse/components/navigation';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { NotificationsComponent } from 'app/layout/layouts/components/notifications/notifications.component';
import { QuickChatComponent } from 'app/layout/layouts/components/user/components/quick-chat/quick-chat.component';
import { SearchComponent } from 'app/layout/layouts/components/search/search.component';
import { UserComponent } from 'app/layout/layouts/components/user/components/users/user.component';
import { Subject, takeUntil } from 'rxjs';
import { NavigationService } from '../../services/navigation.service';
import { defaultNavigation, horizontalNavigation } from '../../services/menu';
import { cloneDeep } from 'lodash';
import { Navigation } from '../../models/navigation.types';

@Component({
    selector: 'modern-layout',
    templateUrl: './modern.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        FuseLoadingBarComponent,
        NgIf,
        FuseVerticalNavigationComponent,
        FuseHorizontalNavigationComponent,
        MatButtonModule,
        MatIconModule,
        FuseFullscreenComponent,
        SearchComponent,
        NotificationsComponent,
        UserComponent,
        RouterOutlet,
        QuickChatComponent,
    ],
})
export class ModernLayoutComponent implements OnInit, OnDestroy {
    isScreenSmall: boolean;
    navigation: Navigation;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    private readonly _defaultNavigation: FuseNavigationItem[] =
    defaultNavigation;
private readonly _horizontalNavigation: FuseNavigationItem[] =
    horizontalNavigation;
    
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private _navigationService: NavigationService,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _fuseNavigationService: FuseNavigationService
    ) {}

    get currentYear(): number {
        return new Date().getFullYear();
    }

    ngOnInit(): void {
        this._horizontalNavigation.forEach((horizontalNavItem) => {
            this._defaultNavigation.forEach((defaultNavItem) => {
                if (defaultNavItem.id === horizontalNavItem.id) {
                    horizontalNavItem.children = cloneDeep(
                        defaultNavItem.children
                    );
                }
            });
        });

        // Return the response
        this.navigation = 
            {
                compact: null,
                default: cloneDeep(this._defaultNavigation),
                futuristic: null,
                horizontal: cloneDeep(this._horizontalNavigation),
            };
          


        // Subscribe to media changes
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({ matchingAliases }) => {
                // Check if the screen is small
                this.isScreenSmall = !matchingAliases.includes('md');
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle navigation
     *
     * @param name
     */
    toggleNavigation(name: string): void {
        // Get the navigation
        const navigation =
            this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>(
                name
            );

        if (navigation) {
            // Toggle the opened status
            navigation.toggle();
        }
    }
}
