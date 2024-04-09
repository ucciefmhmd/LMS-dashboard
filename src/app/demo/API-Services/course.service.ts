import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { ICourse } from '../Model/icourse';

@Injectable({
    providedIn: 'root',
})
export class CourseService {
    baseURL: string = 'http://localhost:5050/courses';

    constructor(private httpClient: HttpClient) {}
    newCourseAdded: Subject<void> = new Subject<void>();

    getAllData(): Observable<ICourse[]> {
        return this.httpClient.get<ICourse[]>(this.baseURL);
    }

    getById(id: number): Observable<ICourse> {
        return this.httpClient.get<ICourse>(`${this.baseURL}/${id}`);
    }

    Add(course: FormData) {
        return this.httpClient.post(this.baseURL, course).pipe(
            tap(() => {
                this.newCourseAdded.next();
            })
        );
    }

    // Edit(id: number, course: FormData) {
    //     return this.httpClient.put(`${this.baseURL}/${id}`, course).pipe(
    //         tap(() => {
    //             this.newCourseAdded.next();
    //         })
    //     );
    // }

    Edit(id: number, course: any): Observable<any> {
        console.log(course);

        return this.httpClient
            .put(`${this.baseURL}/${id}`, course, {
                headers: { 'Content-Type': 'application/json' },
            })
            .pipe(
                tap(() => {
                    this.newCourseAdded.next();
                })
            );
    }

    EditPhoto(id: number, studentNewPhoto: FormData): Observable<any> {
        return this.httpClient
            .put(`${this.baseURL}/${id}/photo`, studentNewPhoto)
            .pipe(
                tap(() => {
                    this.newCourseAdded.next();
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
