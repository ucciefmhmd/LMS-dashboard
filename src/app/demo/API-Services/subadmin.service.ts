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

    Add(subadmin: FormData) {
        return this.httpClient.post(this.baseURL, subadmin).pipe(
            tap(() => {
                this.newSubadminAdded.next();
            })
        );
    }

    // Edit(id: number, subadmin: FormData) {
    //     return this.httpClient.put(`${this.baseURL}/${id}`, subadmin).pipe(
    //         tap(() => {
    //             this.newSubadminAdded.next();
    //         })
    //     );
    // }

    Edit(id: number, subadmin: any): Observable<any> {
        console.log(subadmin);

        return this.httpClient
            .put(`${this.baseURL}/${id}`, subadmin, {
                headers: { 'Content-Type': 'application/json' },
            })
            .pipe(
                tap(() => {
                    this.newSubadminAdded.next();
                })
            );
    }

    EditPhoto(id: number, subadminNewPhoto: FormData): Observable<any> {
        return this.httpClient
            .put(`${this.baseURL}/${id}/photo`, subadminNewPhoto)
            .pipe(
                tap(() => {
                    this.newSubadminAdded.next();
                })
            );
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
