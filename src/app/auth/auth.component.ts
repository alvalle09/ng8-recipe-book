import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "./auth.service";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService) {}

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

    // activate spinner while loading
    this.isLoading = true;
    if (this.isLoginMode) {
        // todo..
    } else {
        //console.log('calling signup');
      this.authService.signup(email, password).subscribe(
        (resData) => {
          console.log(resData);
          this.isLoading = false;
        },
        (errorRes) => {
          console.log(errorRes);
          switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
              this.error = 'This email exists already'
          };
          this.error = 'An error occurred!'
          this.isLoading = false;
        } 
      );
    }

    form.reset();
  }
}
