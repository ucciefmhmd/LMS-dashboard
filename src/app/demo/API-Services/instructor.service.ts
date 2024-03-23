import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IInstrcutor } from '../Model/iinstrcutor';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstructorService {

     baseURL : string ="http://localhost:5050/instructor";

  constructor(private httpClient : HttpClient) { }

  getAllData(): Observable<IInstrcutor[]> {
    return this.httpClient.get<IInstrcutor[]>(this.baseURL);
  }

  getById(id: number): Observable<IInstrcutor> {
    return this.httpClient.get<IInstrcutor>(`${this.baseURL}/${id}`);
  }

  Add(instructor: IInstrcutor) {
    return this.httpClient.post(this.baseURL, instructor);
  }

  Edit(id: number, instructor: IInstrcutor) {
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
