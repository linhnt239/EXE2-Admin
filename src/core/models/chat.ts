import { User } from './user';

export interface Chat {
    id: string;
    createdAt: string;
    updatedAt: string;
    isDeleted: boolean;
    isRequiredUpdate: boolean;
    docStatus: number;
    name: string;
    slug: string;
    status: string;
    users: User[];
}
