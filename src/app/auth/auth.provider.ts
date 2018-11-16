import { HttpClient } from '@angular/common/http';
import { TokenProvider } from './token.provider';

export namespace AuthProvider {
    export function getHeaders(http: HttpClient) {
        return {
            'Authorization': `Bearer ${TokenProvider.getToken(http)}`
        };
    }
}
