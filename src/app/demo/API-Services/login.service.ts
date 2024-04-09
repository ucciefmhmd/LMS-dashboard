import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class LoginService {
    baseURL: string = 'http://localhost:5050/Users/login';

    currentUser = new BehaviorSubject(null);
    saveTokenUser() {
        let token: any = localStorage.getItem('userToken');
        this.currentUser.next(jwtDecode(token));
    }

    constructor(private httpClient: HttpClient, private route: Router) {
        if (localStorage.getItem('userToken') != null) this.saveTokenUser();
    }

    login(formData: any): Observable<any> {
        return this.httpClient.post(this.baseURL, formData);
    }

    logout() {
        this.currentUser.next(null);
        localStorage.removeItem('userToken');
        this.route.navigate(['/auth/login']);
    }
}
