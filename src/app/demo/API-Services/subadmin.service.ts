import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { ISubadmin } from '../Model/isubadmin';

@Injectable({
    providedIn: 'root',
})
export class SubadminService {
    baseURL: string = 'http://localhost:5050/subadmin';
    newSubadminAdded: Subject<void> = new Subject<void>();
    constructor(private httpClient: HttpClient) {}

    getAllData(): Observable<ISubadmin[]> {
        return this.httpClient.get<ISubadmin[]>(this.baseURL);
    }

    getById(id: number): Observable<ISubadmin> {
        return this.httpClient.get<ISubadmin>(`${this.baseURL}/${id}`);
    }

    Add(subadmin: ISubadmin) {
        return this.httpClient.post(this.baseURL, subadmin).pipe(
            tap(() => {
                this.newSubadminAdded.next();
            })
        );
    }

    Edit(id: number, subadmin: ISubadmin) {
        return this.httpClient.put(`${this.baseURL}/${id}`, subadmin);
    }

    Delete(id: number) {
        return this.httpClient.delete(`${this.baseURL}/${id}`);
    }

    testObservable(): Observable<string> {
        console.log('test function called');

        let myObservable = new Observable<string>((observer) => {
            console.log('observable called');
            observer.next('first data');

            if (false) {
                observer.error('This is an error!');
            }
            observer.next('second data');
            observer.complete();
            return {
                unsubscribe() {
                    console.log('End subscription');
                },
            };
        });

        return myObservable;
    }
}
