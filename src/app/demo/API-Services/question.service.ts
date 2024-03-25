import { IQuestion } from './../Model/iquestion';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class QuestionService {
    baseURL: string = 'http://localhost:5050/Question';

    newQuestionAdded: Subject<void> = new Subject<void>();

    constructor(private httpClient: HttpClient) {}

    getAllData(): Observable<IQuestion[]> {
        return this.httpClient.get<IQuestion[]>(this.baseURL);
    }

    getById(id: number): Observable<IQuestion> {
        return this.httpClient.get<IQuestion>(`${this.baseURL}/${id}`);
    }

    Add(question: IQuestion) {
        return this.httpClient.post(this.baseURL, question).pipe(
            tap(() => {
                this.newQuestionAdded.next();
            })
        );
    }

    Edit(id: number, question: IQuestion) {
        return this.httpClient.put(`${this.baseURL}/${id}`, question);
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
