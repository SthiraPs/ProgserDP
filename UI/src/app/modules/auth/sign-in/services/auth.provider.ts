import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ENVIRONMENT_INITIALIZER, EnvironmentProviders, inject, Provider } from '@angular/core';
import { authInterceptor } from 'app/modules/auth/sign-in/services/auth.interceptor';
import { SignInService } from 'app/modules/auth/sign-in/services/sign-in.service';

export const provideAuth = (): Array<Provider | EnvironmentProviders> =>
{
    return [
        provideHttpClient(withInterceptors([authInterceptor])),
        {
            provide : ENVIRONMENT_INITIALIZER,
            useValue: () => inject(SignInService),
            multi   : true,
        },
    ];
};
