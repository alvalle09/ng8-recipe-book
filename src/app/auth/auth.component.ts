import { Component, ComponentFactoryResolver, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AlertComponent } from "../Shared/alert/alert.component";
import { PlaceHolderDirective } from "../Shared/placeholder/placeholder.directive";
import { AuthResponseData, AuthService } from "./auth.service";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
})

export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  @ViewChild(PlaceHolderDirective, {static: false }) alertHost: PlaceHolderDirective;

  constructor(private authService: AuthService, 
              private router: Router,
              private componentFactoryResolver: ComponentFactoryResolver) {

  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    console.log(form.value);

    if (!form.value) {
      return;
    }

    //console.log(form.value);
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    // activate spinner while loading
    this.isLoading = true;
    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
        //console.log('calling signup');
      authObs = this.authService.signup(email, password)
    }

    authObs.subscribe(
      resData => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
       errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.showErrorAlert(errorMessage)
        this.isLoading = false;
      } 
    );

    form.reset();
  }

  onHandleError() {
    this.error = null;
  }

  private showErrorAlert(message: string) {
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(
      AlertComponent
    );      
    console.log(this.alertHost);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    hostViewContainerRef.createComponent(alertCmpFactory);
  }
  
}
