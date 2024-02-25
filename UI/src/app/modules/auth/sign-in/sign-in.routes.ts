import { Routes } from '@angular/router';
import { AuthSignInComponent } from 'app/modules/auth/sign-in/components/sign-in-page/sign-in.component';

export default [
    {
        path     : '',
        component: AuthSignInComponent,
    },
] as Routes;
