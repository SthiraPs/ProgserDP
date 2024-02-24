import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
    providedIn: 'root',
})
export class GravatarService {
    private gravatarBaseUrl: string = 'https://www.gravatar.com/avatar/';

    constructor() {}

    generateGravatarUrl(email: string, size: number = 200): string {
        // Trim and lowercase the email as per Gravatar requirements
        const trimmedEmail = email.trim().toLowerCase();
        // Generate MD5 hash of the email
        const hash = CryptoJS.MD5(trimmedEmail).toString();
        // Construct and return the full Gravatar URL
        return `${this.gravatarBaseUrl}${hash}?s=${size}&d=identicon`;
    }
}
