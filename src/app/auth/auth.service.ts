import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { User } from "./user.model";
import { Router } from "@angular/router";
import { environment } from '../../environments/environment';
import { apiKey } from "api";


export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {
    user = new BehaviorSubject<User>(null);
    key = apiKey;
    private tokenExpiriationTimner: any;

    constructor(private http: HttpClient, private router: Router) {}

    signup(email: string, password: string) {
        console.log(email);
        return this.http.post<AuthResponseData>
            ('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='  + environment.firebaseAPIKey,
            {
                email: email, 
                password: password, 
                returnSecureToken: true
            }
        )
        .pipe(
            catchError(this.handleError), 
            tap(respData => { 
                this.handleAuthentication(
                    respData.email,
                    respData.localId,
                    respData.idToken,
                    +respData.expiresIn
                )           
            
            })
        );
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' + environment.firebaseAPIKey,
                {
                    email: email, 
                    password: password, 
                    returnSecureToken: true
                }
            )
            .pipe(
                catchError(this.handleError),
                tap(respData => { 
                this.handleAuthentication(
                    respData.email,
                    respData.localId,
                    respData.idToken,
                    +respData.expiresIn
                    )           
        
                })
            );            
    }

    logout() {
        this.user.next(null);
        this.router.navigate(['/auth']);
        // used to clear all data
        //localStorage.clear();
        // clear single item
        localStorage.removeItem('userData');
        if (this.tokenExpiriationTimner) {
            clearTimeout(this.tokenExpiriationTimner);
        }

        this.tokenExpiriationTimner = null;
    }

    autoLogout(expirationDuration: number) {
        console.log(expirationDuration);
        this.tokenExpiriationTimner = setTimeout(()=> {
            this.logout();
        }, expirationDuration);
    }

    autoLogin() {
        // retrieve data from local storage
        const userData: {
            email: string;
            id: string;
            _token: string;
            _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData'));

        if (!userData) {
            return;
        }

        const loadedUser = new User(
            userData.email,
            userData.id, 
            userData._token,
            new Date(userData._tokenExpirationDate)
        );

        if (loadedUser.token) {
            this.user.next(loadedUser);
            const expirationDuration = 
                new Date(userData._tokenExpirationDate).getTime() -
                new Date().getTime();

            this.autoLogout(expirationDuration);
        }
    }

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000); 
            const user = new User(
                email, 
                userId, 
                token, 
                expirationDate
            );
            this.user.next(user);
            this.autoLogout(expiresIn * 1000);
            //console.log(token);
            localStorage.setItem('userData', JSON.stringify(user));
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown erro occured';
        if (!errorRes.error || !errorRes.error.error ) {
            return throwError(errorMessage);
        };
        
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'This email exists already.';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'This email does not exist.';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'This password is not correct.';
                break;
                
        }
        return throwError(errorMessage);
    }
    
}