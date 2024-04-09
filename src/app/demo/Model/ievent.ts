import { Data } from '@angular/router';

export interface IEvent {
    id: number;
    name: string;
    description: string;
    start_Date: Data;
    end_Date: Data;
    hyperLink: string;
    coursesName: string[];
    coursesIDs: number[];
}
