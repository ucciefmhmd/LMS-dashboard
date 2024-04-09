import { Data } from '@angular/router';

export interface ICourse {
    id: number;
    name: string;
    description: string;
    start_Date: Data;
    end_Date: Data;
    numOfExam: number;
    material: string;
    userAttachmentPath?: string;
    imageFile: File;
}
