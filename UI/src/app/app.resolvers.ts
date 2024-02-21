import { inject } from '@angular/core';
import { NotificationsService } from 'app/layout/layouts/components/notifications/notifications.service';
import { QuickChatService } from 'app/layout/common/quick-chat/quick-chat.service';
import { forkJoin } from 'rxjs';
import { NavigationService } from './layout/layouts/services/navigation.service';

export const initialDataResolver = () =>
{
    const notificationsService = inject(NotificationsService);

    // Fork join multiple API endpoint calls to wait all of them to finish
    return forkJoin([
        //navigationService.get(),
        notificationsService.getAll(),
    ]);
};
