import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { User } from "./user.model";
import { Router } from "@angular/router";


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

    constructor(private http: HttpClient, private router: Router) {}

    signup(email: string, password: string) {
        console.log(email);
        return this.http.post<AuthResponseData>
            ('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=xxxxxxxxxxxxxxxxxxxxx',
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
            'https://identitytoolkit.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=xxxxxxxxxxxxxxxxxxxxx',
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
            console.log(token);
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