import { UserRole } from './userRole';

export interface User {
    id: string;
    createdAt: string;
    updatedAt: string;
    isDeleted: false;
    isRequiredUpdate: false;
    docStatus: number;
    name: string;
    avatar: string;
    banner: string;
    username: string;
    password: string;
    email: string;
    phone: string;
    address: string;
    googleId: null;
    status: string;
    role: UserRole;
}
