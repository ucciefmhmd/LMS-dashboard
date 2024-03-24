import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
        console.log(this.currentUser);
    }

    constructor(private httpClient: HttpClient) {}

    login(formData: any): Observable<any> {
        return this.httpClient.post(this.baseURL, formData);
    }
}
