import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IStudent } from '../Model/istudent';
import { Observable, Subject, tap } from 'rxjs';
import { IStdCourse } from '../Model/IStd-course';
import { IStudentEdit } from '../Model/istudent-edit';

@Injectable({
    providedIn: 'root',
})
export class StudentService {
    baseURL: string = 'http://localhost:5050/Student';

    newStudentAdded: Subject<void> = new Subject<void>();

    constructor(private httpClient: HttpClient) {}

    getAllData(): Observable<IStudent[]> {
        return this.httpClient.get<IStudent[]>(this.baseURL);
    }

    getById(id: number): Observable<IStudent> {
        return this.httpClient.get<IStudent>(`${this.baseURL}/${id}`);
    }

    getPhoto(photoUrl: string): Observable<Blob> {
        return this.httpClient.get(photoUrl, { responseType: 'blob' });
    }

    AddCourse(id: number, student: IStdCourse) {
        return this.httpClient.post(`${this.baseURL}/addCourse/${id}`, student);
    }

    Add(student: FormData) {
        const headers = new HttpHeaders().append(
            'Content-Disposition',
            'multipart/form-data'
        );
        return this.httpClient
            .post(this.baseURL, student, { headers: new HttpHeaders() })
            .pipe(
                tap(() => {
                    this.newStudentAdded.next();
                })
            );
    }

    Edit(id: number, studentData: any): Observable<any> {
        console.log(studentData);

        return this.httpClient
            .put(`${this.baseURL}/${id}`, studentData, {
                headers: { 'Content-Type': 'application/json' },
            })
            .pipe(
                tap(() => {
                    this.newStudentAdded.next();
                })
            );
    }

    EditPhoto(id: number, studentNewPhoto: FormData): Observable<any> {
        return this.httpClient
            .put(`${this.baseURL}/${id}/photo`, studentNewPhoto)
            .pipe(
                tap(() => {
                    this.newStudentAdded.next();
                })
            );
    }

    // Edit(id: number, student: IStudentEdit) {
    //     const headers = new HttpHeaders().append(
    //         'Content-Disposition',
    //         'application/json'
    //     );
    //     return this.httpClient
    //         .put(`${this.baseURL}/${id}`, student, {
    //             headers: new HttpHeaders(),
    //         })
    //         .pipe(
    //             tap(() => {
    //                 this.newStudentAdded.next();
    //             })
    //         );
    // }

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
