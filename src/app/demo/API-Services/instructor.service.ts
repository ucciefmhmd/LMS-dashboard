import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IInstructor } from '../Model/iinstructor';
import { Observable, Subject, tap } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class InstructorService {
    baseURL: string = 'http://localhost:5050/instructor';

    newInstrcutorAdded: Subject<void> = new Subject<void>();

    constructor(private httpClient: HttpClient) {}

    getAllData(): Observable<IInstructor[]> {
        return this.httpClient.get<IInstructor[]>(this.baseURL);
    }

    getById(id: number): Observable<IInstructor> {
        return this.httpClient.get<IInstructor>(`${this.baseURL}/${id}`);
    }

    Add(instructor: IInstructor) {
        return this.httpClient.post(this.baseURL, instructor).pipe(
            tap(() => {
                this.newInstrcutorAdded.next();
            })
        );
    }

    Edit(id: number, instructor: IInstructor) {
        return this.httpClient.put(`${this.baseURL}/${id}`, instructor);
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
