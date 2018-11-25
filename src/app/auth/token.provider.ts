import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
/*
export namespace TokenProvider {
    let token: string;

    function authenticate(http: HttpClient) {
        http.post(
                `${environment.api}/api/v1/auth`,
                {
                    // TODO: move to env file
                    'name': 'angular',
                    'password': 'angular'
                },
                { responseType: 'text' }
            )
            .subscribe(jwt => token = jwt);
    }

    export function getToken(http: HttpClient) {
        // acquire new token if none exists
        if (!token) {
            // TODO: move to app initialization?
            authenticate(http);
        }
        return token;
    }
}
*/