export interface IStudent {
    id: number;
    name: string;
    age: number;
    title: string;
    phone: string;
    address: string;
    ssn: string;
    email: string;
    password: string;
    userAttachmentPath?: string;
    imageFile: File;
    courseName?: string[];
    courseIDs?: number[];
    groupName?: string[];
    examName?: string[];
    instructorIDs?:number[];
    exams?: { [courseName: string]: string };
}
