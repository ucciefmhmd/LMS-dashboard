export interface ISubadmin {
    id: number;
    name: string;
    phone: string;
    address: string;
    email: string;
    password: string;
    ssn: string;
    userAttachmentPath?: string;
    imageFile: File;
}
