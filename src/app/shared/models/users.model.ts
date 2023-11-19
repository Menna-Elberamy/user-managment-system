export interface userModel{
    id: number;
    name: string;
    username: string;
    email: string;
    phone: number;
    website: string;
    role?:string
    company: {
        name: string;
    },
}