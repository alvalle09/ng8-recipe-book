import { Injectable } from "@angular/core";
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    constructor (private authService: AuthService) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        this.authService.user.subscribe();
        return next.handle(req);
    }
}