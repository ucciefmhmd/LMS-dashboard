import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { IEvent } from '../Model/ievent';

@Injectable({
    providedIn: 'root',
})
export class EventService {
    baseURL: string = 'http://localhost:5050/event';

    constructor(private httpClient: HttpClient) {}
    newEventAdded: Subject<void> = new Subject<void>();

    getAllData(): Observable<IEvent[]> {
        return this.httpClient.get<IEvent[]>(this.baseURL);
    }

    getByCourse(courseName: string): Observable<IEvent[]> {
        return this.httpClient.get<IEvent[]>(
            `${this.baseURL}?courseName=${courseName}`
        );
    }

    getByCourseId(courseId: number): Observable<IEvent[]> {
        return this.httpClient.get<IEvent[]>(
            `${this.baseURL}?courseId=${courseId}`
        );
    }

    getById(id: number): Observable<IEvent> {
        return this.httpClient.get<IEvent>(`${this.baseURL}/${id}`);
    }

    Add(event: FormData) {
        return this.httpClient.post(this.baseURL, event).pipe(
            tap(() => {
                this.newEventAdded.next();
            })
        );
    }

    Edit(id: number, event: FormData) {
        return this.httpClient.put(`${this.baseURL}/${id}`, event).pipe(
            tap(() => {
                this.newEventAdded.next();
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
