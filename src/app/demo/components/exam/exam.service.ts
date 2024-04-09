import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { IExam } from './iexam';

@Injectable({
    providedIn: 'root',
})
export class ExamService {
    baseURL: string = 'http://localhost:5050/exam';

    newExamAdded: Subject<void> = new Subject<void>();

    constructor(private httpClient: HttpClient) {}

    getAllData(): Observable<IExam[]> {
        return this.httpClient.get<IExam[]>(this.baseURL);
    }

    getById(id: number): Observable<IExam> {
        return this.httpClient.get<IExam>(`${this.baseURL}/${id}`);
    }

    Add(exam: IExam) {
        return this.httpClient.post(this.baseURL, exam).pipe(
            tap(() => {
                this.newExamAdded.next();
            })
        );
    }

    Edit(id: number, exam: IExam) {
        return this.httpClient.put(`${this.baseURL}/${id}`, exam);
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
