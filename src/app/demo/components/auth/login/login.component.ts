import { Message } from 'primeng/api';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/demo/API-Services/login.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: ['.error-message { color: red; }'],
})
export class LoginComponent {
    password!: string;
    errormsg: string;

    LoginForm: FormGroup;

    constructor(private loginServices: LoginService, private router: Router) {
        this.LoginForm = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [
                Validators.required,
                Validators.minLength(6),
            ]),
        });
    }

    getFormControl(name: string): FormControl {
        return this.LoginForm.get(name) as FormControl;
    }

    onSubmit(e: Event) {
        e.preventDefault();
        this.loginServices.login(this.LoginForm.value).subscribe(
            (data) => {
                if (data.message == 'Login successful') {
                    localStorage.setItem('userToken', data.token);
                    this.loginServices.saveTokenUser();
                    this.router.navigate(['/']);
                } else {
                    this.errormsg =
                        "You don't have necessary permissions to access this resource";
                }
            },
            (error) => {
                if (error.status === 401) {
                    this.errormsg =
                        "You don't have necessary permissions to access this resource";
                } else {
                    this.errormsg = 'Invalid username or password';
                }
            }
        );
    }
}
