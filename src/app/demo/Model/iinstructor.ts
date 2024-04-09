export interface IInstructor {
    id: number;
    name: string;
    phone: string;
    address: string;
    email: string;
    password: string;
    ssn: string;
    experience: string;
    userAttachmentPath?: string;
    imageFile: File;
    specialization: string;
    courseName: string[];
    courseIDs:number[];
}
