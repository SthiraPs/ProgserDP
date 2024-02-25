import { Route } from '@angular/router';
import { initialDataResolver } from 'app/app.resolvers';
import { AuthGuard } from 'app/modules/auth/sign-in/services/guards/auth.guard';
import { NoAuthGuard } from 'app/modules/auth/sign-in/services/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layouts/components/main-layout.ts/layout.component';

export const appRoutes: Route[] = [

    {path: '', pathMatch : 'full', redirectTo: 'home'},
    {path: 'signed-in-redirect', pathMatch : 'full', redirectTo: 'home'},

    // Auth routes for guests
    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'confirmation-required', loadChildren: () => import('app/modules/auth/confirmation-required/confirmation-required.routes')},
            {path: 'forgot-password', loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.routes')},
            {path: 'reset-password', loadChildren: () => import('app/modules/auth/reset-password/reset-password.routes')},
            {path: 'sign-in', loadChildren: () => import('app/modules/auth/sign-in/sign-in.routes')},
            {path: 'sign-up', loadChildren: () => import('app/modules/auth/sign-up/sign-up.routes')}
        ]
    },

    // Auth routes for authenticated users
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'unlock-session', loadChildren: () => import('app/modules/auth/unlock-session/unlock-session.routes')}
        ]
    },

     
    // Admin routes
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: initialDataResolver
        },
        children: [
            {path: 'home', loadChildren: () => import('app/modules/user/home/home.routes')},
            {path: 'dashboard', loadChildren: () => import('app/modules/user/dashboard/dashboard.routes')},
            {path: 'reports', loadChildren: () => import('app/modules/user/reports/reports.routes')},
            {path: 'requests', loadChildren: () => import('app/modules/user/requests/requests.routes')},
            {path: 'problems', loadChildren: () => import('app/modules/user/problems/problems.routes')},
            {path: 'changes', loadChildren: () => import('app/modules/user/changes/changes.routes')},
            {path: 'coming-soon', loadChildren: () => import('app/modules/other/components/coming-soon/coming-soon.routes')},
            {path: 'coming-soon2', loadChildren: () => import('app/modules/other/components/coming-soon/coming-soon.routes')},
            {path: 'coming-soon3', loadChildren: () => import('app/modules/other/components/coming-soon/coming-soon.routes')},
            {path: 'admin-panel', loadChildren: () => import('app/modules/admin/admin-panel/admin-panel.routes')},
        ]
    }
];
