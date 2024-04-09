import { HttpClient, HttpHeaders } from '@angular/common/http';
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

    getByCourse(courseName: string): Observable<IInstructor[]> {
        return this.httpClient.get<IInstructor[]>(
            `${this.baseURL}?courseName=${courseName}`
        );
    }
    getByCourseId(courseId: number): Observable<IInstructor[]> {
        return this.httpClient.get<IInstructor[]>(
            `${this.baseURL}?courseId=${courseId}`
        );
    }

    getInstByCourse(id: number): Observable<IInstructor[]> {
        return this.httpClient.get<IInstructor[]>(
            `${this.baseURL}/names/${id}`
        );
    }

    getById(id: number): Observable<IInstructor> {
        return this.httpClient.get<IInstructor>(`${this.baseURL}/${id}`);
    }
    getByName(name: string): Observable<IInstructor> {
        return this.httpClient.get<IInstructor>(`${this.baseURL}/${name}`);
    }

    Add(instructor: FormData) {
        const headers = new HttpHeaders().append(
            'Content-Disposition',
            'multipart/form-data'
        );
        return this.httpClient
            .post(this.baseURL, instructor, {
                headers: new HttpHeaders(),
            })
            .pipe(
                tap(() => {
                    this.newInstrcutorAdded.next();
                })
            );
    }

    // Edit(id: number, instructor: FormData) {
    //     const headers = new HttpHeaders().append(
    //         'Content-Disposition',
    //         'multipart/form-data'
    //     );
    //     return this.httpClient
    //         .put(`${this.baseURL}/${id}`, instructor, {
    //             headers: new HttpHeaders(),
    //         })
    //         .pipe(
    //             tap(() => {
    //                 this.newInstrcutorAdded.next();
    //             })
    //         );
    // }
    Edit(id: number, instructor: any): Observable<any> {
        console.log(instructor);

        return this.httpClient
            .put(`${this.baseURL}/${id}`, instructor, {
                headers: { 'Content-Type': 'application/json' },
            })
            .pipe(
                tap(() => {
                    this.newInstrcutorAdded.next();
                })
            );
    }

    EditPhoto(id: number, studentNewPhoto: FormData): Observable<any> {
        return this.httpClient
            .put(`${this.baseURL}/${id}/photo`, studentNewPhoto)
            .pipe(
                tap(() => {
                    this.newInstrcutorAdded.next();
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
