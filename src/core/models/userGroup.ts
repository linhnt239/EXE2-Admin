import { User } from './user';

export interface UserGroup {
    id: string;
    createdAt: string;
    updatedAt: string;
    isDeleted: boolean;
    isRequiredUpdate: boolean;
    docStatus: number;
    name: string;
    description: string;
    userGroupMembers: User[];
}
